import type { Metadata } from "next";
import { HelpCenterClient } from "@/components/help/HelpCenterClient";
import { faqItems } from "@/lib/faq-data";

export const metadata: Metadata = {
  title: "使用說明 — 好囍辣",
  description: "搜尋常見問題，了解購票、核銷、OTP 與票夾管理方式。",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export default function HelpPage() {
  return (
    <div className="bg-customer-bg">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <div className="mx-auto max-w-5xl px-4 py-8 md:px-6 md:py-10">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-accent">Help Center</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-brand-deep">使用說明與常見問題</h1>
          <p className="mt-4 text-sm leading-7 text-stone-500">從購票、OTP 核銷到票夾管理，所有常見操作與問題都整理在這裡。</p>
        </div>
        <div className="mt-8">
          <HelpCenterClient />
        </div>
      </div>
    </div>
  );
}
