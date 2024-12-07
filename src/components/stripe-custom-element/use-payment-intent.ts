import { api } from "@ss/trpc/react";
import { useCallback, useMemo } from "react";

export interface UsePaymentIntentProps {
  amount: number;
  currency: string;
  stripeAccountId: string;
}

export function usePaymentIntent(props: UsePaymentIntentProps) {
  const utils = api.useUtils();
  const { mutate, isError, isSuccess, data } =
    api.stripe.createPaymentIntent.useMutation({
      onSuccess: async () => {
        await utils.stripe.invalidate();
      },
    });

  const run = useCallback(() => mutate(props), [mutate, props]);

  return {
    run,
    isError,
    isSuccess,
    secret: data?.client_secret,
  };
}
