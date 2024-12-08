import { HydrateClient } from "@ss/trpc/server";
import type { ProductCardProps } from "@ss/components/product-card";
import ProductCard from "@ss/components/product-card";
import { images, paragraph, title } from "@ss/lorem";

export default async function Home() {
  const email = "test@email.com";
  const products: Omit<ProductCardProps, "email">[] = await Promise.all(Array.from(Array(10).keys()).map(async () => ({
    name: await title(),
    description: await paragraph(),
    images: await images(),
    price: Math.floor(Math.random() * 100_00) + 1,
    quantity: 1,
    currency: "usd"
  })));

  return (
    <HydrateClient>
      <main
        className="flex min-h-screen flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Test website for Stripe features
          </h1>

          <div className="grid grid-cols-1 grid-rows-4 gap-4 md:gap-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.name} {...product} email={email} />
            ))}
          </div>
        </div>
      </main>
    </HydrateClient>
  );
}