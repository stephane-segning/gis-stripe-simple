"use client";

import { Card } from "react-daisyui";
import BuyProductCard from "@ss/components/buy-product-card";
import type { ProductCardProps } from "./types";

export default function ProductCard({
  description,
  name,
  price,
  images,
  currency,
  quantity,
  ...rest
}: ProductCardProps) {
  const priceFloor = Math.floor(price / 100);
  return (
    <div>
      <Card imageFull className="h-full">
        <Card.Image src={images[0]} alt={name} />
        <Card.Body>
          <Card.Title tag="h2" className="select-none md:text-3xl">
            {name}
          </Card.Title>
          <h3 className='gap-2 flex align-baseline'>
            <span className='self-end'>{quantity}x</span>
            <span className="text-error select-all font-extrabold tracking-tight md:text-2xl">
              {priceFloor}.{price - priceFloor * 100}{" "} {currency?.toUpperCase()}
            </span>
          </h3>
          <p>{description}</p>
          <Card.Actions className="justify-end">
            <BuyProductCard
              {...rest}
              product_name={name}
              product_price={price}
              product_description={description}
              product_images={images}
              product_quantity={quantity}
            />
          </Card.Actions>
        </Card.Body>
      </Card>
    </div>
  );
}