'use client';

import React from 'react';
import { Wallet, Receipt, ShoppingCart, CheckCircle2 } from 'lucide-react';
import { StatCard } from '@/components/admin/StatCard';

interface StatCardsProps {
  transactions: any[];
}

export function StatCards({ transactions }: StatCardsProps) {
  const totalAmount = transactions.reduce((acc, curr) => {
    const value = parseInt(curr.total.replace('Rp ', '').replace(/\./g, '')) || 0;
    return acc + value;
  }, 0);

  const totalTransactions = transactions.length;
  const avgOrder = totalTransactions > 0 ? totalAmount / totalTransactions : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard 
        title="TOTAL PENJUALAN"
        value={`Rp ${totalAmount.toLocaleString('id-ID')}`}
        subtitle="Akumulasi dari semua riwayat"
        icon={Wallet}
        iconBgColor="bg-emerald-50"
        iconColor="text-emerald-600"
      />
      <StatCard 
        title="JUMLAH TRANSAKSI"
        value={totalTransactions.toString()}
        subtitle="Total nota terdaftar"
        icon={Receipt}
        iconBgColor="bg-blue-50"
        iconColor="text-blue-600"
      />
      <StatCard 
        title="RATA-RATA ORDER"
        value={`Rp ${Math.round(avgOrder).toLocaleString('id-ID')}`}
        subtitle="Nilai rata-rata per nota"
        icon={ShoppingCart}
        iconBgColor="bg-purple-50"
        iconColor="text-purple-600"
      />
      <StatCard 
        title="PEMBAYARAN BERHASIL"
        value="100%"
        subtitle="Semua transaksi terbayar"
        icon={CheckCircle2}
        iconBgColor="bg-amber-50"
        iconColor="text-amber-600"
      />
    </div>
  );
}
