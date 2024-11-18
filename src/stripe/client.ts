import { loadStripe, Stripe } from '@stripe/stripe-js';
import { env } from '@ss/env';

// Resolve stripe promise once and return it always
let stripePromise: Promise<Stripe | null>;

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
  }

  return stripePromise;
};