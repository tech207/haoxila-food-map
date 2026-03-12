import { formatPrice } from "@/lib/customer-data";
import { getMerchantDashboardData } from "@/lib/merchant-data";

export const dynamic = "force-dynamic";

export default function MerchantReportsPage() {
  const dashboard = getMerchantDashboardData();
  const average = dashboard.recentRedemptions.length
    ? dashboard.recentRedemptions.reduce((sum, item) => sum + item.amount, 0) / dashboard.recentRedemptions.length
    : 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-brand-deep">營收報表</h1>
        <p className="mt-2 text-sm text-stone-500">先提供核銷金額與近期交易摘要，後續可再接完整報表查詢。</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-[28px] border border-stone-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-stone-500">本月核銷總額</p>
          <p className="mt-3 text-3xl font-semibold text-brand-deep">{formatPrice(dashboard.monthAmount)}</p>
        </div>
        <div className="rounded-[28px] border border-stone-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-stone-500">今日可撥款金額</p>
          <p className="mt-3 text-3xl font-semibold text-brand-deep">{formatPrice(dashboard.todayPayout)}</p>
        </div>
        <div className="rounded-[28px] border border-stone-200 bg-white p-5 shadow-sm">
          <p className="text-sm text-stone-500">平均單筆核銷</p>
          <p className="mt-3 text-3xl font-semibold text-brand-deep">{formatPrice(average)}</p>
        </div>
      </div>
    </div>
  );
}
