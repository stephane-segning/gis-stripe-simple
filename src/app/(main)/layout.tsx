import { AppNav } from "@ss/components/navbar";
import type { PropsWithChildren } from "react";

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <main>
      <AppNav />
      {children}
    </main>
  );
}
