"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, ChevronLeft } from "lucide-react";
import { OtpDisplay } from "@/components/customer/OtpDisplay";

type WalletOtpPayload = {
  orderId: string;
  status: "PAID" | "REDEEMED";
  otpCode: string;
  expiresIn: number;
  storeName: string;
  ticketTitle: string;
};

type WalletOtpClientProps = {
  orderId: string;
  initialData: WalletOtpPayload;
};

export function WalletOtpClient({ orderId, initialData }: WalletOtpClientProps) {
  const [payload, setPayload] = useState(initialData);
  const [remaining, setRemaining] = useState(initialData.expiresIn);

  useEffect(() => {
    setPayload(initialData);
    setRemaining(initialData.expiresIn);
  }, [initialData]);

  useEffect(() => {
    const tick = window.setInterval(() => {
      setRemaining((current) => {
        if (current <= 1) {
          return 0;
        }

        return current - 1;
      });
    }, 1000);

    return () => window.clearInterval(tick);
  }, []);

  useEffect(() => {
    if (payload.status !== "PAID") {
      return undefined;
    }

    const refresh = async () => {
      const response = await fetch(`/api/orders/${orderId}/otp`, { cache: "no-store" });
      if (!response.ok) {
        return;
      }

      const nextPayload = (await response.json()) as WalletOtpPayload;
      setPayload(nextPayload);
      setRemaining(nextPayload.expiresIn);
    };

    refresh();
    const interval = window.setInterval(refresh, 30000);

    return () => window.clearInterval(interval);
  }, [orderId, payload.status]);

  if (payload.status === "REDEEMED") {
    return (
      <div className="flex min-h-[100dvh] items-center justify-center bg-[#120c09] px-6 py-10 text-white">
        <div className="w-full max-w-lg rounded-[32px] border border-white/10 bg-white/6 p-8 text-center shadow-[0_20px_80px_rgba(0,0,0,0.32)] backdrop-blur">
          <CheckCircle2 className="mx-auto size-16 text-emerald-400" />
          <h1 className="mt-5 text-3xl font-semibold">已完成核銷</h1>
          <p className="mt-3 text-sm leading-6 text-white/70">
            這張票券已由店家完成核銷，系統重新整理後會顯示為已兌換狀態。
          </p>
          <p className="mt-6 text-base font-medium">
            {payload.storeName} · {payload.ticketTitle}
          </p>
          <Link
            href="/wallet"
            className="mt-8 inline-flex h-12 items-center justify-center rounded-2xl bg-white px-5 text-sm font-medium text-brand-deep"
          >
            返回我的票夾
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-[#120c09] px-6 py-10 text-white">
      <div className="w-full max-w-lg">
        <Link href="/wallet" className="mb-6 inline-flex items-center gap-2 text-sm text-white/70">
          <ChevronLeft className="size-4" />
          返回我的票夾
        </Link>

        <div className="rounded-[32px] border border-white/10 bg-white/6 p-8 text-center shadow-[0_20px_80px_rgba(0,0,0,0.32)] backdrop-blur">
          <p className="text-sm uppercase tracking-[0.24em] text-white/45">One-time Passcode</p>
          <div className="mt-8 flex justify-center">
            <OtpDisplay otpCode={payload.otpCode} remaining={remaining} />
          </div>

          <p className="mt-5 text-lg font-medium">{payload.storeName}</p>
          <p className="mt-2 text-sm text-white/65">{payload.ticketTitle}</p>
          <p className="mt-6 text-sm text-amber-300">剩餘 {remaining} 秒</p>
        </div>
      </div>
    </div>
  );
}
