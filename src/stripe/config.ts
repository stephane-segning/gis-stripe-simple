import Stripe from 'stripe';
import { env } from '@ss/env';

export const stripe = new Stripe(
  env.STRIPE_SECRET_KEY,
  {
    // https://github.com/stripe/stripe-node#configuration
    // https://stripe.com/docs/api/versioning
    apiVersion: '2024-10-28.acacia',
    // Register this as an official Stripe plugin.
    // https://stripe.com/docs/building-plugins#setappinfo
    appInfo: {
      name: env.STRIPE_APP_INFO_NAME,
      version: env.STRIPE_APP_INFO_VERSION,
      url: env.NEXT_PUBLIC_APP_URL,
    }
  }
);