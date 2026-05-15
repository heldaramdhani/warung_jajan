'use client';

import React from 'react';
import { CardUser } from '../common/CardUser';
import { usePathname } from 'next/navigation';

export function Navbar() {
  const pathname = usePathname();
  let title = 'Dashboard Kasir';
  let subtitle = '';

  if (pathname === '/kasir/transaksi') {
    title = 'Transaksi Baru';
    subtitle = 'Input pesanan pelanggan';
  } else if (pathname === '/kasir/riwayat') {
    title = 'Riwayat Transaksi';
    subtitle = 'Daftar semua transaksi yang telah dilakukan';
  }

  return (
    <header className="bg-white flex items-center justify-between px-6 py-4 border-b border-slate-100 min-h-[80px]">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">{title}</h1>
        {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>}
      </div>
      
      <div className="flex items-center ml-auto">
        <div className="flex items-center gap-3 cursor-pointer p-2 rounded-xl hover:bg-slate-50 transition-colors">
          <CardUser 
            name="Eleanor Pena" 
            role="Kasir" 
            initial="E"
            avatarUrl="https://i.pravatar.cc/150?u=eleanor"
          />
        </div>
      </div>
    </header>
  );
}
