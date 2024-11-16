import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@ss/server/api/trpc";
import Stripe from "stripe";
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
        ? [...input.product_images]
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

      const session = await stripe.checkout.sessions.create(params);

      return {
        sessionId: session.id,
      };
    }),
});