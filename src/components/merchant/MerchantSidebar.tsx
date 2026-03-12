"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ScanLine,
  TicketPercent,
  Settings,
  Menu,
  X,
  LogOut,
} from "lucide-react";

const navItems = [
  { href: "/merchant", label: "首頁", icon: LayoutDashboard },
  { href: "/merchant/scan", label: "核銷", icon: ScanLine },
  { href: "/merchant/coupons", label: "票券管理", icon: TicketPercent },
  { href: "/merchant/reports", label: "營收報表", icon: TicketPercent },
  { href: "/merchant/settings", label: "設定", icon: Settings },
];

function SidebarContent({ pathname, onClose }: { pathname: string; onClose?: () => void }) {
  return (
    <div className="flex flex-col h-full bg-merchant-dark text-white">
      {/* Logo */}
      <div className="flex items-center justify-between px-6 h-16 border-b border-white/10 shrink-0">
        <span className="text-lg font-bold tracking-tight">好囍辣 商家</span>
        {onClose && (
          <button onClick={onClose} className="p-1 text-white/60 hover:text-white md:hidden">
            <X size={20} />
          </button>
        )}
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== "/merchant" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? "bg-brand-accent text-white"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon size={18} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom: merchant name + logout */}
      <div className="px-4 py-4 border-t border-white/10 shrink-0">
        <p className="text-xs text-white/40 mb-3">登入中</p>
        <button className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors">
          <LogOut size={16} />
          登出
        </button>
      </div>
    </div>
  );
}

export function MerchantSidebar() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 h-14 bg-merchant-dark text-white flex items-center px-4 gap-3 border-b border-white/10">
        <button onClick={() => setDrawerOpen(true)} className="p-1 text-white/70 hover:text-white">
          <Menu size={22} />
        </button>
        <span className="font-bold text-base">好囍辣 商家</span>
      </header>

      {/* Mobile Drawer Overlay */}
      {drawerOpen && (
        <div
          className="md:hidden fixed inset-0 z-50 bg-black/50"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`md:hidden fixed top-0 left-0 z-50 h-full w-64 transform transition-transform duration-300 ${
          drawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent pathname={pathname} onClose={() => setDrawerOpen(false)} />
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col fixed left-0 top-0 h-full w-[270px] z-40">
        <SidebarContent pathname={pathname} />
      </aside>
    </>
  );
}
