"use client";
import { Button, Navbar } from "react-daisyui";
import { default as NextLink } from "next/link";
import { Menu } from "react-feather";

export function AppNav() {
  return (
    <div className="mb-4 bg-base-300">
      <Navbar className="container mx-auto px-4 md:px-0">
        <Navbar.Start>Test stripe</Navbar.Start>
        <Navbar.Center className="gap-4">
          <NextLink href="/" className="btn btn-link">
            <span>Home</span>
          </NextLink>
          <NextLink href="/checkout" className="btn btn-link">
            <span>Checkout</span>
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