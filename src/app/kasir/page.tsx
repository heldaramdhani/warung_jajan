'use client';

import React from 'react';
import { Wallet, Receipt, ShoppingCart, Clock, User, CreditCard } from 'lucide-react';
import { StatCard } from '@/components/admin/StatCard';

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    'Selesai': 'bg-emerald-50 text-emerald-600 border-emerald-100',
    'Menunggu': 'bg-amber-50 text-amber-600 border-amber-100',
    'Dibatalkan': 'bg-rose-50 text-rose-600 border-rose-100',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${styles[status] || 'bg-slate-50 text-slate-600'}`}>
      {status}
    </span>
  );
};

export default function KasirDashboard() {
  const recentTransactions = [
    { id: '#TRX-9081', waktu: '14:32', pelanggan: 'Walk-in', metode: 'Kartu Kredit', jumlah: 'Rp145.500', status: 'Selesai' },
    { id: '#TRX-9080', waktu: '14:15', pelanggan: 'Sarah Jenkins', metode: 'Tunai', jumlah: 'Rp24.000', status: 'Selesai' },
    { id: '#TRX-9079', waktu: '13:50', pelanggan: 'Walk-in', metode: 'E-Wallet', jumlah: 'Rp68.900', status: 'Menunggu' },
    { id: '#TRX-9078', waktu: '13:22', pelanggan: 'Michael Chen', metode: 'Kartu Kredit', jumlah: 'Rp112.000', status: 'Dibatalkan' },
    { id: '#TRX-9077', waktu: '12:45', pelanggan: 'Walk-in', metode: 'Tunai', jumlah: 'Rp15.500', status: 'Selesai' },
    { id: '#TRX-9076', waktu: '12:10', pelanggan: 'Emily Davis', metode: 'Kartu Kredit', jumlah: 'Rp210.000', status: 'Selesai' },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard 
          title="TOTAL PENDAPATAN"
          value="Rp12.450.000"
          trend="+15.2%"
          trendPositive={true}
          subtitle="dibanding kemarin"
          icon={Wallet}
          iconBgColor="bg-emerald-50"
          iconColor="text-emerald-600"
        />
        <StatCard 
          title="JUMLAH TRANSAKSI"
          value="142"
          trend="+8.4%"
          trendPositive={true}
          subtitle="dibanding kemarin"
          icon={Receipt}
          iconBgColor="bg-blue-50"
          iconColor="text-blue-600"
        />
        <StatCard 
          title="RATA-RATA NILAI PESANAN"
          value="Rp87.670"
          trend="-2.1%"
          trendPositive={false}
          subtitle="dibanding kemarin"
          icon={ShoppingCart}
          iconBgColor="bg-purple-50"
          iconColor="text-purple-600"
        />
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            Transaksi Terbaru
          </h2>
          <button className="text-[#0f9d58] text-xs font-bold hover:underline">
            Lihat Semua
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 tracking-wider uppercase">ID TRANSAKSI</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 tracking-wider uppercase">WAKTU</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 tracking-wider uppercase">PELANGGAN</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 tracking-wider uppercase">METODE PEMBAYARAN</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 tracking-wider uppercase">JUMLAH</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 tracking-wider uppercase text-center">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {recentTransactions.map((trx, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4 text-sm font-bold text-slate-700">{trx.id}</td>
                  <td className="px-6 py-4 text-sm text-slate-500 font-medium">
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-slate-300" />
                      {trx.waktu}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 font-semibold">
                    <div className="flex items-center gap-2">
                      <User size={14} className="text-slate-300" />
                      {trx.pelanggan}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500 font-medium">
                    <div className="flex items-center gap-2">
                      <CreditCard size={14} className="text-slate-300" />
                      {trx.metode}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-800">{trx.jumlah}</td>
                  <td className="px-6 py-4 text-center">
                    <StatusBadge status={trx.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
