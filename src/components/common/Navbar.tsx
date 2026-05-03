'use client';

import React from 'react';
import { CardUser } from './CardUser';
import { usePathname } from 'next/navigation';

export function Navbar() {
  const pathname = usePathname();
  let title = '';
  let subtitle = '';

  if (pathname === '/admin/produk') {
    title = 'Manajemen Produk';
  } else if (pathname === '/admin') {
    title = 'Dashboard Admin';
  }

  return (
    <header className="bg-white flex items-center justify-between px-6 py-4 border-b border-slate-100 min-h-[80px]">
      <div>
        {title && <h1 className="text-2xl font-bold text-slate-800">{title}</h1>}
        {subtitle && <p className="text-sm text-slate-500 mt-1">{subtitle}</p>}
      </div>
      
      <div className="flex items-center ml-auto">
        <div className="flex items-center gap-3 cursor-pointer p-2 rounded-xl hover:bg-slate-50 transition-colors">
          <CardUser 
            name="Siti Aminah" 
            role="Super Admin" 
            initial="S"
            avatarUrl="https://i.pravatar.cc/150?u=siti"
          />
        </div>
      </div>
    </header>
  );
}
