import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "媒體報導 — 好囍辣",
  description: "查看好囍辣的媒體報導、品牌資源與新聞聯絡資訊。",
};

export const revalidate = 3600;

type PressItem = {
  id: string;
  outlet: string;
  title: string;
  publishedAt: string;
  excerpt: string;
  url: string;
};

const pressItems: PressItem[] = [
  {
    id: "press-1",
    outlet: "台灣餐飲觀察",
    title: "好囍辣用 OTP 核銷，把餐廳口碑拉回真實消費場景",
    publishedAt: "2026-03-01",
    excerpt: "從購券、到店到評論公開，完整驗證每一次消費真實性，成為餐飲 O2O 新嘗試。",
    url: "https://example.com/press/haoxila-otp",
  },
  {
    id: "press-2",
    outlet: "創業新聲",
    title: "不只團購折扣，好囍辣想做的是可信的餐飲口碑基礎設施",
    publishedAt: "2026-02-20",
    excerpt: "平台把部落客導購與核銷後評價整合，讓餐廳可以追蹤真正產生的業績與口碑。",
    url: "https://example.com/press/haoxila-review",
  },
  {
    id: "press-3",
    outlet: "數位品牌誌",
    title: "從假評論焦慮出發，HaoXiLa 如何打造可信任的美食平台？",
    publishedAt: "2026-01-18",
    excerpt: "創辦團隊從餐飲店家對評論失真的痛點出發，重新設計顧客與商家的信任流程。",
    url: "https://example.com/press/haoxila-brand",
  },
];

export default function PressPage() {
  return (
    <div className="bg-customer-bg">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-10">
        <div className="rounded-[36px] border border-stone-200 bg-white px-6 py-12 shadow-sm md:px-10">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-accent">Press</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-brand-deep">媒體報導與品牌資源</h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-stone-500">
            這裡整理好囍辣的公開報導、品牌素材與聯絡窗口，方便媒體與合作夥伴快速取用。
          </p>
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-4">
            {pressItems.map((item) => (
              <article key={item.id} className="rounded-[28px] border border-stone-200 bg-white p-6 shadow-sm">
                <p className="text-sm font-medium text-brand-accent">{item.outlet}</p>
                <h2 className="mt-2 text-2xl font-semibold text-brand-deep">{item.title}</h2>
                <p className="mt-2 text-sm text-stone-400">{item.publishedAt}</p>
                <p className="mt-4 text-sm leading-7 text-stone-500">{item.excerpt}</p>
                <a href={item.url} target="_blank" rel="noreferrer" className="mt-5 inline-flex text-sm font-semibold text-brand-accent">
                  閱讀原文
                </a>
              </article>
            ))}
          </div>

          <aside className="space-y-4">
            <div className="rounded-[28px] border border-stone-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-brand-deep">品牌資源下載</h2>
              <div className="mt-5 space-y-3">
                <a href="/press/haoxila-logo.svg" download className="block rounded-2xl bg-stone-50 px-4 py-3 text-sm text-stone-600">
                  下載 Logo SVG
                </a>
                <a href="/press/brand-colors.txt" download className="block rounded-2xl bg-stone-50 px-4 py-3 text-sm text-stone-600">
                  下載品牌色票
                </a>
                <a href="/press/company-profile.txt" download className="block rounded-2xl bg-stone-50 px-4 py-3 text-sm text-stone-600">
                  下載公司簡介
                </a>
              </div>
            </div>
            <div className="rounded-[28px] border border-stone-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-brand-deep">聯絡窗口</h2>
              <p className="mt-4 text-sm leading-7 text-stone-500">
                媒體聯絡：press@haoxila.tw
                <br />
                回覆時間：平日 10:00 - 18:00
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
