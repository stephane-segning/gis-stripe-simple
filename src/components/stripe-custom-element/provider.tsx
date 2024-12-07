"use client";

import type { PropsWithChildren } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { getStripe } from "@ss/stripe/client";
import { api } from "@ss/trpc/react";

export interface StripeProviderProps {
  clientSecret: string;
  vendorId: string;
}

export function StripeProvider({
  children,
  vendorId,
  clientSecret,
}: PropsWithChildren<StripeProviderProps>) {
  const [data] = api.stripe.getStripeTheme.useSuspenseQuery({ vendorId });
  if (!data) {
    return <div>Oops! Could not find the theme!</div>;
  }
  return (
    <Elements stripe={getStripe()} options={{ clientSecret, ...data }}>
      {children}
    </Elements>
  );
}
