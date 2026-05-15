'use client';

import React from 'react';
import { Wallet, Receipt, ShoppingCart, CheckCircle2 } from 'lucide-react';
import { StatCard } from '@/components/admin/StatCard';

export function StatCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard 
        title="TOTAL PENJUALAN HARI INI"
        value="Rp 8.450.000"
        trend="+12%"
        trendPositive={true}
        subtitle="dibanding kemarin"
        icon={Wallet}
        iconBgColor="bg-emerald-50"
        iconColor="text-emerald-600"
      />
      <StatCard 
        title="JUMLAH TRANSAKSI"
        value="128"
        trend="+5%"
        trendPositive={true}
        subtitle="Rata-rata 1 transaksi tiap 7 menit"
        icon={Receipt}
        iconBgColor="bg-blue-50"
        iconColor="text-blue-600"
      />
      <StatCard 
        title="RATA-RATA ORDER"
        value="Rp 66.016"
        subtitle="Nilai rata-rata tiap pesanan"
        icon={ShoppingCart}
        iconBgColor="bg-purple-50"
        iconColor="text-purple-600"
      />
      <StatCard 
        title="PEMBAYARAN BERHASIL"
        value="96%"
        trend="+2%"
        trendPositive={true}
        subtitle="3 transaksi masih menunggu"
        icon={CheckCircle2}
        iconBgColor="bg-amber-50"
        iconColor="text-amber-600"
      />
    </div>
  );
}
