"use client";

import { useState } from "react";
import { Edit3, PackageX } from "lucide-react";
import { formatDate, formatPrice } from "@/lib/customer-data";
import type { MerchantTicketRecord } from "@/lib/merchant-data";

type MerchantTicketsManagerProps = {
  initialTickets: MerchantTicketRecord[];
};

const initialForm = {
  title: "",
  description: "",
  originalPrice: "",
  price: "",
  quantity: "",
  validUntil: "",
};

export function MerchantTicketsManager({ initialTickets }: MerchantTicketsManagerProps) {
  const [tickets, setTickets] = useState(initialTickets);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState<string | null>(null);

  const submit = () => {
    if (!form.title || !form.price || !form.quantity || !form.validUntil) {
      return;
    }

    const payload: MerchantTicketRecord = {
      id: editingId ?? `ticket-local-${Date.now()}`,
      title: form.title,
      description: form.description,
      originalPrice: Number(form.originalPrice || 0),
      price: Number(form.price),
      quantity: Number(form.quantity),
      sold: editingId ? tickets.find((ticket) => ticket.id === editingId)?.sold ?? 0 : 0,
      redeemed: editingId ? tickets.find((ticket) => ticket.id === editingId)?.redeemed ?? 0 : 0,
      remaining: Number(form.quantity) - (editingId ? tickets.find((ticket) => ticket.id === editingId)?.sold ?? 0 : 0),
      validUntil: form.validUntil,
      status: "ACTIVE",
    };

    setTickets((current) =>
      editingId ? current.map((ticket) => (ticket.id === editingId ? payload : ticket)) : [payload, ...current],
    );
    setEditingId(null);
    setForm(initialForm);
  };

  const edit = (ticket: MerchantTicketRecord) => {
    setEditingId(ticket.id);
    setForm({
      title: ticket.title,
      description: ticket.description,
      originalPrice: String(ticket.originalPrice),
      price: String(ticket.price),
      quantity: String(ticket.quantity),
      validUntil: ticket.validUntil.slice(0, 10),
    });
  };

  const toggleStatus = (ticketId: string) => {
    setTickets((current) =>
      current.map((ticket) =>
        ticket.id === ticketId
          ? {
              ...ticket,
              status: ticket.status === "PAUSED" ? "ACTIVE" : "PAUSED",
            }
          : ticket,
      ),
    );
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_380px]">
      <section className="rounded-[32px] border border-stone-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold text-brand-deep">票券管理</h1>
            <p className="mt-2 text-sm text-stone-500">管理票券狀態、庫存與已售核銷數。</p>
          </div>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-stone-200 text-stone-500">
              <tr>
                <th className="px-3 py-3">標題</th>
                <th className="px-3 py-3">原價 / 折扣價</th>
                <th className="px-3 py-3">庫存 / 售出 / 核銷</th>
                <th className="px-3 py-3">狀態</th>
                <th className="px-3 py-3">操作</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map((ticket) => (
                <tr key={ticket.id} className="border-b border-stone-100 align-top">
                  <td className="px-3 py-4">
                    <p className="font-medium text-stone-900">{ticket.title}</p>
                    <p className="mt-1 max-w-sm text-stone-500">{ticket.description}</p>
                    <p className="mt-2 text-xs text-stone-400">到期日 {formatDate(ticket.validUntil)}</p>
                  </td>
                  <td className="px-3 py-4">
                    <p className="text-stone-400 line-through">{formatPrice(ticket.originalPrice)}</p>
                    <p className="mt-1 font-semibold text-brand-accent">{formatPrice(ticket.price)}</p>
                  </td>
                  <td className="px-3 py-4">
                    <p className="text-stone-700">
                      {ticket.remaining} / {ticket.sold} / {ticket.redeemed}
                    </p>
                    {ticket.remaining < 10 ? (
                      <p className="mt-2 inline-flex rounded-full bg-amber-100 px-2 py-1 text-xs font-medium text-amber-700">
                        剩餘低於 10 張
                      </p>
                    ) : null}
                  </td>
                  <td className="px-3 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                        ticket.status === "ACTIVE"
                          ? "bg-emerald-100 text-emerald-700"
                          : ticket.status === "PAUSED"
                            ? "bg-stone-200 text-stone-700"
                            : "bg-rose-100 text-rose-700"
                      }`}
                    >
                      {ticket.status}
                    </span>
                  </td>
                  <td className="px-3 py-4">
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => edit(ticket)}
                        className="inline-flex h-10 items-center rounded-xl border border-stone-300 px-3 text-sm text-stone-700"
                      >
                        <Edit3 className="mr-2 size-4" />
                        編輯
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleStatus(ticket.id)}
                        className="inline-flex h-10 items-center rounded-xl border border-stone-300 px-3 text-sm text-stone-700"
                      >
                        <PackageX className="mr-2 size-4" />
                        {ticket.status === "PAUSED" ? "重新上架" : "下架"}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <aside className="rounded-[32px] border border-stone-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-brand-deep">{editingId ? "編輯票券" : "新增票券"}</h2>
        <div className="mt-5 grid gap-4">
          <input
            value={form.title}
            onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
            placeholder="名稱"
            className="h-11 rounded-2xl border border-stone-200 px-4 text-sm outline-none focus:border-brand-accent"
          />
          <textarea
            value={form.description}
            onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
            placeholder="描述"
            className="min-h-28 rounded-2xl border border-stone-200 px-4 py-3 text-sm outline-none focus:border-brand-accent"
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              value={form.originalPrice}
              onChange={(event) => setForm((current) => ({ ...current, originalPrice: event.target.value }))}
              placeholder="原價"
              className="h-11 rounded-2xl border border-stone-200 px-4 text-sm outline-none focus:border-brand-accent"
            />
            <input
              value={form.price}
              onChange={(event) => setForm((current) => ({ ...current, price: event.target.value }))}
              placeholder="折扣價"
              className="h-11 rounded-2xl border border-stone-200 px-4 text-sm outline-none focus:border-brand-accent"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <input
              value={form.quantity}
              onChange={(event) => setForm((current) => ({ ...current, quantity: event.target.value }))}
              placeholder="庫存數量"
              className="h-11 rounded-2xl border border-stone-200 px-4 text-sm outline-none focus:border-brand-accent"
            />
            <input
              type="date"
              value={form.validUntil}
              onChange={(event) => setForm((current) => ({ ...current, validUntil: event.target.value }))}
              className="h-11 rounded-2xl border border-stone-200 px-4 text-sm outline-none focus:border-brand-accent"
            />
          </div>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={submit}
            className="inline-flex h-11 items-center justify-center rounded-2xl bg-brand-accent px-4 text-sm font-medium text-white"
          >
            {editingId ? "儲存變更" : "新增票券"}
          </button>
          {editingId ? (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setForm(initialForm);
              }}
              className="inline-flex h-11 items-center justify-center rounded-2xl border border-stone-300 px-4 text-sm font-medium text-stone-700"
            >
              取消
            </button>
          ) : null}
        </div>
      </aside>
    </div>
  );
}
