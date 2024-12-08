import CheckoutSummary from "@ss/components/checkout-product/checkout-summary";
import { CheckoutTemplate } from "@ss/components/checkout-product/checkout-template";
import { StripeCustomElement } from "@ss/components/stripe-custom-element";
import { Suspense } from "react";

export default async function CheckoutPage() {
  return (
    <div className="container mx-auto px-4 md:px-0">
      <Suspense fallback={<div>Loading...</div>}>
        <CheckoutTemplate>
          <div className="flex flex-col justify-between gap-4 md:flex-row">
            <div className="md:basis-1/2 lg:basis-1/3">
              <CheckoutSummary />
            </div>
            <div className="sticky top-0 md:basis-1/2 lg:basis-1/3">
              <StripeCustomElement />
            </div>
          </div>
        </CheckoutTemplate>
      </Suspense>
    </div>
  );
}