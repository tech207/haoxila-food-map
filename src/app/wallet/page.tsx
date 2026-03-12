import Link from "next/link";
import { TicketsClient } from "@/components/customer/TicketsClient";
import { getOrdersByStatus } from "@/lib/customer-data";
import { isDemoCustomerLoggedIn } from "@/lib/customer-session";

export default function WalletPage() {
  const isLoggedIn = isDemoCustomerLoggedIn();

  if (!isLoggedIn) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center md:px-6">
        <h1 className="text-3xl font-semibold text-brand-deep">我的票夾</h1>
        <p className="mt-4 text-sm leading-6 text-stone-500">登入後才能查看已購買票券與核銷動態碼。</p>
        <Link
          href="/login?next=/wallet"
          className="mt-8 inline-flex h-12 items-center justify-center rounded-2xl bg-brand-accent px-5 text-sm font-medium text-white"
        >
          前往登入
        </Link>
      </div>
    );
  }

  return (
    <TicketsClient
      paidOrders={getOrdersByStatus("PAID")}
      redeemedOrders={getOrdersByStatus("REDEEMED")}
    />
  );
}
