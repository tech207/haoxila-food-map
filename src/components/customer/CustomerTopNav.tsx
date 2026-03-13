"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CircleUserRound, Ticket } from "lucide-react";

const navLinks = [
  { href: "/", label: "探索" },
  { href: "/wallet", label: "票券" },
];

export function CustomerTopNav({ isLoggedIn = false }: { isLoggedIn?: boolean }) {
  const pathname = usePathname();
  const mobileLabel =
    pathname.startsWith("/wallet") ? "票夾" : pathname.startsWith("/profile") ? "我的" : "探索";
  const profileName = "王小美";

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-50 hidden h-16 items-center gap-6 border-b border-stone-200 bg-white/90 px-6 backdrop-blur md:flex">
        <Link href="/" className="shrink-0 text-xl font-bold tracking-tight text-brand-deep">
          好囍辣
        </Link>

        <nav className="ml-4 flex items-center gap-4">
          {navLinks.map(({ href, label }) => {
            const active = href === "/" ? pathname === "/" : pathname.startsWith(href);

            return (
            <Link
              key={href}
              href={href}
              className={`text-sm font-medium transition-colors ${
                active ? "text-brand-accent" : "text-stone-600 hover:text-brand-mid"
              }`}
            >
              {label}
            </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-3">
          {isLoggedIn ? (
            <>
              <Link
                href="/wallet"
                className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-stone-200 bg-stone-50 text-brand-mid transition hover:border-brand-accent/30 hover:text-brand-accent"
                aria-label="我的票券"
              >
                <Ticket size={20} />
              </Link>
              <Link
                href="/profile"
                className="inline-flex items-center gap-3 rounded-2xl border border-stone-200 bg-white px-3 py-2 text-sm font-medium text-brand-deep transition hover:border-brand-accent/30 hover:text-brand-accent"
              >
                <span className="flex size-9 items-center justify-center rounded-full bg-brand-accent/12 text-brand-accent">
                  <CircleUserRound size={20} />
                </span>
                <span>{profileName}</span>
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/merchant/login"
                className="inline-flex h-10 items-center justify-center rounded-xl bg-[#1d100b] px-4 text-sm font-semibold text-white transition hover:bg-[#2a1710]"
              >
                商家後台
              </Link>
              <Link
                href="/login"
                className="inline-flex h-10 items-center justify-center rounded-xl bg-brand-accent px-5 text-sm font-semibold text-white transition hover:bg-brand-mid"
              >
                登入
              </Link>
            </>
          )}
        </div>
      </header>

      <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-stone-200 bg-white/92 px-4 backdrop-blur md:hidden">
        <Link href="/" className="text-lg font-bold tracking-tight text-brand-deep">
          好囍辣
        </Link>
        <div className="flex items-center gap-3 text-sm">
          <span className="rounded-full bg-brand-accent/10 px-3 py-1 font-medium text-brand-accent">
            {mobileLabel}
          </span>
          {isLoggedIn ? (
            <div className="flex items-center gap-2">
              <Link
                href="/wallet"
                className="inline-flex size-9 items-center justify-center rounded-full bg-brand-accent/10 text-brand-accent"
                aria-label="我的票券"
              >
                <Ticket size={18} />
              </Link>
              <Link href="/profile" className="inline-flex items-center gap-2 font-medium text-stone-700">
                <span className="flex size-8 items-center justify-center rounded-full bg-brand-accent/12 text-brand-accent">
                  <CircleUserRound size={17} />
                </span>
                <span>{profileName}</span>
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/merchant/login"
                className="inline-flex h-9 items-center justify-center rounded-lg bg-[#1d100b] px-3 text-xs font-semibold text-white"
              >
                商家後台
              </Link>
              <Link
                href="/login"
                className="inline-flex h-9 items-center justify-center rounded-lg bg-brand-accent px-3 text-xs font-semibold text-white"
              >
                登入
              </Link>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
