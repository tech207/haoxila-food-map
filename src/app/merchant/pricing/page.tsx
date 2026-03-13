import type { Metadata } from "next";
import Link from "next/link";
import { CompareTable } from "@/components/ui/CompareTable";
import { PAYOUT_DAY, PLATFORM_FEE_RATE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "收費說明 — 好囍辣",
  description: "了解好囍辣的商家收費方式、撥款時程與常見問題。",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "好囍辣有上架費或底費嗎？",
      acceptedAnswer: { "@type": "Answer", text: "沒有。好囍辣採核銷後計費，賣出去且完成核銷才會產生平台服務費。" },
    },
    {
      "@type": "Question",
      name: "商家何時收到款項？",
      acceptedAnswer: { "@type": "Answer", text: `每月 15 日統計上月核銷金額，${PAYOUT_DAY} 日前完成撥款。` },
    },
  ],
};

export default function MerchantPricingPage() {
  const retained = 1000 * (1 - PLATFORM_FEE_RATE);

  return (
    <div className="bg-customer-bg">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-10">
        <div className="rounded-[36px] bg-[linear-gradient(135deg,#3f2218_0%,#8e4525_100%)] px-6 py-14 text-white shadow-sm md:px-10">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white/65">Pricing</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">賣出去才付費，沒有底費、沒有上架費</h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-white/78">
            每筆核銷金額抽 {Math.round(PLATFORM_FEE_RATE * 100)}% 平台服務費。賣 1,000 元，平台抽 150 元，商家到手 {retained} 元。
          </p>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <article className="rounded-[28px] border border-stone-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-stone-500">平台服務費</p>
            <p className="mt-2 text-4xl font-semibold text-brand-deep">{Math.round(PLATFORM_FEE_RATE * 100)}%</p>
          </article>
          <article className="rounded-[28px] border border-stone-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-stone-500">撥款節奏</p>
            <p className="mt-2 text-4xl font-semibold text-brand-deep">每月 {PAYOUT_DAY} 日前</p>
          </article>
          <article className="rounded-[28px] border border-stone-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-stone-500">是否有底費</p>
            <p className="mt-2 text-4xl font-semibold text-brand-deep">0 元</p>
          </article>
        </div>

        <div className="mt-8">
          <CompareTable
            columns={[
              { key: "haoxila", label: "好囍辣" },
              { key: "gomaji", label: "Gomaji" },
              { key: "ig", label: "自辦 IG 促銷" },
            ]}
            rows={[
              { label: "上架費", values: ["無", "常見額外檔期成本", "無"] },
              { label: "底費", values: ["無", "視合作條件", "無"] },
              { label: "評價機制", values: ["核銷後才能評價", "平台評論", "留言無驗證"] },
              { label: "分潤機制", values: ["內建部落客導購", "通常無", "需自行談合作"] },
            ]}
          />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <div className="rounded-[32px] border border-stone-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-brand-deep">撥款與計算方式</h2>
            <p className="mt-4 text-sm leading-8 text-stone-600">
              每月 15 日統計上月所有核銷金額，並於 {PAYOUT_DAY} 日前撥款至商家綁定銀行帳戶。若票價為 1,200 元、售出 50 張且全部核銷，總核銷金額為 60,000 元，扣除平台服務費後，商家實收 51,000 元。
            </p>
          </div>
          <div className="rounded-[32px] border border-stone-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-brand-deep">常見問題</h2>
            <div className="mt-4 space-y-4 text-sm leading-7 text-stone-600">
              <p><strong className="text-brand-deep">Q.</strong> 賣不出去會收費嗎？<br />不會，只有完成核銷的金額才會計費。</p>
              <p><strong className="text-brand-deep">Q.</strong> 撥款前需要做什麼？<br />需在商家設定頁綁定銀行帳號與收款資訊。</p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <Link href="/merchant/apply" className="inline-flex h-12 items-center justify-center rounded-2xl bg-brand-accent px-5 text-sm font-semibold text-white">
            立即申請上架
          </Link>
        </div>
      </div>
    </div>
  );
}
