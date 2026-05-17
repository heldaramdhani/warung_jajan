'use client';

import React from 'react';
import { Wallet, QrCode, CreditCard, Clock, CheckCircle2, RotateCcw } from 'lucide-react';

export function SideSummary() {
  return (
    <div className="space-y-6">
      {/* Ringkasan Cepat */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <h3 className="text-sm font-bold text-slate-800 mb-4">Ringkasan Cepat</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between group">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <Wallet size={16} />
              </div>
              <span className="text-xs font-bold text-slate-500">Tunai</span>
            </div>
            <span className="text-sm font-extrabold text-slate-800">Rp 3.420.000</span>
          </div>

          <div className="flex items-center justify-between group">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <QrCode size={16} />
              </div>
              <span className="text-xs font-bold text-slate-500">QRIS / E-wallet</span>
            </div>
            <span className="text-sm font-extrabold text-slate-800">Rp 2.560.000</span>
          </div>

          <div className="flex items-center justify-between group">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <CreditCard size={16} />
              </div>
              <span className="text-xs font-bold text-slate-500">Kartu</span>
            </div>
            <span className="text-sm font-extrabold text-slate-800">Rp 2.470.000</span>
          </div>

          <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Tagihan Terkirim</span>
            <span className="text-xs font-bold text-slate-600">5 order</span>
          </div>
        </div>
      </div>

      {/* Aktivitas Terbaru */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
        <h3 className="text-sm font-bold text-slate-800 mb-6">Aktivitas Terbaru</h3>
        <div className="space-y-6 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-[1px] before:bg-slate-100">
          <div className="relative pl-10 group">
            <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-emerald-50 border-4 border-white flex items-center justify-center text-emerald-600 z-10 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <CheckCircle2 size={14} />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs font-bold text-slate-700">Pembayaran QRIS diterima</p>
                <span className="text-[10px] font-bold text-slate-400">09:44</span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium leading-relaxed">
                Order #TRX-20260405-004 berhasil dibayar oleh pelanggan sebesar Rp 86.500
              </p>
            </div>
          </div>

          <div className="relative pl-10 group">
            <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-rose-50 border-4 border-white flex items-center justify-center text-rose-600 z-10 group-hover:bg-rose-600 group-hover:text-white transition-colors">
              <RotateCcw size={14} />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs font-bold text-slate-700">Refund diproses</p>
                <span className="text-[10px] font-bold text-slate-400">09:24</span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium leading-relaxed">
                Transaksi #TRX-20260405-005 dikembalikan penuh karena pesanan ganda.
              </p>
            </div>
          </div>

          <div className="relative pl-10 group">
            <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-amber-50 border-4 border-white flex items-center justify-center text-amber-600 z-10 group-hover:bg-amber-600 group-hover:text-white transition-colors">
              <Clock size={14} />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs font-bold text-slate-700">Pembayaran tertunda</p>
                <span className="text-[10px] font-bold text-slate-400">08:42</span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium leading-relaxed">
                Kasir perlu verifikasi ulang untuk order #TRX-20260405-003 sebelum closing shift.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
