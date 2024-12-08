import { loadStripe, Stripe } from "@stripe/stripe-js";
import { env } from "@ss/env";

// Resolve stripe promise once and return it always
const stripePromises: Record<string, Promise<Stripe | null>> = {};

export const getStripe = (stripeAccountId = "default") => {
  let stripePromise = stripePromises[stripeAccountId];
  if (!stripePromise) {
    switch (stripeAccountId) {
      case "default":
        stripePromise = loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
      default:
        stripePromise = loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY, {
          stripeAccount: stripeAccountId,
        });
    }
  }

  return stripePromise;
};
