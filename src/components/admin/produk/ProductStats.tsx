import React from 'react';
import { Box, Tag, AlertTriangle, Clock } from 'lucide-react';
import { StatCard } from '@/components/admin/StatCard';

interface ProductStatsProps {
  totalProducts: number;
}

export function ProductStats({ totalProducts }: ProductStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard 
        title="Total Produk"
        value={totalProducts.toString()}
        subtitle="12 kategori aktif"
        icon={Box}
        iconBgColor="bg-blue-50"
        iconColor="text-blue-500"
      />
      <StatCard 
        title="Kategori Terbanyak"
        value="Minuman"
        subtitle="36 item terdaftar"
        icon={Tag}
        iconBgColor="bg-purple-50"
        iconColor="text-purple-500"
      />
      <StatCard 
        title="Stok Menipis"
        value="9 Item"
        subtitle="Perlu restock hari ini"
        icon={AlertTriangle}
        iconBgColor="bg-orange-50"
        iconColor="text-orange-500"
      />
      <StatCard 
        title="Update Terakhir"
        value="09:24"
        subtitle="Sinkronisasi harga gudang"
        icon={Clock}
        iconBgColor="bg-slate-50"
        iconColor="text-slate-500"
      />
    </div>
  );
}
