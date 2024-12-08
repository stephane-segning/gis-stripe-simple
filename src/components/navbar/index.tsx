"use client";
import { Button, Link, Navbar } from "react-daisyui";
import { default as NextLink } from "next/link";
import { Menu } from "react-feather";

export function AppNav() {
  return (
    <div className="mb-4 bg-base-300">
      <Navbar className="container mx-auto">
        <Navbar.Start>Test stripe</Navbar.Start>
        <Navbar.Center className="gap-4">
          <NextLink href="/">
            <Link>Home</Link>
          </NextLink>
          <NextLink href="/checkout">
            <Link>Checkout</Link>
          </NextLink>
        </Navbar.Center>
        <Navbar.End>
          <Button shape="circle" color="ghost">
            <Menu />
          </Button>
        </Navbar.End>
      </Navbar>
    </div>
  );
}
