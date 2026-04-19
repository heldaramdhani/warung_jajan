import React from "react";
import SidebarKasir from "@/components/layouts/SidebarKasir";

export default function KasirLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#f9fafb] font-sans text-slate-800 flex">
      <SidebarKasir />
      <div className="ml-[240px] flex flex-col flex-1 min-h-screen">
        <main className="flex-1 p-6 pb-10">{children}</main>
      </div>
    </div>
  );
}
