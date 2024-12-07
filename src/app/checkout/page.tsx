import { CheckoutTemplate } from "@ss/components/checkout-product/checkout-template";
import { StripeCustomElement } from "@ss/components/stripe-custom-element";

export default async function CheckoutPage() {
  return (
    <CheckoutTemplate>
      <StripeCustomElement />
    </CheckoutTemplate>
  );
}
