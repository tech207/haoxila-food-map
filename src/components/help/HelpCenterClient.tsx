"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Accordion } from "@/components/ui/Accordion";
import { faqItems, type FaqCategory } from "@/lib/faq-data";

const tabs: { key: FaqCategory; label: string }[] = [
  { key: "purchase", label: "購票流程" },
  { key: "otp", label: "核銷與 OTP" },
  { key: "wallet", label: "票夾管理" },
  { key: "account", label: "帳號" },
];

export function HelpCenterClient() {
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<FaqCategory>("purchase");

  const filteredItems = useMemo(() => {
    const keyword = search.trim();

    return faqItems.filter((item) => {
      const matchesTab = item.category === tab;
      const matchesSearch =
        keyword.length === 0 || item.question.includes(keyword) || item.answer.includes(keyword);

      return matchesTab && matchesSearch;
    });
  }, [search, tab]);

  return (
    <div className="space-y-6">
      <div className="rounded-[32px] border border-stone-200 bg-white p-5 shadow-sm md:p-6">
        <label className="relative block">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-stone-400" />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="搜尋關鍵字，例如：OTP、退款、購買"
            className="h-12 w-full rounded-2xl border border-stone-200 bg-stone-50 pl-11 pr-4 text-sm outline-none transition focus:border-brand-accent focus:bg-white"
          />
        </label>
        <div className="mt-4 flex flex-wrap gap-2">
          {tabs.map((item) => (
            <button
              key={item.key}
              type="button"
              onClick={() => setTab(item.key)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                tab === item.key ? "bg-brand-accent text-white" : "bg-stone-100 text-stone-600"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <Accordion items={filteredItems} />
    </div>
  );
}
