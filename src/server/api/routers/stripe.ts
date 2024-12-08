import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@ss/server/api/trpc";
import type Stripe from "stripe";
import { stripe } from "@ss/stripe/config";
import { env } from "@ss/env";
import { kiss, kitsune, neko } from "nekonya.js";

export const stripeRouter = createTRPCRouter({
  createSingleProductCheckout: publicProcedure
    .input(
      z.object({
        email: z.string(),
        product_name: z.string(),
        product_price: z.number().default(1000),
        product_description: z.string().optional(),
        product_images: z.array(z.string()).optional(),
        product_quantity: z.number().default(1),
        recurring_interval: z.enum(["day", "week", "month", "year"]).optional(),
        redirectPath: z.string().optional(),
        currency: z.enum(["usd", "cad", "xaf", "eur"]).default("usd"),
      }),
    )
    .output(z.object({ sessionId: z.string() }))
    .mutation(async ({ input }) => {
      const images = input.product_images
        ? input.product_images
        : await Promise.all([neko(), kiss(), kitsune()]);

      const publicUrl = new URL(env.NEXT_PUBLIC_APP_URL);
      if (input.redirectPath) {
        publicUrl.pathname = input.redirectPath;
      }

      const errorUrl = new URL(env.NEXT_PUBLIC_APP_URL);
      errorUrl.search = new URLSearchParams({ error: "stripe" }).toString();
      if (input.redirectPath) {
        errorUrl.pathname = input.redirectPath;
      }

      const params: Stripe.Checkout.SessionCreateParams = {
        allow_promotion_codes: true,
        billing_address_collection: "required",
        customer_email: input.email,
        line_items: [
          {
            price_data: {
              currency: input.currency,
              product_data: {
                name: input.product_name,
                description: input.product_description,
                images,
              },
              unit_amount: input.product_price,
              recurring: input.recurring_interval && {
                interval: input.recurring_interval,
              },
            },
            quantity: 1,
          },
        ],
        mode: input.recurring_interval ? "subscription" : "payment",
        success_url: publicUrl.toString(),
        cancel_url: errorUrl.toString(),
        subscription_data: input.recurring_interval && {
          trial_period_days: 7,
        },
      };

      const session = await stripe.checkout.sessions.create(params, {
        stripeAccount: env.NEXT_PUBLIC_MAIN_STRIPE_ACCOUNT_ID,
      });

      return {
        sessionId: session.id,
      };
    }),

  getStripeTheme: publicProcedure
    .input(
      z.object({
        stripeAccountId: z.string(),
      }),
    )
    .output(
      z.object({
        theme: z.enum(["stripe", "night", "flat"]),
        labels: z.enum(['above', "floating"]),
        variables: z.object({
          colorPrimary: z.string(),
          colorBackground: z.string(),
          colorText: z.string(),
          colorDanger: z.string(),
          fontFamily: z.string(),
          spacingUnit: z.string(),
          borderRadius: z.string(),
        }).optional(),
      }),
    )
    .query(async ({ input: { stripeAccountId } }) => {
      return {
        theme: "flat",
        labels: "floating",
        variables: {
          colorPrimary: "#bd93f9",
          colorBackground: "#282a36",
          colorText: "#f8f8f2",
          colorDanger: "#ff5555",
          fontFamily: 'Louis George Cafe, Ideal Sans, system-ui, sans-serif',
          spacingUnit: '0.25rem',
          borderRadius: '16px',
        },
      };
    }),

  createPaymentIntent: publicProcedure
    .input(
      z.object({
        amount: z.number(),
        currency: z.string(),
        stripeAccountId: z.string(),
      }),
    )
    .output(z.object({ client_secret: z.string() }))
    .mutation(async ({ input }) => {
      const params: Stripe.PaymentIntentCreateParams = {
        amount: input.amount,
        currency: input.currency,
      };

      const intent = await stripe.paymentIntents.create(params, {
        stripeAccount: input.stripeAccountId,
      });

      return {
        client_secret: intent.client_secret!,
      };
    }),
});