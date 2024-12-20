"use client";

import { type PropsWithChildren, useEffect } from "react";
import { usePaymentIntent } from "@ss/components/stripe-custom-element";
import { StripeProvider } from "../stripe-custom-element";
import { useSearchParams } from "next/navigation";

export function CheckoutTemplate({ children }: PropsWithChildren) {
  const searchParams = useSearchParams();
  const ids = searchParams.getAll("ids");

  const stripeAccountId = "acct_1Q3hT306bTsSElO7";

  const { isError, run, secret } = usePaymentIntent({
    amount: 20_00,
    currency: "EUR",
    stripeAccountId,
  });

  useEffect(() => run(), []);

  if (isError) {
    return <div>An error occured</div>;
  }

  if (!secret) {
    return <span>Loading...</span>;
  }

  return (
    <StripeProvider stripeAccountId={stripeAccountId} clientSecret={secret}>
      {children}
    </StripeProvider>
  );
}