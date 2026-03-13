import Link from "next/link";

const steps = [
  {
    number: "1",
    title: "瀏覽與購買",
    description: "探索真實核銷口碑推薦的在地餐廳，挑選喜歡的票券方案。",
  },
  {
    number: "2",
    title: "前往餐廳",
    description: "打開票夾，出示 30 秒動態 OTP 給店員確認。",
  },
  {
    number: "3",
    title: "店員核銷",
    description: "店員輸入 OTP 完成核銷，票券即時轉為已使用，降低偽冒風險。",
  },
  {
    number: "4",
    title: "真實評價",
    description: "核銷後才能留下評分，每一則星級都來自真實消費證明。",
  },
];

const footerGroups = [
  {
    title: "平台資訊",
    links: [
      { href: "/about", label: "關於好囍辣" },
      { href: "/blogger", label: "部落客合作" },
      { href: "/press", label: "媒體報導" },
    ],
  },
  {
    title: "商家服務",
    links: [
      { href: "/merchant/login", label: "商家後台登入" },
      { href: "/merchant/apply", label: "申請上架" },
      { href: "/merchant/pricing", label: "收費說明" },
    ],
  },
  {
    title: "幫助中心",
    links: [
      { href: "/help", label: "使用說明" },
      { href: "/help/refund", label: "退款政策" },
      { href: "/help/contact", label: "聯絡客服" },
    ],
  },
];

export function CustomerFooter() {
  return (
    <footer className="mt-16 overflow-hidden bg-[#140a06] text-stone-100">
      <section className="border-b border-white/6 bg-[radial-gradient(circle_at_top,rgba(184,93,51,0.28),transparent_48%),linear-gradient(180deg,#1a0c07_0%,#140a06_100%)]">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-accent/90">
              How It Works
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white md:text-4xl">
              好囍辣 怎麼運作？
            </h2>
            <p className="mt-4 text-sm leading-7 text-stone-300 md:text-base">
              從選擇到核銷，完整 O2O 閉環，讓每一筆消費都可被驗證、每則評價都有憑據。
            </p>
          </div>

          <div className="relative mt-12 grid gap-8 md:grid-cols-4 md:gap-6">
            <div className="absolute left-[12.5%] right-[12.5%] top-6 hidden h-px bg-gradient-to-r from-brand-accent/0 via-brand-accent/80 to-brand-accent/0 md:block" />
            {steps.map((step) => (
              <article key={step.number} className="relative text-center">
                <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-brand-accent text-xl font-bold text-white shadow-[0_0_30px_rgba(184,93,51,0.32)]">
                  {step.number}
                </div>
                <h3 className="mt-5 text-xl font-semibold text-white">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-stone-400">{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 md:grid-cols-[1.4fr_0.6fr_0.6fr_0.6fr] md:px-6">
          <div className="max-w-xl">
            <h3 className="text-3xl font-bold tracking-tight text-brand-accent">好囍辣 HaoXiLa</h3>
            <p className="mt-5 text-sm leading-8 text-stone-400">
              在地美食 O2O 平台，結合部落客口碑推薦與動態 OTP 核銷，讓每一筆消費都留下真實足跡。
            </p>
          </div>

          {footerGroups.map((group) => (
            <div key={group.title}>
              <h4 className="text-lg font-semibold text-white">{group.title}</h4>
              <div className="mt-5 space-y-3">
                {group.links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="block text-sm text-stone-400 transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-white/8">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 text-sm text-stone-500 md:flex-row md:items-center md:justify-between md:px-6">
            <p>© 2026 好囍辣 HaoXiLa. All rights reserved.</p>
            <div className="flex gap-5">
              <Link href="/help" className="transition hover:text-white">
                隱私政策
              </Link>
              <Link href="/help/refund" className="transition hover:text-white">
                服務條款
              </Link>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}
