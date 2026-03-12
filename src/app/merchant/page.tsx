import Link from "next/link";
import { ArrowRight, Clock3 } from "lucide-react";
import { MerchantTrendChart } from "@/components/merchant/MerchantTrendChart";
import { StatsCard } from "@/components/merchant/StatsCard";
import { formatDateTime, formatPrice } from "@/lib/customer-data";
import { getMerchantDashboardData } from "@/lib/merchant-data";

export const dynamic = "force-dynamic";

export default function MerchantDashboardPage() {
  const dashboard = getMerchantDashboardData();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-[32px] bg-merchant-dark p-6 text-white shadow-xl md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-white/45">Merchant Dashboard</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">今日營運概覽</h1>
          <p className="mt-2 text-sm text-white/65">即時查看核銷金額、趨勢與最近交易。</p>
        </div>
        <Link
          href="/merchant/scan"
          className="inline-flex h-12 items-center justify-center rounded-2xl bg-brand-accent px-5 text-sm font-medium text-white"
        >
          開始核銷
          <ArrowRight className="ml-2 size-4" />
        </Link>
      </div>

      <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <StatsCard label="今日核銷筆數" value={`${dashboard.todayCount}`} />
        <StatsCard label="今日可撥款金額" value={formatPrice(dashboard.todayPayout)} />
        <StatsCard label="本月核銷總額" value={formatPrice(dashboard.monthAmount)} />
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_0.9fr]">
        <div className="rounded-[32px] border border-stone-200 bg-white p-6 shadow-sm">
          <div>
            <h2 className="text-xl font-semibold text-brand-deep">本週核銷趨勢</h2>
            <p className="mt-1 text-sm text-stone-500">過去 7 天每日核銷金額</p>
          </div>
          <div className="mt-6 h-[320px]">
            <MerchantTrendChart
              labels={dashboard.weeklyTrend.map((item) => item.label)}
              values={dashboard.weeklyTrend.map((item) => item.amount)}
            />
          </div>
        </div>

        <div className="rounded-[32px] border border-stone-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-brand-deep">最近 10 筆核銷</h2>
          <div className="mt-5 space-y-4">
            {dashboard.recentRedemptions.map((record) => (
              <article key={record.orderId} className="rounded-2xl bg-stone-100 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-stone-900">{record.ticketTitle}</p>
                    <p className="mt-1 text-sm text-stone-500">{record.customerName}</p>
                  </div>
                  <p className="font-semibold text-brand-accent">{formatPrice(record.amount)}</p>
                </div>
                <p className="mt-3 inline-flex items-center gap-2 text-sm text-stone-500">
                  <Clock3 className="size-4" />
                  {formatDateTime(record.redeemedAt)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
