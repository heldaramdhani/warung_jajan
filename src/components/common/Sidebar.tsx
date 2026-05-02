'use client';

import React from 'react';
import { Store, LayoutDashboard, Package, FileText, Layers, Users } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Sidebar() {
  const pathname = usePathname();

  const navLinks = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/produk', label: 'Produk', icon: Package },
    { href: '/admin/laporan', label: 'Laporan', icon: FileText },
    { href: '/admin/stok', label: 'Stok', icon: Layers },
    { href: '/admin/users', label: 'Kelola User', icon: Users },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-100 flex flex-col h-full">
      {/* Logo Area */}
      <div className="h-20 flex items-center px-6">
        <div className="flex items-center gap-3">
          <Store className="text-[#0f9d58]" size={24} />
          <span className="font-bold text-slate-800 text-lg">Admin</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-2">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-[#0f9d58] text-white'
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
              }`}
            >
              <Icon size={18} />
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-slate-100">
        <button className="group flex items-center gap-3 px-4 py-3 w-full text-slate-600 hover:text-red-600 hover:bg-red-50 active:bg-red-100 rounded-xl text-sm font-medium transition-colors">
          <div className="w-8 h-8 rounded-full bg-slate-800 group-hover:bg-red-600 text-white flex items-center justify-center text-xs font-medium transition-colors">
            N
          </div>
          Logout
        </button>
      </div>
    </aside>
  );
}
