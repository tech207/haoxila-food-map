import type { Metadata } from "next";
import { StepDiagram } from "@/components/ui/StepDiagram";
import { ApplicationForm } from "@/components/merchant/ApplicationForm";
import { stores } from "@/lib/customer-data";

export const metadata: Metadata = {
  title: "申請商家上架 — 好囍辣",
  description: "讓真正吃過的顧客幫你說話，立即申請加入好囍辣。",
};

const steps = [
  { step: "1", title: "填寫申請", description: "先提供店家基本資料與聯絡資訊。" },
  { step: "2", title: "平台審核", description: "團隊會在 2 個工作天內完成初步審核。" },
  { step: "3", title: "設定票券", description: "確認方案、價格與核銷方式後上架。" },
  { step: "4", title: "正式開賣", description: "開始透過平台與創作者流量導入顧客。" },
];

export default function MerchantApplyPage() {
  return (
    <div className="bg-customer-bg">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
          <div className="space-y-6">
            <div className="rounded-[36px] bg-brand-deep p-6 text-white shadow-sm md:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white/65">Merchant Apply</p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight">讓真正吃過的顧客幫你說話</h1>
              <p className="mt-4 text-sm leading-7 text-white/75">
                零風險上線，核銷後才收費，把口碑、核銷與導購整合成同一套系統。
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <article className="rounded-[28px] border border-stone-200 bg-white p-5 shadow-sm">
                <h2 className="font-semibold text-brand-deep">賣出去才有成本</h2>
                <p className="mt-3 text-sm leading-7 text-stone-500">核銷後才收費，沒有底費與上架費壓力。</p>
              </article>
              <article className="rounded-[28px] border border-stone-200 bg-white p-5 shadow-sm">
                <h2 className="font-semibold text-brand-deep">評價更可信</h2>
                <p className="mt-3 text-sm leading-7 text-stone-500">每一張核銷票券都能轉化為真實顧客口碑。</p>
              </article>
              <article className="rounded-[28px] border border-stone-200 bg-white p-5 shadow-sm">
                <h2 className="font-semibold text-brand-deep">導入部落客流量</h2>
                <p className="mt-3 text-sm leading-7 text-stone-500">平台串接內容創作者，降低商家自行投放成本。</p>
              </article>
            </div>

            <div className="rounded-[32px] border border-stone-200 bg-white p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-brand-deep">上架流程</h2>
              <div className="mt-6">
                <StepDiagram items={steps} />
              </div>
            </div>

            <div className="rounded-[32px] border border-stone-200 bg-white p-6 shadow-sm">
              <p className="text-sm text-stone-500">已有合作店家</p>
              <p className="mt-2 text-4xl font-semibold text-brand-deep">{stores.length} 間</p>
            </div>
          </div>

          <ApplicationForm />
        </div>
      </div>
    </div>
  );
}
