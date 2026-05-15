'use client';

import React from 'react';
import { Sidebar } from '@/components/kasir/Sidebar';
import { Navbar } from '@/components/kasir/Navbar';

export default function KasirLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-[#f9fafb] font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto bg-[#f9fafb]">
          <div style={{ zoom: 0.8 } as any} className="p-4 md:p-6 min-h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
