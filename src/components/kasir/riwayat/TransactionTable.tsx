'use client';

import React from 'react';
import { Clock, User as UserIcon } from 'lucide-react';

interface Transaction {
  id: string;
  waktu: string;
  method: string;
  pelanggan: string;
  kasir: string;
  total: string;
  status: string;
}

interface TransactionTableProps {
  transactions: Transaction[];
}

export function TransactionTable({ transactions }: TransactionTableProps) {
  const statusStyles: Record<string, string> = {
    'Lunas': 'bg-emerald-50 text-emerald-600 border-emerald-100',
    'Tertunda': 'bg-amber-50 text-amber-600 border-amber-100',
    'Refund': 'bg-rose-50 text-rose-600 border-rose-100',
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
      <div className="p-6 border-b border-slate-100 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold text-slate-800">Daftar Transaksi</h2>
          <p className="text-xs text-slate-400 font-medium">Tampilan ringkas semua transaksi terbaru hari ini.</p>
        </div>
        <span className="text-[10px] font-bold text-slate-400 bg-slate-50 px-3 py-1 rounded-full uppercase tracking-widest">
          {transactions.length} Transaksi Ditemukan
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50/50">
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 tracking-wider uppercase">ORDER</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 tracking-wider uppercase">PELANGGAN</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 tracking-wider uppercase">KASIR</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 tracking-wider uppercase">TOTAL</th>
              <th className="px-6 py-4 text-[10px] font-bold text-slate-400 tracking-wider uppercase">STATUS</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {transactions.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-10 text-center text-slate-400 text-sm font-medium">
                  Tidak ada transaksi yang sesuai dengan filter.
                </td>
              </tr>
            ) : (
              transactions.map((trx, i) => (
                <tr key={i} className="hover:bg-slate-50/80 transition-colors group cursor-pointer">
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-700">{trx.id}</span>
                      <div className="flex items-center gap-3 mt-1 text-[10px] text-slate-400 font-bold">
                        <span className="flex items-center gap-1"><Clock size={12} /> {trx.waktu} WIB</span>
                        <span className="flex items-center gap-1 uppercase tracking-widest">• {trx.method}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                        <UserIcon size={14} />
                      </div>
                      <span className="text-sm font-semibold text-slate-600">{trx.pelanggan}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-sm font-medium text-slate-500">{trx.kasir}</span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-sm font-bold text-slate-800">{trx.total}</span>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold border ${statusStyles[trx.status]}`}>
                      {trx.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

