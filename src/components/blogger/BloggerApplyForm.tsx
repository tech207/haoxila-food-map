"use client";

import { useState } from "react";
import { bloggerApplySchema, type BloggerApplicationInput } from "@/lib/site-forms";

type FieldErrors = Partial<Record<keyof BloggerApplicationInput, string>>;

const initialForm: BloggerApplicationInput = {
  name: "",
  blogUrl: "",
  monthlyTraffic: "",
  note: "",
};

export function BloggerApplyForm() {
  const [form, setForm] = useState<BloggerApplicationInput>(initialForm);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsed = bloggerApplySchema.safeParse(form);

    if (!parsed.success) {
      const nextErrors: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof BloggerApplicationInput;
        nextErrors[key] = issue.message;
      }
      setErrors(nextErrors);
      return;
    }

    setSubmitting(true);
    setErrors({});
    setSuccessMessage(null);

    const response = await fetch("/api/blogger/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed.data),
    });

    const result = await response.json();

    if (!response.ok) {
      setSuccessMessage(result.message ?? "申請送出失敗，請稍後再試。");
      setSubmitting(false);
      return;
    }

    setSuccessMessage(result.message);
    setForm(initialForm);
    setSubmitting(false);
  };

  return (
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
          <span className="text-sm font-medium text-stone-700">部落格 / IG / YouTube URL</span>
          <input
            value={form.blogUrl}
            onChange={(event) => setForm((current) => ({ ...current, blogUrl: event.target.value }))}
            className="h-11 w-full rounded-2xl border border-stone-200 px-4 text-sm outline-none focus:border-brand-accent"
          />
          {errors.blogUrl ? <p className="text-sm text-rose-600">{errors.blogUrl}</p> : null}
        </label>
        <label className="space-y-2">
          <span className="text-sm font-medium text-stone-700">月流量</span>
          <input
            value={form.monthlyTraffic}
            onChange={(event) => setForm((current) => ({ ...current, monthlyTraffic: event.target.value }))}
            placeholder="例如：50,000 UV / 月"
            className="h-11 w-full rounded-2xl border border-stone-200 px-4 text-sm outline-none focus:border-brand-accent"
          />
        </label>
        <label className="space-y-2 md:col-span-2">
          <span className="text-sm font-medium text-stone-700">合作意向</span>
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
        {submitting ? "送出中..." : "送出合作申請"}
      </button>
      {successMessage ? <p className="mt-4 text-sm text-brand-mid">{successMessage}</p> : null}
    </form>
  );
}
