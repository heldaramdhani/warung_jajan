"use client";

import React from 'react';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';

interface HeaderAdminProps {
  title?: string;
  userName?: string;
  userRole?: string;
}

export default function HeaderAdmin({ 
  title = "Dashboard Admin", 
  userName = "Siti Aminah", 
  userRole = "Administrator Utama" 
}: HeaderAdminProps) {
  return (
    <header className="h-[80px] px-8 bg-[#fefefe] border-b border-[#eef2f6] flex items-center justify-between sticky top-0 z-30">
      <h1 className="text-[20px] font-bold text-slate-800 tracking-tight">{title}</h1>
      
      <div className="flex items-center gap-3.5 cursor-pointer hover:bg-slate-50 p-2 rounded-xl transition-colors">
        <div className="flex flex-col text-right">
          <span className="text-[13px] font-bold text-slate-800">{userName}</span>
          <span className="text-[11px] font-medium text-slate-400">{userRole}</span>
        </div>

        <div className="w-[38px] h-[38px] rounded-full overflow-hidden bg-slate-200 relative shadow-sm border border-slate-100 flex-shrink-0">
          <Image 
            src="/logo.png" 
            alt={userName} 
            fill
            unoptimized={true}
            className="object-cover"
            onError={(e) => {
              // Fallback if no image found
              e.currentTarget.style.display = 'none';
            }}
          />
          <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-500 text-xs font-bold absolute -z-10">
            SA
          </div>
        </div>
        
        <ChevronDown className="w-4 h-4 text-slate-300" />
      </div>
    </header>
  );
}
