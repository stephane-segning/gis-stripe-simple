import { loadStripe, Stripe } from "@stripe/stripe-js";
import { env } from "@ss/env";

// Resolve stripe promise once and return it always
const sCache: Record<string, Promise<Stripe | null>> = {};

export const getStripe = (stripeAccountId = "default") => {
  let found = sCache[stripeAccountId];
  if (!found) {
    switch (stripeAccountId) {
      case "default":
        found = loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY, {
          stripeAccount: env.NEXT_PUBLIC_MAIN_STRIPE_ACCOUNT_ID,
        });
      default:
        found = loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY, {
          stripeAccount: stripeAccountId,
        });
    }
    sCache[stripeAccountId] = found;
  }

  return found;
};