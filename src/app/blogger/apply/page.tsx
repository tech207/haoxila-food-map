import type { Metadata } from "next";
import { BloggerApplyForm } from "@/components/blogger/BloggerApplyForm";

export const metadata: Metadata = {
  title: "申請部落客合作 — 好囍辣",
  description: "提交你的內容平台資料，申請加入好囍辣分潤合作。",
};

export default function BloggerApplyPage() {
  return (
    <div className="bg-customer-bg">
      <div className="mx-auto max-w-5xl px-4 py-8 md:px-6 md:py-10">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-accent">Apply</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-brand-deep">部落客合作申請</h1>
          <p className="mt-4 text-sm leading-7 text-stone-500">填寫你的內容平台資訊與合作意向，我們會在 3 個工作天內回覆是否進入下一階段。</p>
        </div>
        <div className="mt-8">
          <BloggerApplyForm />
        </div>
      </div>
    </div>
  );
}
