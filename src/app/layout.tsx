import "@ss/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { TRPCReactProvider } from "@ss/trpc/react";
import { Toaster } from "react-hot-toast";
import { PropsWithChildren } from "react";

export const metadata: Metadata = {
  title: "Stripe Demo",
  description: "GIS Backed by Stripe",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <Toaster position="bottom-right" reverseOrder={false} />
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
