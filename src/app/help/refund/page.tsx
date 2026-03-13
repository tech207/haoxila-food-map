import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "退款政策 — 好囍辣",
  description: "了解好囍辣票券的退款規則與申請方式。",
};

const lastUpdated = "2026/03/13";

const rows = [
  ["購票後 7 天內，未核銷", "可申請", "全額", "5 個工作天"],
  ["超過 7 天，未核銷", "不可退", "—", "—"],
  ["票券已過期", "不可退", "—", "—"],
  ["已核銷", "不可退", "—", "—"],
  ["店家歇業 / 無法核銷", "強制退", "全額", "7 個工作天"],
  ["商家主動下架票券", "強制退", "全額", "5 個工作天"],
];

export default function RefundPage() {
  return (
    <div className="bg-customer-bg">
      <div className="mx-auto max-w-6xl px-4 py-8 md:px-6 md:py-10">
        <div className="rounded-[36px] border border-stone-200 bg-white px-6 py-12 shadow-sm md:px-10">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-accent">Refund Policy</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-brand-deep">退款政策</h1>
          <p className="mt-4 text-sm leading-7 text-stone-500">最後更新：{lastUpdated}</p>
        </div>

        <div className="mt-8 overflow-hidden rounded-[32px] border border-stone-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-stone-50 text-left text-stone-500">
                <tr>
                  <th className="px-5 py-4 font-medium">情境</th>
                  <th className="px-5 py-4 font-medium">是否可退款</th>
                  <th className="px-5 py-4 font-medium">金額</th>
                  <th className="px-5 py-4 font-medium">處理時間</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr key={row[0]} className={index % 2 === 0 ? "bg-white" : "bg-stone-50/50"}>
                    {row.map((cell, cellIndex) => (
                      <td key={`${row[0]}-${cellIndex}`} className="px-5 py-4 text-stone-600">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <article className="rounded-[32px] border border-stone-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-brand-deep">例外情況</h2>
            <p className="mt-4 text-sm leading-8 text-stone-600">
              若店家臨時歇業、現場無法核銷或涉及食安疑慮，平台將主動協助全額退款，並於 7 個工作天內完成處理。
            </p>
          </article>
          <article className="rounded-[32px] border border-stone-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-brand-deep">法規說明</h2>
            <p className="mt-4 text-sm leading-8 text-stone-600">
              依消費者保護法第 19 條精神，未核銷且於購買後 7 天內可提出退款申請；超過期限或已核銷則不適用。
            </p>
          </article>
        </div>

        <div className="mt-8 rounded-[32px] bg-brand-deep px-6 py-8 text-white">
          <h2 className="text-2xl font-semibold">需要申請退款？</h2>
          <p className="mt-3 text-sm leading-7 text-white/75">聯絡客服時請先準備訂單編號，能加快後續查核與處理速度。</p>
          <Link href="/help/contact" className="mt-6 inline-flex h-11 items-center justify-center rounded-2xl bg-white px-5 text-sm font-semibold text-brand-deep">
            前往聯絡客服
          </Link>
        </div>
      </div>
    </div>
  );
}
