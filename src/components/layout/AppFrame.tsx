"use client";

import { usePathname } from "next/navigation";
import { CustomerNav } from "@/components/layout/CustomerNav";
import { CustomerFooter } from "@/components/customer/CustomerFooter";

export function AppFrame({
  children,
  isLoggedIn,
}: {
  children: React.ReactNode;
  isLoggedIn: boolean;
}) {
  const pathname = usePathname();
  const isPublicMerchantPage =
    pathname === "/merchant/apply" || pathname === "/merchant/pricing";
  const isCustomerChromeVisible =
    (!pathname.startsWith("/merchant") || isPublicMerchantPage) &&
    !pathname.startsWith("/admin") &&
    pathname !== "/login" &&
    !pathname.startsWith("/wallet/");
  const isCustomerFooterVisible =
    (!pathname.startsWith("/merchant") || isPublicMerchantPage) &&
    !pathname.startsWith("/admin") &&
    pathname !== "/login" &&
    !pathname.startsWith("/wallet/");

  return (
    <>
      <CustomerNav isLoggedIn={isLoggedIn} />
      <main className={isCustomerChromeVisible ? "pb-16 pt-0 md:pb-0 md:pt-16" : ""}>{children}</main>
      {isCustomerFooterVisible ? <CustomerFooter /> : null}
    </>
  );
}
