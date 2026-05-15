'use client';

import React from 'react';
import { Search, Calendar, Filter, User, Download } from 'lucide-react';
import { Input } from '@/ui/Input';
import { Button } from '@/ui/Button';

interface HistoryFiltersProps {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  method: string;
  setMethod: (val: string) => void;
  cashier: string;
  setCashier: (val: string) => void;
  status: string;
  setStatus: (val: string) => void;
}

export function HistoryFilters({
  searchTerm,
  setSearchTerm,
  method,
  setMethod,
  cashier,
  setCashier,
  status,
  setStatus
}: HistoryFiltersProps) {
  const statusTabs = ['Semua Status', 'Lunas', 'Tertunda', 'Refund'];

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Search */}
        <div className="relative col-span-1 md:col-span-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Cari Transaksi</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <Input 
              placeholder="ID Order, nama pelanggan..." 
              className="pl-10 h-11 bg-slate-50/50 border-transparent focus:bg-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Date */}
        <div>
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Tanggal</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <div className="h-11 flex items-center pl-10 pr-4 bg-slate-50/50 rounded-xl text-sm font-medium text-slate-600 border border-transparent cursor-pointer hover:bg-slate-100 transition-colors">
              05 Apr 2026
            </div>
          </div>
        </div>

        {/* Method */}
        <div>
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Metode Bayar</label>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <select 
              className="w-full h-11 pl-10 pr-4 bg-slate-50/50 rounded-xl text-sm font-medium text-slate-600 border border-transparent focus:outline-none appearance-none cursor-pointer hover:bg-slate-100 transition-colors"
              value={method}
              onChange={(e) => setMethod(e.target.value)}
            >
              <option>Semua metode</option>
              <option>Tunai</option>
              <option>QRIS</option>
              <option>Kartu Kredit</option>
            </select>
          </div>
        </div>

        {/* Cashier */}
        <div>
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Kasir</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <select 
              className="w-full h-11 pl-10 pr-4 bg-slate-50/50 rounded-xl text-sm font-medium text-slate-600 border border-transparent focus:outline-none appearance-none cursor-pointer hover:bg-slate-100 transition-colors"
              value={cashier}
              onChange={(e) => setCashier(e.target.value)}
            >
              <option>Semua kasir</option>
              <option>Eleanor</option>
              <option>Rian</option>
              <option>Aldi</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-2">
        <div className="flex bg-slate-50 p-1 rounded-xl w-full md:w-auto">
          {statusTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setStatus(tab)}
              className={`flex-1 md:flex-none px-6 py-2 rounded-lg text-xs font-bold transition-all ${
                status === tab 
                  ? 'bg-white text-[#0f9d58] shadow-sm' 
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

