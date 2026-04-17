"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Package, FileText, Layers, Users, LogOut, Store } from 'lucide-react';

const MENU_ITEMS = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { name: 'Produk', icon: Package, path: '/dashboard/produk' },
  { name: 'Laporan', icon: FileText, path: '/dashboard/laporan' },
  { name: 'Stok', icon: Layers, path: '/dashboard/stok' },
  { name: 'Kelola User', icon: Users, path: '/dashboard/users' },
];

export default function SidebarAdmin() {
  const pathname = usePathname();

  return (
    <aside className="w-[260px] bg-[#f8fafc] min-h-screen flex flex-col justify-between fixed top-0 left-0 bottom-0 z-40 border-r border-[#eef2f6]">
      <div>
        <div className="h-[80px] flex items-center px-8 border-b border-[#eef2f6] bg-white">
          <div className="flex items-center gap-3 text-[#00A86B]">
            <Store className="w-6 h-6" />
            <span className="text-[18px] font-bold text-slate-800 tracking-tight">Admin</span>
          </div>
        </div>

        <nav className="px-5 mt-6 space-y-1.5">
          {MENU_ITEMS.map((item) => {
            const isActive = pathname === item.path || (pathname?.startsWith(item.path) && item.path !== '/dashboard');
            const Icon = item.icon;
            
            return (
              <Link 
                key={item.path} 
                href={item.path}
                className={`flex items-center gap-3.5 px-4 py-3.5 rounded-xl transition-all ${
                  isActive 
                    ? 'bg-[#00A86B] text-white font-medium shadow-md shadow-[#00A86B]/20' 
                    : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800 font-medium'
                }`}
              >
                <Icon className={`w-[18px] h-[18px] ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span className="text-[13px]">{item.name}</span>
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
          <LogOut className="w-[18px] h-[18px] text-slate-400 group-hover:text-red-500" />
          <span className="text-[13px]">Logout</span>
        </Link>
      </div>
    </aside>
  );
}
