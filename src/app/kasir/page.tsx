'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Wallet, Receipt, ShoppingCart, Clock, User, CreditCard, Loader2 } from 'lucide-react';
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
  const [transactions, setTransactions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/transaksi');
        const result = await response.json();
        if (result.success) {
          setTransactions(result.data);
        }
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const stats = useMemo(() => {
    const totalRevenue = transactions.reduce((acc, curr) => acc + curr.total, 0);
    const totalTransactions = transactions.length;
    const avgOrder = totalTransactions > 0 ? totalRevenue / totalTransactions : 0;

    return {
      totalRevenue: `Rp ${totalRevenue.toLocaleString('id-ID')}`,
      totalTransactions: totalTransactions.toString(),
      avgOrder: `Rp ${Math.round(avgOrder).toLocaleString('id-ID')}`
    };
  }, [transactions]);

  const recentTransactions = useMemo(() => {
    return transactions.slice(0, 6).map((trx: any) => ({
      id: trx.kode_transaksi,
      waktu: new Date(trx.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      pelanggan: 'Walk-in',
      metode: trx.metode_pembayaran,
      jumlah: `Rp ${trx.total.toLocaleString('id-ID')}`,
      status: 'Selesai'
    }));
  }, [transactions]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-40">
        <Loader2 className="h-10 w-10 text-[#0f9d58] animate-spin mb-4" />
        <p className="text-slate-500 font-medium">Menyiapkan dashboard kasir...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard 
          title="TOTAL PENDAPATAN"
          value={stats.totalRevenue}
          subtitle="Total akumulasi"
          icon={Wallet}
          iconBgColor="bg-emerald-50"
          iconColor="text-emerald-600"
        />
        <StatCard 
          title="JUMLAH TRANSAKSI"
          value={stats.totalTransactions}
          subtitle="Transaksi terdaftar"
          icon={Receipt}
          iconBgColor="bg-blue-50"
          iconColor="text-blue-600"
        />
        <StatCard 
          title="RATA-RATA NILAI PESANAN"
          value={stats.avgOrder}
          subtitle="Rata-rata per nota"
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
          <a href="/kasir/riwayat" className="text-[#0f9d58] text-xs font-bold hover:underline">
            Lihat Semua
          </a>
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
              {recentTransactions.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-400 text-sm">Belum ada transaksi hari ini</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
