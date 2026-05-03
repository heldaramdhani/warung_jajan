'use client';

import React from 'react';
import { Sidebar } from '@/components/common/Sidebar';
import { Navbar } from '@/components/common/Navbar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-[#f9fafb] font-sans">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto bg-[#f9fafb]">
          <div style={{ zoom: 0.75 } as any} className="p-4 md:p-6 min-h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
