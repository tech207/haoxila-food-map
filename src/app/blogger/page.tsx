import type { Metadata } from "next";
import Link from "next/link";
import { BLOGGER_FEE_RATE_BASE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "部落客合作 — 好囍辣",
  description: "加入好囍辣分潤合作，讓內容創作轉化為持續性的餐飲收入。",
};

const partnershipModes = [
  { title: "分潤連結", description: "任何符合主題的創作者都能申請，審核後即可取得專屬導購連結。" },
  { title: "精選部落客", description: "通過編輯審核的創作者可進入首頁推薦位，提升長期轉換率。" },
  { title: "聯名套餐", description: "高流量創作者可與店家共同策劃限定方案，放大品牌辨識度。" },
];

const faq = [
  { q: "何時撥款？", a: "目前採每月結算，依核銷完成的金額統計，於次月撥款。" },
  { q: "有最低門檻嗎？", a: "Phase 1 暫不設合作門檻，會優先審核內容品質與受眾匹配度。" },
  { q: "可以合作多間店嗎？", a: "可以，同一位創作者可同時經營多家店家的合作內容。" },
  { q: "分潤依據是什麼？", a: "以讀者透過你的連結完成購買並核銷的金額為計算基礎。" },
  { q: "需要簽約嗎？", a: "精選合作與聯名方案會另外簽署合作條款，一般分潤則以平台條款為準。" },
];

export default function BloggerPage() {
  return (
    <div className="bg-customer-bg">
      <section className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-10">
        <div className="rounded-[36px] bg-[linear-gradient(135deg,#3f2218_0%,#8e4525_100%)] px-6 py-14 text-white shadow-[0_24px_80px_rgba(63,34,24,0.2)] md:px-10 md:py-16">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white/65">Creator Partnership</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">你的一篇食記，每次有人購票你都有分潤。</h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-white/78">不是單次業配，而是隨著每一次核銷持續累積的被動收入。</p>
          <Link href="/blogger/apply" className="mt-8 inline-flex h-12 items-center justify-center rounded-2xl bg-white px-6 text-sm font-semibold text-brand-deep">
            立即申請合作
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-4 md:px-6">
        <div className="grid gap-5 md:grid-cols-4">
          {["分享專屬連結", "讀者購票", "核銷成功", "自動分潤"].map((item, index) => (
            <article key={item} className="rounded-[28px] border border-stone-200 bg-white p-5 text-center shadow-sm">
              <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-brand-accent text-lg font-bold text-white">{index + 1}</div>
              <h2 className="mt-4 text-lg font-semibold text-brand-deep">{item}</h2>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <div className="grid gap-5 md:grid-cols-3">
          {partnershipModes.map((mode) => (
            <article key={mode.title} className="rounded-[28px] border border-stone-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-brand-deep">{mode.title}</h2>
              <p className="mt-3 text-sm leading-7 text-stone-500">{mode.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-4 md:px-6">
        <div className="overflow-hidden rounded-[32px] border border-stone-200 bg-white shadow-sm">
          <table className="min-w-full text-sm">
            <thead className="bg-stone-50 text-left text-stone-500">
              <tr>
                <th className="px-5 py-4 font-medium">合作方案</th>
                <th className="px-5 py-4 font-medium">分潤比例</th>
                <th className="px-5 py-4 font-medium">說明</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-5 py-4 font-medium text-brand-deep">一般合作</td>
                <td className="px-5 py-4 text-stone-600">{Math.round(BLOGGER_FEE_RATE_BASE * 100)}%</td>
                <td className="px-5 py-4 text-stone-600">任何人可申請</td>
              </tr>
              <tr className="bg-stone-50/50">
                <td className="px-5 py-4 font-medium text-brand-deep">精選部落客</td>
                <td className="px-5 py-4 text-stone-600">8%</td>
                <td className="px-5 py-4 text-stone-600">編輯審核後進首頁推薦</td>
              </tr>
              <tr>
                <td className="px-5 py-4 font-medium text-brand-deep">聯名套餐</td>
                <td className="px-5 py-4 text-stone-600">12%</td>
                <td className="px-5 py-4 text-stone-600">高流量創作者限定</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:pb-16">
        <div className="grid gap-6 md:grid-cols-[1fr_0.9fr]">
          <div className="rounded-[32px] border border-stone-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-brand-deep">常見問題</h2>
            <div className="mt-5 space-y-4">
              {faq.map((item) => (
                <div key={item.q} className="rounded-2xl bg-stone-50 p-4">
                  <p className="font-medium text-brand-deep">{item.q}</p>
                  <p className="mt-2 text-sm leading-7 text-stone-500">{item.a}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[32px] bg-brand-deep p-6 text-white shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/65">Apply</p>
            <h2 className="mt-4 text-3xl font-semibold">開始申請分潤合作</h2>
            <p className="mt-4 text-sm leading-7 text-white/75">告訴我們你的內容平台與受眾輪廓，團隊會在 3 個工作天內回覆。</p>
            <Link href="/blogger/apply" className="mt-8 inline-flex h-12 items-center justify-center rounded-2xl bg-white px-5 text-sm font-semibold text-brand-deep">
              前往申請頁
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
