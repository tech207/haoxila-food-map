import Link from "next/link";
import { MapPin, Star, Ticket } from "lucide-react";
import type { StoreRecord } from "@/lib/customer-data";

export function RestaurantCard({ store }: { store: StoreRecord }) {
  return (
    <Link
      href={`/restaurant/${store.id}`}
      className="group overflow-hidden rounded-[28px] border border-stone-200/80 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
    >
      <div
        className="h-52 bg-cover bg-center transition duration-500 group-hover:scale-[1.03]"
        style={{ backgroundImage: `linear-gradient(180deg, rgba(20, 20, 20, 0.06), rgba(20, 20, 20, 0.38)), url(${store.coverImage})` }}
      />
      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold text-stone-900">{store.name}</h3>
            <p className="mt-1 flex items-center gap-1 text-sm text-stone-500">
              <MapPin className="size-4" />
              {store.district}
            </p>
          </div>
          <div className="flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-700">
            <Star className="size-4 fill-current" />
            {store.rating.toFixed(1)}
          </div>
        </div>
        <p className="text-sm leading-6 text-stone-600">{store.hottestTicketLine}</p>
        <div className="flex items-center justify-between border-t border-dashed border-stone-200 pt-4">
          <div className="flex items-center gap-2 text-sm text-brand-accent">
            <Ticket className="size-4" />
            最熱門票券
          </div>
          <span className="text-sm text-stone-500">{store.reviewCount} 則核銷評價</span>
        </div>
      </div>
    </Link>
  );
}
