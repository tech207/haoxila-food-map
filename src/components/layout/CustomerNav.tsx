"use client";

import { usePathname } from "next/navigation";
import { CustomerTopNav } from "@/components/customer/CustomerTopNav";
import { CustomerBottomNav } from "@/components/customer/CustomerBottomNav";

export function CustomerNav({ isLoggedIn = false }: { isLoggedIn?: boolean }) {
  const pathname = usePathname();
  const isPublicMerchantPage =
    pathname === "/merchant/apply" || pathname === "/merchant/pricing";
  const hidden =
    (pathname.startsWith("/merchant") && !isPublicMerchantPage) ||
    pathname.startsWith("/admin") ||
    pathname === "/login" ||
    pathname.startsWith("/wallet/");

  if (hidden) {
    return null;
  }

  return (
    <>
      <CustomerTopNav isLoggedIn={isLoggedIn} />
      <CustomerBottomNav />
    </>
  );
}
