"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

type AccordionItem = {
  id: string;
  question: string;
  answer: string;
};

export function Accordion({ items }: { items: AccordionItem[] }) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className="space-y-3">
      {items.map((item) => {
        const open = item.id === openId;

        return (
          <article key={item.id} className="overflow-hidden rounded-[24px] border border-stone-200 bg-white shadow-sm">
            <button
              type="button"
              onClick={() => setOpenId(open ? null : item.id)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="text-base font-semibold text-brand-deep">{item.question}</span>
              <ChevronDown className={`size-5 shrink-0 text-stone-400 transition ${open ? "rotate-180" : ""}`} />
            </button>
            {open ? (
              <div className="border-t border-stone-100 px-5 py-4 text-sm leading-7 text-stone-600">{item.answer}</div>
            ) : null}
          </article>
        );
      })}
    </div>
  );
}
