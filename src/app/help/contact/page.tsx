import type { Metadata } from "next";
import { ContactForm } from "@/components/help/ContactForm";

export const metadata: Metadata = {
  title: "聯絡客服 — 好囍辣",
  description: "提交購票、退款、帳號或商家相關問題，我們會在 48 小時內回覆。",
};

export default function ContactPage() {
  return (
    <div className="bg-customer-bg">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6 md:py-10">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-accent">Contact Support</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-brand-deep">有任何問題，我們在這裡</h1>
          <p className="mt-4 text-sm leading-7 text-stone-500">平日 10:00 - 18:00 提供回覆服務，通常會在 48 小時內回應你的需求。</p>
        </div>
        <div className="mt-8">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
