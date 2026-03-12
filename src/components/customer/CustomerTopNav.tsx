"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Ticket } from "lucide-react";

const navLinks = [
  { href: "/", label: "探索" },
  { href: "/wallet", label: "票券" },
];

export function CustomerTopNav({ isLoggedIn = false }: { isLoggedIn?: boolean }) {
  const pathname = usePathname();
  const mobileLabel =
    pathname.startsWith("/wallet") ? "票夾" : pathname.startsWith("/profile") ? "我的" : "探索";

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
              <Link href="/wallet" className="p-2 text-brand-mid transition-colors hover:text-brand-accent">
                <Ticket size={20} />
              </Link>
              <Link href="/profile" className="text-sm font-medium text-brand-mid hover:text-brand-accent">
                我的帳戶
              </Link>
            </>
          ) : (
            <Link
              href="/login"
              className="rounded-lg bg-brand-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-brand-mid"
            >
              登入
            </Link>
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
          <Link href={isLoggedIn ? "/wallet" : "/login?next=/wallet"} className="font-medium text-stone-600">
            票夾
          </Link>
        </div>
      </header>
    </>
  );
}
