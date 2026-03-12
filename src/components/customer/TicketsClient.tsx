"use client";

import { useState } from "react";
import { type OrderRecord } from "@/lib/customer-data";
import { CouponCard } from "@/components/customer/CouponCard";

type TicketsClientProps = {
  paidOrders: OrderRecord[];
  redeemedOrders: OrderRecord[];
};

export function TicketsClient({ paidOrders, redeemedOrders }: TicketsClientProps) {
  const [tab, setTab] = useState<"PAID" | "REDEEMED">("PAID");
  const currentOrders = tab === "PAID" ? paidOrders : redeemedOrders;

  return (
    <div className="mx-auto max-w-5xl px-4 py-6 md:px-6 md:py-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-brand-deep">我的票夾</h1>
          <p className="mt-2 text-sm text-stone-500">管理未兌換與已兌換票券，出示核銷頁給店員掃碼即可。</p>
        </div>
      </div>

      <div className="mt-6 inline-flex rounded-full bg-stone-200/80 p-1">
        <button
          type="button"
          onClick={() => setTab("PAID")}
          className={`rounded-full px-4 py-2 text-sm font-medium transition ${
            tab === "PAID" ? "bg-white text-brand-deep shadow-sm" : "text-stone-500"
          }`}
        >
          未兌換
        </button>
        <button
          type="button"
          onClick={() => setTab("REDEEMED")}
          className={`rounded-full px-4 py-2 text-sm font-medium transition ${
            tab === "REDEEMED" ? "bg-white text-brand-deep shadow-sm" : "text-stone-500"
          }`}
        >
          已兌換
        </button>
      </div>

      <div className="mt-6 space-y-4">
        {currentOrders.map((order) =>
          <CouponCard key={order.id} order={order} />,
        )}

        {currentOrders.length === 0 ? (
          <div className="rounded-[28px] border border-dashed border-stone-300 bg-white/80 px-6 py-16 text-center text-stone-500">
            目前沒有這個狀態的票券。
          </div>
        ) : null}
      </div>
    </div>
  );
}
