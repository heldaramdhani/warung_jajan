import React from 'react';
import SidebarAdmin from '@/components/layouts/SidebarAdmin';
import HeaderAdmin from '@/components/layouts/HeaderAdmin';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-[#f9fafb] font-sans text-slate-800 flex">
      {/* Left Sidebar Fixed */}
      <SidebarAdmin />
      
      {/* Right Content Area */}
      <div className="ml-[260px] flex flex-col flex-1 min-h-screen">
        <HeaderAdmin title="Dashboard Admin" />
        
        <main className="flex-1 p-8 pb-12">
          {children}
        </main>
      </div>
    </div>
  );
}
