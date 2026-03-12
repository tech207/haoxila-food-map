import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarClock, ChevronLeft, MapPin, Star } from "lucide-react";
import { formatDate, formatPrice, getStoreById } from "@/lib/customer-data";
import { isDemoCustomerLoggedIn } from "@/lib/customer-session";

export default function RestaurantDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const store = getStoreById(params.id);
  const isLoggedIn = isDemoCustomerLoggedIn();

  if (!store) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 md:px-6 md:py-8">
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-stone-500">
        <ChevronLeft className="size-4" />
        返回探索
      </Link>

      <section className="mt-4 overflow-hidden rounded-[32px] border border-stone-200/80 bg-white shadow-sm">
        <div
          className="h-72 bg-cover bg-center md:h-[360px]"
          style={{ backgroundImage: `linear-gradient(180deg, rgba(20,20,20,0.12), rgba(20,20,20,0.5)), url(${store.coverImage})` }}
        />
        <div className="grid gap-8 p-6 md:grid-cols-[1.2fr_0.8fr] md:p-8">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-brand-accent/10 px-3 py-1 text-sm font-medium text-brand-accent">
                {store.district}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-700">
                <Star className="size-4 fill-current" />
                {store.rating.toFixed(1)} / 5
              </span>
            </div>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-stone-900 md:text-4xl">
              {store.name}
            </h1>
            <p className="mt-4 flex items-start gap-2 text-sm leading-6 text-stone-500">
              <MapPin className="mt-1 size-4 shrink-0" />
              {store.address}
            </p>
            <p className="mt-4 text-sm leading-7 text-stone-600">{store.description}</p>
          </div>

          <aside className="rounded-[28px] bg-stone-100 p-5">
            <p className="text-sm font-medium text-stone-500">最熱門票券一句話</p>
            <p className="mt-3 text-lg font-semibold leading-8 text-brand-deep">{store.hottestTicketLine}</p>
            <p className="mt-6 text-sm text-stone-500">核銷後評價</p>
            <p className="mt-2 text-3xl font-semibold text-stone-900">{store.reviewCount}</p>
          </aside>
        </div>
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold text-brand-deep">票券方案</h2>
        <div className="mt-4 space-y-4">
          {store.tickets.map((ticket) => {
            const remaining = ticket.quantity - ticket.sold;
            const purchaseHref = isLoggedIn
              ? `/restaurant/${store.id}/buy?ticketId=${ticket.id}`
              : `/login?next=/restaurant/${store.id}/buy?ticketId=${ticket.id}`;

            return (
              <article
                key={ticket.id}
                className="rounded-[28px] border border-stone-200/80 bg-white p-5 shadow-sm md:p-6"
              >
                <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
                  <div>
                    <h3 className="text-xl font-semibold text-stone-900">{ticket.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-stone-500">{ticket.description}</p>
                    <div className="mt-4 flex flex-wrap gap-3 text-sm text-stone-500">
                      <span className="line-through">{formatPrice(ticket.originalPrice)}</span>
                      <span className="font-semibold text-brand-accent">{formatPrice(ticket.price)}</span>
                      <span>剩餘 {remaining} 份</span>
                      <span className="inline-flex items-center gap-1">
                        <CalendarClock className="size-4" />
                        到期日 {formatDate(ticket.validUntil)}
                      </span>
                    </div>
                  </div>
                  <Link
                    href={purchaseHref}
                    className="inline-flex h-12 items-center justify-center rounded-2xl bg-brand-accent px-5 text-sm font-medium text-white transition hover:bg-brand-mid"
                  >
                    購買
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mt-8 pb-4">
        <h2 className="text-2xl font-semibold text-brand-deep">核銷後評價</h2>
        <div className="mt-4 space-y-4">
          {store.reviews.map((review) => (
            <article key={review.id} className="rounded-[28px] border border-stone-200/80 bg-white p-5 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-medium text-stone-900">{review.customerName}</p>
                  <div className="mt-1 flex items-center gap-1 text-amber-500">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star key={`${review.id}-${index}`} className={`size-4 ${index < review.rating ? "fill-current" : ""}`} />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-stone-500">{formatDate(review.createdAt)}</p>
              </div>
              <p className="mt-4 text-sm leading-6 text-stone-600">{review.content}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
