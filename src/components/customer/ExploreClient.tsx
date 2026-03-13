"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { MapPin, Search } from "lucide-react";
import {
  categoryOptions,
  districtOptions,
  type ExploreCategory,
  type StoreRecord,
} from "@/lib/customer-data";
import { RestaurantCard } from "@/components/customer/RestaurantCard";

type ExploreClientProps = {
  stores: StoreRecord[];
};

export function ExploreClient({ stores }: ExploreClientProps) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ExploreCategory | "all">("all");
  const [selectedDistrict, setSelectedDistrict] = useState("全部行政區");

  const filteredStores = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    return stores.filter((store) => {
      const matchesSearch =
        keyword.length === 0 ||
        `${store.name} ${store.hottestTicketLine} ${store.categories.join(" ")}`
          .toLowerCase()
          .includes(keyword);
      const matchesCategory =
        selectedCategory === "all" || store.categories.includes(selectedCategory);
      const matchesDistrict =
        selectedDistrict === "全部行政區" || store.district === selectedDistrict;

      return matchesSearch && matchesCategory && matchesDistrict;
    });
  }, [search, selectedCategory, selectedDistrict, stores]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 md:px-6 md:py-8">
      <section className="overflow-hidden rounded-[28px] bg-brand-deep text-white shadow-[0_24px_80px_rgba(63,34,24,0.18)]">
        <div className="grid gap-6 px-5 py-6 md:grid-cols-[1.4fr_0.8fr] md:px-8 md:py-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/65">Explore</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-5xl">
              真實核銷後的口碑，幫你快速找到今天要吃的店。
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/75 md:text-base">
              用行政區、料理類型與即時搜尋縮小範圍，每張票券都對應到實際可用方案。
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="#stores"
                className="inline-flex h-11 items-center justify-center rounded-2xl bg-white px-5 text-sm font-semibold text-brand-deep transition hover:bg-stone-100"
              >
                瀏覽今日優惠 ↓
              </Link>
              <Link
                href="/wallet"
                className="inline-flex h-11 items-center justify-center rounded-2xl border border-white/20 bg-white/10 px-5 text-sm font-semibold text-white transition hover:bg-white/15"
              >
                我的票夾
              </Link>
            </div>
          </div>
          <div className="grid gap-4 rounded-[24px] bg-white/8 p-4 backdrop-blur">
            <div className="rounded-[20px] bg-white/10 p-4">
              <p className="text-sm text-white/60">上線店家</p>
              <p className="mt-2 text-3xl font-semibold">{stores.length}</p>
            </div>
            <div className="rounded-[20px] bg-white/10 p-4">
              <p className="text-sm text-white/60">熱門行政區</p>
              <p className="mt-2 text-2xl font-semibold">中山區 / 信義區</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-6 rounded-[28px] border border-stone-200/80 bg-white p-4 shadow-sm md:p-5">
        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_220px]">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-stone-400" />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="搜尋餐廳名稱、料理類型"
              className="h-12 w-full rounded-2xl border border-stone-200 bg-stone-50 pl-11 pr-4 text-sm outline-none transition focus:border-brand-accent focus:bg-white"
            />
          </label>
          <label className="flex items-center gap-3 rounded-2xl border border-stone-200 bg-stone-50 px-4">
            <MapPin className="size-4 text-brand-accent" />
            <select
              value={selectedDistrict}
              onChange={(event) => setSelectedDistrict(event.target.value)}
              className="h-12 w-full bg-transparent text-sm text-stone-700 outline-none"
            >
              {districtOptions.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="-mx-4 mt-4 overflow-x-auto px-4">
          <div className="flex min-w-max gap-2">
            <button
              type="button"
              onClick={() => setSelectedCategory("all")}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                selectedCategory === "all"
                  ? "bg-brand-accent text-white"
                  : "bg-stone-100 text-stone-600 hover:bg-stone-200"
              }`}
            >
              全部
            </button>
            {categoryOptions.map((category) => (
              <button
                key={category.key}
                type="button"
                onClick={() => setSelectedCategory(category.key)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  selectedCategory === category.key
                    ? "bg-brand-accent text-white"
                    : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="stores" className="mt-6 scroll-mt-24">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-brand-deep">探索餐廳</h2>
            <p className="mt-1 text-sm text-stone-500">共找到 {filteredStores.length} 間符合條件的店家</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredStores.map((store) => (
            <RestaurantCard key={store.id} store={store} />
          ))}
        </div>

        {filteredStores.length === 0 ? (
          <div className="mt-6 rounded-[28px] border border-dashed border-stone-300 bg-white/80 px-6 py-16 text-center text-stone-500">
            沒有符合條件的餐廳，請調整搜尋文字或行政區。
          </div>
        ) : null}
      </section>
    </div>
  );
}
