"use client";

import { usePathname } from "next/navigation";
import { MerchantSidebar } from "@/components/layout/MerchantSidebar";

export function MerchantFrame({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/merchant/login") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-stone-100">
      <MerchantSidebar />
      <main className="p-4 pt-14 md:ml-[270px] md:p-6 md:pt-6">{children}</main>
    </div>
  );
}
