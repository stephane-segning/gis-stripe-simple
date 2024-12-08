import CheckoutSummary from "@ss/components/checkout-product/checkout-summary";
import { CheckoutTemplate } from "@ss/components/checkout-product/checkout-template";
import { StripeCustomElement } from "@ss/components/stripe-custom-element";

export default async function CheckoutPage() {
  return (
    <div className="container mx-auto">
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
    </div>
  );
}
