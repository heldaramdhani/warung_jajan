"use client";

import React from 'react';

export default function RevenueChart() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col h-full w-full relative">
      <div className="mb-6">
        <h3 className="text-[15px] font-bold text-slate-800">Tren Pendapatan Harian</h3>
        <p className="text-[12px] text-slate-400 mt-0.5">Analitik pendapatan dalam 7 hari terakhir</p>
      </div>
      
      {/* Mockup Line Chart Container */}
      <div className="relative flex-1 w-full min-h-[180px] flex items-end">
        {/* Grid Lines */}
        <div className="absolute inset-0 flex flex-col justify-between pt-2">
          {[3, 2, 1, 0].map((val) => (
            <div key={val} className="w-full flex items-center">
              <span className="text-[11px] text-slate-400 w-12 font-medium">
                {val === 0 ? "0" : `Rp ${val}M`}
              </span>
              <div className="flex-1 border-b border-slate-100/80"></div>
            </div>
          ))}
        </div>
        
        {/* Mock Line Graph */}
        <div className="absolute inset-x-12 inset-y-0 flex items-end justify-between px-2 top-3 bottom-[0.85rem]">
            <svg viewBox="0 0 400 150" className="w-full h-full preserve-3d" preserveAspectRatio="none">
               <defs>
                   <linearGradient id="gradientLine" x1="0" y1="0" x2="0" y2="1">
                       <stop offset="0%" stopColor="#00A86B" stopOpacity="0.25" />
                       <stop offset="100%" stopColor="#00A86B" stopOpacity="0" />
                   </linearGradient>
               </defs>
               <path d="M 0 100 L 80 80 L 160 110 L 240 60 L 320 70 L 400 20 L 400 150 L 0 150 Z" fill="url(#gradientLine)" />
               <path d="M 0 100 L 80 80 L 160 110 L 240 60 L 320 70 L 400 20" fill="none" stroke="#00A86B" strokeWidth="2.5" />
               {/* Points */}
               <circle cx="0" cy="100" r="3.5" fill="white" stroke="#00A86B" strokeWidth="2" />
               <circle cx="80" cy="80" r="3.5" fill="white" stroke="#00A86B" strokeWidth="2" />
               <circle cx="160" cy="110" r="3.5" fill="white" stroke="#00A86B" strokeWidth="2" />
               <circle cx="240" cy="60" r="3.5" fill="white" stroke="#00A86B" strokeWidth="2" />
               <circle cx="320" cy="70" r="3.5" fill="white" stroke="#00A86B" strokeWidth="2" />
               <circle cx="400" cy="20" r="3.5" fill="white" stroke="#00A86B" strokeWidth="2" />
            </svg>
        </div>
        
        {/* X Axis Labels */}
        <div className="absolute -bottom-7 left-12 right-0 flex justify-between px-2">
            {['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'].map((day) => (
                <span key={day} className="text-[11px] font-medium text-slate-400">{day}</span>
            ))}
        </div>
      </div>
      <div className="h-4"></div>
    </div>
  );
}
