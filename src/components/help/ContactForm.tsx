"use client";

import Link from "next/link";
import { useState } from "react";
import { supportContactSchema, type SupportContactInput } from "@/lib/site-forms";

type FieldErrors = Partial<Record<keyof SupportContactInput, string>>;

const initialForm: SupportContactInput = {
  name: "",
  email: "",
  category: "order",
  orderId: "",
  message: "",
};

const quickLinks = [
  { title: "查詢訂單狀態", description: "直接前往票夾查看目前票券狀態與 OTP。", href: "/wallet" },
  { title: "申請退款", description: "退款規則與方式先看政策頁，避免重複送件。", href: "/help/refund" },
  { title: "商家問題", description: "若你是餐廳商家，可直接填寫上架申請表。", href: "/merchant/apply" },
];

export function ContactForm() {
  const [form, setForm] = useState<SupportContactInput>(initialForm);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [ticketMessage, setTicketMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsed = supportContactSchema.safeParse(form);

    if (!parsed.success) {
      const nextErrors: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof SupportContactInput;
        nextErrors[key] = issue.message;
      }
      setErrors(nextErrors);
      return;
    }

    setSubmitting(true);
    setErrors({});
    setTicketMessage(null);

    const response = await fetch("/api/support/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed.data),
    });

    const result = await response.json();

    if (!response.ok) {
      setTicketMessage(result.message ?? "送出失敗，請稍後再試。");
      setSubmitting(false);
      return;
    }

    setTicketMessage(`已收到你的訊息，工單號碼 ${result.ticketId}`);
    setForm(initialForm);
    setSubmitting(false);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
      <div className="space-y-4">
        {quickLinks.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="block rounded-[28px] border border-stone-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <h3 className="text-lg font-semibold text-brand-deep">{item.title}</h3>
            <p className="mt-2 text-sm leading-7 text-stone-500">{item.description}</p>
          </Link>
        ))}

        <div className="rounded-[28px] border border-stone-200 bg-white p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-brand-deep">其他聯繫方式</h3>
          <p className="mt-3 text-sm leading-7 text-stone-500">
            Email：support@haoxila.tw
            <br />
            平日 10:00 - 18:00，48 小時內回覆。
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="rounded-[32px] border border-stone-200 bg-white p-6 shadow-sm md:p-8">
        <div className="grid gap-5 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-sm font-medium text-stone-700">姓名</span>
            <input
              value={form.name}
              onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
              className="h-11 w-full rounded-2xl border border-stone-200 px-4 text-sm outline-none focus:border-brand-accent"
            />
            {errors.name ? <p className="text-sm text-rose-600">{errors.name}</p> : null}
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium text-stone-700">Email</span>
            <input
              value={form.email}
              onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
              className="h-11 w-full rounded-2xl border border-stone-200 px-4 text-sm outline-none focus:border-brand-accent"
            />
            {errors.email ? <p className="text-sm text-rose-600">{errors.email}</p> : null}
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium text-stone-700">問題類型</span>
            <select
              value={form.category}
              onChange={(event) => setForm((current) => ({ ...current, category: event.target.value as SupportContactInput["category"] }))}
              className="h-11 w-full rounded-2xl border border-stone-200 px-4 text-sm outline-none focus:border-brand-accent"
            >
              <option value="order">購票問題</option>
              <option value="refund">退款申請</option>
              <option value="account">帳號問題</option>
              <option value="merchant">商家問題</option>
              <option value="other">其他</option>
            </select>
          </label>
          <label className="space-y-2">
            <span className="text-sm font-medium text-stone-700">訂單編號（選填）</span>
            <input
              value={form.orderId}
              onChange={(event) => setForm((current) => ({ ...current, orderId: event.target.value }))}
              className="h-11 w-full rounded-2xl border border-stone-200 px-4 text-sm outline-none focus:border-brand-accent"
            />
          </label>
          <label className="space-y-2 md:col-span-2">
            <span className="text-sm font-medium text-stone-700">內容</span>
            <textarea
              value={form.message}
              onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
              rows={7}
              className="w-full rounded-2xl border border-stone-200 px-4 py-3 text-sm outline-none focus:border-brand-accent"
            />
            {errors.message ? <p className="text-sm text-rose-600">{errors.message}</p> : null}
          </label>
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="mt-6 inline-flex h-12 items-center justify-center rounded-2xl bg-brand-accent px-5 text-sm font-semibold text-white transition hover:bg-brand-mid disabled:opacity-60"
        >
          {submitting ? "送出中..." : "送出客服需求"}
        </button>
        {ticketMessage ? <p className="mt-4 text-sm text-brand-mid">{ticketMessage}</p> : null}
      </form>
    </div>
  );
}
