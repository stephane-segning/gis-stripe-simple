"use client";

import { type FormEvent, useCallback, useEffect } from "react";

import { api } from "@ss/trpc/react";
import type { BuyProductCardProps } from "./types";
import { getStripe } from "@ss/stripe/client";
import { Button } from "react-daisyui";
import toast from "react-hot-toast";

export default function BuyProductCard(props: BuyProductCardProps) {
  const utils = api.useUtils();
  const { mutateAsync, isPending, isError, error } =
    api.stripe.createSingleProductCheckout.useMutation({
      onSuccess: async () => {
        await utils.stripe.invalidate();
      },
    });

  useEffect(() => {
    if (isError && error) {
      console.error(error);
      toast.error(error.message || 'Could not start checkout. Check your logs');
    }
  }, [error, isError]);

  const startPurchase = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const data = await mutateAsync(props);
      const stripe = await getStripe();
      if (!stripe) {
        console.error("Could not initialize stripe");
        return;
      }

      await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      });
    },
    [props, mutateAsync],
  );

  return (
    <form onSubmit={startPurchase} className="flex flex-col gap-2 w-full">
      <Button type="submit" fullWidth loading={isPending} color='primary'>
        {isPending ? "Processing..." : "By now"}
      </Button>
    </form>
  );
}