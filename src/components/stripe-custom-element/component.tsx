"use client";

import { PaymentElement } from "@stripe/react-stripe-js";
import { Button } from "react-daisyui";

export function StripeCustomElement() {
  return (
    <form className='flex flex-col gap-4'>
      <PaymentElement />
      <Button fullWidth color='primary' type="submit">Submit</Button>
    </form>
  );
}