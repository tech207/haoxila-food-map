"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, Ticket, User } from "lucide-react";

const navItems = [
  { href: "/", label: "探索", icon: Compass },
  { href: "/wallet", label: "票券", icon: Ticket },
  { href: "/profile", label: "我的", icon: User },
];

export function CustomerBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-stone-200 md:hidden">
      <div className="flex items-center justify-around h-16">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center gap-1 px-4 py-1 text-xs font-medium transition-colors ${
                active ? "text-brand-accent" : "text-stone-400 hover:text-brand-mid"
              }`}
            >
              <Icon size={22} strokeWidth={active ? 2.5 : 1.8} />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
