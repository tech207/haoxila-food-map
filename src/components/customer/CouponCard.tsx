import Link from "next/link";
import { CalendarClock, MapPin, ScanLine, TicketCheck } from "lucide-react";
import { formatDate, formatDateTime, formatPrice, type OrderRecord } from "@/lib/customer-data";

export function CouponCard({ order }: { order: OrderRecord }) {
  if (order.status === "PAID") {
    return (
      <article className="rounded-[28px] border border-stone-200/80 bg-white p-5 shadow-sm md:p-6">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium text-brand-accent">{order.storeName}</p>
              <h2 className="mt-1 text-xl font-semibold text-stone-900">{order.ticketTitle}</h2>
            </div>
            <div className="flex flex-wrap gap-3 text-sm text-stone-500">
              <span className="inline-flex items-center gap-1">
                <MapPin className="size-4" />
                {order.district}
              </span>
              <span className="inline-flex items-center gap-1">
                <CalendarClock className="size-4" />
                到期 {formatDate(order.validUntil)}
              </span>
              <span className="inline-flex items-center gap-1">
                <TicketCheck className="size-4" />
                {formatPrice(order.totalAmount)}
              </span>
            </div>
          </div>
          <Link
            href={`/wallet/${order.id}`}
            className="inline-flex h-12 items-center justify-center rounded-2xl bg-brand-accent px-5 text-sm font-medium text-white transition hover:bg-brand-mid"
          >
            <ScanLine className="mr-2 size-4" />
            出示核銷
          </Link>
        </div>
      </article>
    );
  }

  return (
    <article className="rounded-[28px] border border-stone-200/80 bg-white p-5 shadow-sm md:p-6">
      <div className="space-y-3">
        <div>
          <p className="text-sm font-medium text-brand-accent">{order.storeName}</p>
          <h2 className="mt-1 text-xl font-semibold text-stone-900">{order.ticketTitle}</h2>
        </div>
        <div className="grid gap-3 text-sm text-stone-500 md:grid-cols-3">
          <p>核銷時間：{order.redeemedAt ? formatDateTime(order.redeemedAt) : "-"}</p>
          <p>核銷門市：{order.redeemedStore ?? "-"}</p>
          <p>訂單流水號：{order.id}</p>
        </div>
      </div>
    </article>
  );
}
