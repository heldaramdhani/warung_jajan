import React from "react";
import SidebarAdmin from "@/components/layouts/admin/Sidebar";
import HeaderAdmin from "@/components/layouts/admin/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#f9fafb] font-sans text-slate-800 flex">
      {/* Left Sidebar Fixed */}
      <SidebarAdmin />

      {/* Right Content Area */}
      <div className="ml-[240px] flex flex-col flex-1 min-h-screen">
        <HeaderAdmin title="Dashboard Admin" />

        <main className="flex-1 p-6 pb-10">{children}</main>
      </div>
    </div>
  );
}
