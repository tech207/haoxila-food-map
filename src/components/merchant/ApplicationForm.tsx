"use client";

import { useState } from "react";
import { categoryOptions, districtOptions } from "@/lib/customer-data";
import { merchantApplySchema, type MerchantApplicationInput } from "@/lib/site-forms";

type FieldErrors = Partial<Record<keyof MerchantApplicationInput, string>>;

const initialForm: MerchantApplicationInput = {
  storeName: "",
  category: "latest",
  address: "",
  district: "中山區",
  contactName: "",
  phone: "",
  email: "",
  monthlyCustomers: "",
  note: "",
};

export function ApplicationForm() {
  const [form, setForm] = useState<MerchantApplicationInput>(initialForm);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsed = merchantApplySchema.safeParse(form);

    if (!parsed.success) {
      const nextErrors: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof MerchantApplicationInput;
        nextErrors[key] = issue.message;
      }
      setErrors(nextErrors);
      return;
    }

    setSubmitting(true);
    setErrors({});
    setResult(null);

    const response = await fetch("/api/merchant/applications", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed.data),
    });

    const payload = await response.json();

    if (!response.ok) {
      setResult(payload.message ?? "送出失敗，請稍後再試。");
      setSubmitting(false);
      return;
    }

    setResult(`申請已送出，案件編號 ${payload.applicationId}`);
    setForm(initialForm);
    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-[32px] border border-stone-200 bg-white p-6 shadow-sm md:p-8">
      <div className="grid gap-5 md:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-medium text-stone-700">店家名稱</span>
          <input
            value={form.storeName}
            onChange={(event) => setForm((current) => ({ ...current, storeName: event.target.value }))}
            className="h-11 w-full rounded-2xl border border-stone-200 px-4 text-sm outline-none focus:border-brand-accent"
          />
          {errors.storeName ? <p className="text-sm text-rose-600">{errors.storeName}</p> : null}
        </label>
        <label className="space-y-2">
          <span className="text-sm font-medium text-stone-700">店家類型</span>
          <select
            value={form.category}
            onChange={(event) => setForm((current) => ({ ...current, category: event.target.value as MerchantApplicationInput["category"] }))}
            className="h-11 w-full rounded-2xl border border-stone-200 px-4 text-sm outline-none focus:border-brand-accent"
          >
            {categoryOptions.map((option) => (
              <option key={option.key} value={option.key}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
        <label className="space-y-2 md:col-span-2">
          <span className="text-sm font-medium text-stone-700">地址</span>
          <input
            value={form.address}
            onChange={(event) => setForm((current) => ({ ...current, address: event.target.value }))}
            className="h-11 w-full rounded-2xl border border-stone-200 px-4 text-sm outline-none focus:border-brand-accent"
          />
          {errors.address ? <p className="text-sm text-rose-600">{errors.address}</p> : null}
        </label>
        <label className="space-y-2">
          <span className="text-sm font-medium text-stone-700">行政區</span>
          <select
            value={form.district}
            onChange={(event) => setForm((current) => ({ ...current, district: event.target.value as MerchantApplicationInput["district"] }))}
            className="h-11 w-full rounded-2xl border border-stone-200 px-4 text-sm outline-none focus:border-brand-accent"
          >
            {districtOptions.filter((district) => district !== "全部行政區").map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
        </label>
        <label className="space-y-2">
          <span className="text-sm font-medium text-stone-700">聯絡人</span>
          <input
            value={form.contactName}
            onChange={(event) => setForm((current) => ({ ...current, contactName: event.target.value }))}
            className="h-11 w-full rounded-2xl border border-stone-200 px-4 text-sm outline-none focus:border-brand-accent"
          />
          {errors.contactName ? <p className="text-sm text-rose-600">{errors.contactName}</p> : null}
        </label>
        <label className="space-y-2">
          <span className="text-sm font-medium text-stone-700">電話</span>
          <input
            value={form.phone}
            onChange={(event) => setForm((current) => ({ ...current, phone: event.target.value }))}
            className="h-11 w-full rounded-2xl border border-stone-200 px-4 text-sm outline-none focus:border-brand-accent"
          />
          {errors.phone ? <p className="text-sm text-rose-600">{errors.phone}</p> : null}
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
          <span className="text-sm font-medium text-stone-700">每月到店客數</span>
          <select
            value={form.monthlyCustomers}
            onChange={(event) => setForm((current) => ({ ...current, monthlyCustomers: event.target.value }))}
            className="h-11 w-full rounded-2xl border border-stone-200 px-4 text-sm outline-none focus:border-brand-accent"
          >
            <option value="">請選擇</option>
            <option value="100以下">100 以下</option>
            <option value="100-500">100 - 500</option>
            <option value="500以上">500 以上</option>
          </select>
        </label>
        <label className="space-y-2 md:col-span-2">
          <span className="text-sm font-medium text-stone-700">補充說明</span>
          <textarea
            value={form.note}
            onChange={(event) => setForm((current) => ({ ...current, note: event.target.value }))}
            rows={5}
            className="w-full rounded-2xl border border-stone-200 px-4 py-3 text-sm outline-none focus:border-brand-accent"
          />
          {errors.note ? <p className="text-sm text-rose-600">{errors.note}</p> : null}
        </label>
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="mt-6 inline-flex h-12 items-center justify-center rounded-2xl bg-brand-accent px-5 text-sm font-semibold text-white transition hover:bg-brand-mid disabled:opacity-60"
      >
        {submitting ? "送出中..." : "送出上架申請"}
      </button>
      {result ? <p className="mt-4 text-sm text-brand-mid">{result}</p> : null}
    </form>
  );
}
