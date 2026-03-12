import { MerchantRedeemClient } from "@/components/merchant/MerchantRedeemClient";
import { getMerchantDashboardData } from "@/lib/merchant-data";

export const dynamic = "force-dynamic";

export default function MerchantScanPage() {
  const dashboard = getMerchantDashboardData();

  return (
    <MerchantRedeemClient
      initialSummary={{
        todayCount: dashboard.todayCount,
        todayPayout: dashboard.todayPayout,
        monthAmount: dashboard.monthAmount,
      }}
    />
  );
}
