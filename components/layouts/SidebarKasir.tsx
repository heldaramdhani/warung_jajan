"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Clock, LogOut, Store } from "lucide-react";

const MENU_ITEMS = [
  { name: "Dashboard", path: "/kasir" },
  { name: "Transaksi", path: "/kasir/transaksi" },
  { name: "Riwayat", path: "/kasir/riwayat" },
];

export default function SidebarKasir() {
  const pathname = usePathname();

  return (
    <aside className="w-[240px] bg-[#f8fafc] min-h-screen flex flex-col justify-between fixed top-0 left-0 bottom-0 z-40 border-r border-[#eef2f6]">
      <div>
        <div className="h-[72px] flex items-center px-6 border-b border-[#eef2f6] bg-white">
          <div className="flex items-center gap-3 text-[#00A86B]">
            <Store className="w-6 h-6" />
            <span className="text-[18px] font-bold text-slate-800 tracking-tight">
              Kasir
            </span>
          </div>
        </div>

        <nav className="px-5 mt-6 space-y-1.5">
          {MENU_ITEMS.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-3.5 px-4 py-3.5 rounded-xl transition-all ${
                  isActive
                    ? "bg-[#00A86B] text-white font-medium shadow-md shadow-[#00A86B]/20"
                    : "text-slate-500 hover:bg-slate-100 hover:text-slate-800 font-medium"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-5">
        <Link
          href="/login"
          className="flex items-center gap-3.5 px-4 py-3 rounded-xl text-slate-500 hover:bg-red-50 hover:text-red-600 font-medium transition-all"
        >
          <LogOut className="w-[18px] h-[18px] text-slate-400" />
          <span className="text-[13px]">Logout</span>
        </Link>
      </div>
    </aside>
  );
}
