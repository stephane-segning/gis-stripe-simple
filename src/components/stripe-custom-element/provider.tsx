"use client";

import type { PropsWithChildren } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { getStripe } from "@ss/stripe/client";
import { api } from "@ss/trpc/react";

export interface StripeProviderProps {
  clientSecret: string;
  stripeAccountId: string;
}

export function StripeProvider({
  children,
  stripeAccountId,
  clientSecret,
}: PropsWithChildren<StripeProviderProps>) {
  const [data] = api.stripe.getStripeTheme.useSuspenseQuery({
    stripeAccountId,
  });
  if (!data) {
    return <div>Oops! Could not find the theme!</div>;
  }
  return (
    <Elements
      stripe={getStripe(stripeAccountId)}
      options={{ clientSecret, appearance: data }}
    >
      {children}
    </Elements>
  );
}