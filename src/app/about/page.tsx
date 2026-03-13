import type { Metadata } from "next";
import Link from "next/link";
import { StepDiagram } from "@/components/ui/StepDiagram";
import { stores } from "@/lib/customer-data";

export const metadata: Metadata = {
  title: "關於好囍辣 — 台灣首個核銷後評價美食平台",
  description: "了解好囍辣如何透過 OTP 核銷與真實分潤，建立可信的美食口碑平台。",
};

const totalReviews = stores.reduce((acc, store) => acc + store.reviewCount, 0);
const districtSet = new Set(stores.map((store) => store.district));

const steps = [
  { step: "1", title: "顧客購券", description: "從探索頁挑選餐廳與方案，完成購買後票券立即進入票夾。" },
  { step: "2", title: "出示 OTP", description: "到店後開啟 30 秒動態 OTP，避免截圖或代碼被重複使用。" },
  { step: "3", title: "商家核銷", description: "商家輸入 OTP 完成驗證，訂單狀態同步切換為已使用。" },
  { step: "4", title: "開放評價", description: "只有完成核銷的消費者能留下公開評論，口碑更可信。" },
];

export default async function AboutPage() {
  return (
    <div className="bg-customer-bg">
      <section className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-10">
        <div
          className="overflow-hidden rounded-[36px] bg-brand-deep text-white shadow-[0_24px_80px_rgba(63,34,24,0.18)]"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(24,12,7,0.88), rgba(24,12,7,0.5)), url(https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=80)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="max-w-3xl px-6 py-14 md:px-10 md:py-20">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white/65">About HaoXiLa</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
              你看到的每一則評價，都是真正去吃過的人寫的。
            </h1>
            <p className="mt-5 text-base leading-8 text-white/78">
              好囍辣不是只賣折扣，而是把購券、到店、核銷、評價串成同一條可信的消費路徑。
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-4 md:px-6">
        <div className="grid gap-5 md:grid-cols-3">
          <article className="rounded-[28px] border border-stone-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-brand-deep">核銷後才能評價</h2>
            <p className="mt-3 text-sm leading-7 text-stone-500">評價入口只在核銷完成後開放，避免未消費就留言或惡意洗分。</p>
          </article>
          <article className="rounded-[28px] border border-stone-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-brand-deep">動態 OTP 防偽造</h2>
            <p className="mt-3 text-sm leading-7 text-stone-500">30 秒更新一次的一次性密碼，降低截圖轉售與假核銷風險。</p>
          </article>
          <article className="rounded-[28px] border border-stone-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-brand-deep">真實分潤給部落客</h2>
            <p className="mt-3 text-sm leading-7 text-stone-500">不只曝光，還把實際核銷成果回饋給創作者，形成可持續的內容合作模式。</p>
          </article>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <div className="grid gap-5 rounded-[32px] border border-stone-200 bg-white p-6 shadow-sm md:grid-cols-3">
          <div>
            <p className="text-sm text-stone-500">上線店家</p>
            <p className="mt-2 text-4xl font-semibold text-brand-deep">{stores.length}</p>
          </div>
          <div>
            <p className="text-sm text-stone-500">核銷評價</p>
            <p className="mt-2 text-4xl font-semibold text-brand-deep">{totalReviews}</p>
          </div>
          <div>
            <p className="text-sm text-stone-500">服務行政區</p>
            <p className="mt-2 text-4xl font-semibold text-brand-deep">{districtSet.size}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-4 md:grid-cols-[0.9fr_1.1fr] md:px-6">
        <article className="rounded-[32px] border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-accent">Founder Story</p>
          <h2 className="mt-4 text-3xl font-semibold text-brand-deep">為什麼會有好囍辣？</h2>
          <p className="mt-5 text-sm leading-8 text-stone-600">
            我們看到 Google 與社群平台上充斥著真假難辨的餐廳評價，店家無法判斷哪些回饋來自真實顧客，消費者也無法信任推薦內容。好囍辣把購券、核銷與評價綁在一起，讓每一則口碑都對應到一筆真實消費，讓餐廳、創作者與消費者重新站在同一條信任鏈上。
          </p>
        </article>
        <article className="rounded-[32px] border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-accent">Core Flow</p>
          <h2 className="mt-4 text-3xl font-semibold text-brand-deep">從購券到評價的完整機制</h2>
          <div className="mt-6">
            <StepDiagram items={steps} />
          </div>
        </article>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 md:px-6 md:pb-16">
        <div className="rounded-[32px] bg-brand-deep px-6 py-10 text-white md:flex md:items-center md:justify-between md:px-8">
          <div>
            <h2 className="text-3xl font-semibold">準備開始你的第一筆真實消費了嗎？</h2>
            <p className="mt-3 text-sm leading-7 text-white/75">不論你是顧客還是商家，都可以從這裡開始使用好囍辣。</p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3 md:mt-0">
            <Link href="/#stores" className="inline-flex h-11 items-center justify-center rounded-2xl bg-white px-5 text-sm font-semibold text-brand-deep">
              瀏覽今日優惠
            </Link>
            <Link href="/merchant/apply" className="inline-flex h-11 items-center justify-center rounded-2xl border border-white/20 px-5 text-sm font-semibold text-white">
              申請商家上架
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
