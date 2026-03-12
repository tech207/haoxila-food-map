import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { formatDate, formatPrice, getStoreById, getTicketById } from "@/lib/customer-data";
import { isDemoCustomerLoggedIn } from "@/lib/customer-session";

export default function RestaurantBuyPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: { ticketId?: string };
}) {
  const isLoggedIn = isDemoCustomerLoggedIn();
  const store = getStoreById(params.id);
  const ticketId = searchParams?.ticketId;
  const ticket = ticketId ? getTicketById(ticketId) : store?.tickets[0] ? getTicketById(store.tickets[0].id) : undefined;

  if (!isLoggedIn) {
    redirect(`/login?next=/restaurant/${params.id}/buy${ticketId ? `?ticketId=${ticketId}` : ""}`);
  }

  if (!store || !ticket || ticket.storeId !== store.id) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 md:px-6 md:py-8">
      <Link href={`/restaurant/${store.id}`} className="inline-flex items-center gap-2 text-sm text-stone-500">
        <ChevronLeft className="size-4" />
        返回餐廳詳情
      </Link>
      <div className="mt-4 rounded-[32px] border border-stone-200 bg-white p-6 shadow-sm md:p-8">
        <p className="text-sm uppercase tracking-[0.24em] text-brand-accent">Checkout</p>
        <h1 className="mt-4 text-3xl font-semibold text-brand-deep">購券確認</h1>
        <div className="mt-6 space-y-4 rounded-[24px] bg-stone-100 p-5">
          <div>
            <p className="text-sm text-stone-500">{ticket.storeName}</p>
            <p className="mt-1 text-xl font-semibold text-stone-900">{ticket.title}</p>
          </div>
          <p className="text-sm text-stone-500">{ticket.description}</p>
          <div className="flex flex-wrap gap-3 text-sm text-stone-500">
            <span>{ticket.district}</span>
            <span>到期日 {formatDate(ticket.validUntil)}</span>
          </div>
          <p className="text-2xl font-semibold text-brand-accent">{formatPrice(ticket.price)}</p>
        </div>
        <p className="mt-6 text-sm leading-6 text-stone-500">
          這裡先保留為確認頁 UI，付款流程可在下一步接金流與正式訂單建立。
        </p>
        <Link
          href="/wallet"
          className="mt-8 inline-flex h-12 items-center justify-center rounded-2xl bg-brand-accent px-5 text-sm font-medium text-white"
        >
          前往我的票夾
        </Link>
      </div>
    </div>
  );
}
