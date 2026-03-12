"use client";

import { useState, useTransition } from "react";
import { RotateCcw, ScanLine } from "lucide-react";
import { RedeemForm } from "@/components/merchant/RedeemForm";
import { StatsCard } from "@/components/merchant/StatsCard";
import type { MerchantRedeemError } from "@/lib/merchant-data";

type MerchantDashboardSummary = {
  todayCount: number;
  todayPayout: number;
  monthAmount: number;
};

type MerchantRedeemClientProps = {
  initialSummary: MerchantDashboardSummary;
};

const errorMap = {
  NOT_FOUND: "找不到訂單，請確認 Order ID 或短碼。",
  ALREADY_REDEEMED: "這張票券已兌換，不能重複核銷。",
  OTP_EXPIRED: "OTP 已過期，請顧客重新整理頁面後再提供新碼。",
  OTP_INVALID: "OTP 驗證失敗，請再確認 6 位動態碼。",
} satisfies Record<MerchantRedeemError, string>;

export function MerchantRedeemClient({ initialSummary }: MerchantRedeemClientProps) {
  const [orderId, setOrderId] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [summary, setSummary] = useState(initialSummary);
  const [result, setResult] = useState<{
    status: "idle" | "success" | "error";
    message?: string;
    redemption?: {
      customerName: string;
      ticketTitle: string;
      redeemedAt: string;
      amountLabel: string;
    };
  }>({ status: "idle" });
  const [isPending, startTransition] = useTransition();

  const submit = () => {
    startTransition(async () => {
      const response = await fetch("/api/merchant/redeem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, otpCode }),
      });
      const rawPayload = (await response.json()) as
        | {
            ok: true;
            redemption: {
              customerName: string;
              ticketTitle: string;
              redeemedAt: string;
              amountLabel: string;
            };
            dashboard: MerchantDashboardSummary;
          }
        | { ok: false; error: MerchantRedeemError };

      if (!response.ok || !rawPayload.ok) {
        const error = "error" in rawPayload ? rawPayload.error : "OTP_INVALID";
        setResult({ status: "error", message: errorMap[error] });
        return;
      }

      setSummary(rawPayload.dashboard);
      setResult({
        status: "success",
        redemption: rawPayload.redemption,
        message: "核銷成功，今日統計已更新。",
      });
    });
  };

  const reset = () => {
    setOrderId("");
    setOtpCode("");
    setResult({ status: "idle" });
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
      <section className="rounded-[32px] border border-stone-200 bg-white p-6 shadow-sm md:p-8">
        <div className="flex items-center gap-3">
          <div className="grid size-12 place-items-center rounded-2xl bg-brand-accent/10 text-brand-accent">
            <ScanLine className="size-5" />
          </div>
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-brand-deep">OTP 核銷系統</h1>
            <p className="mt-1 text-sm text-stone-500">輸入顧客提供的 Order ID 與 6 位 OTP 動態碼。</p>
          </div>
        </div>

        <RedeemForm
          orderId={orderId}
          otpCode={otpCode}
          isPending={isPending}
          onOrderIdChange={setOrderId}
          onOtpCodeChange={setOtpCode}
          onSubmit={submit}
        />

        <div className="mt-6 flex flex-wrap gap-3">
          {result.status === "success" ? (
            <button
              type="button"
              onClick={reset}
              className="inline-flex h-12 items-center justify-center rounded-2xl border border-stone-300 px-5 text-sm font-medium text-stone-700"
            >
              <RotateCcw className="mr-2 size-4" />
              繼續核銷
            </button>
          ) : null}
        </div>

        {result.status !== "idle" ? (
          <div
            className={`mt-6 rounded-[24px] p-5 ${
              result.status === "success" ? "bg-emerald-50 text-emerald-800" : "bg-rose-50 text-rose-700"
            }`}
          >
            <p className="text-sm font-medium">{result.message}</p>
            {result.status === "success" && result.redemption ? (
              <div className="mt-3 grid gap-1 text-sm">
                <p>顧客名稱：{result.redemption.customerName}</p>
                <p>票券方案：{result.redemption.ticketTitle}</p>
                <p>核銷時間：{new Date(result.redemption.redeemedAt).toLocaleString("zh-TW")}</p>
                <p>金額：{result.redemption.amountLabel}</p>
              </div>
            ) : null}
          </div>
        ) : null}
      </section>

      <aside className="rounded-[32px] border border-stone-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-brand-deep">今日即時統計</h2>
        <div className="mt-5 grid gap-4">
          <StatsCard label="今日核銷筆數" value={`${summary.todayCount}`} />
          <StatsCard label="今日可撥款金額" value={`NT$ ${summary.todayPayout}`} />
          <StatsCard label="本月核銷總額" value={`NT$ ${summary.monthAmount}`} />
        </div>
      </aside>
    </div>
  );
}
