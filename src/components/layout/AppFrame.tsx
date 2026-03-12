"use client";

import { usePathname } from "next/navigation";
import { CustomerNav } from "@/components/layout/CustomerNav";

export function AppFrame({
  children,
  isLoggedIn,
}: {
  children: React.ReactNode;
  isLoggedIn: boolean;
}) {
  const pathname = usePathname();
  const isCustomerChromeVisible =
    !pathname.startsWith("/merchant") &&
    !pathname.startsWith("/admin") &&
    pathname !== "/login" &&
    !pathname.startsWith("/wallet/");

  return (
    <>
      <CustomerNav isLoggedIn={isLoggedIn} />
      <main className={isCustomerChromeVisible ? "pb-16 pt-0 md:pb-0 md:pt-16" : ""}>{children}</main>
    </>
  );
}
