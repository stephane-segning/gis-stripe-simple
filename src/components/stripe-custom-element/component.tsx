"use client";

import { PaymentElement } from "@stripe/react-stripe-js";

export function StripeCustomElement() {
  return (
    <form>
      <PaymentElement />
      <button type="submit">Submit</button>
      <button type="reset">Reset</button>
    </form>
  );
}
