'use client';

import React from 'react';
import { Package, AlertCircle, Clock } from 'lucide-react';
import { StatCard } from '@/components/admin/StatCard';

interface StokStatsProps {
  totalItems: number;
  lowStockItems: number;
  outOfStockItems: number;
}

export function StokStats({ totalItems, lowStockItems, outOfStockItems }: StokStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <StatCard 
        title="Total Item"
        value={totalItems.toString()}
        trend="+3 dari kemarin"
        trendPositive={true}
        subtitle="Total item aktif yang saat ini tercatat di katalog inventori."
        icon={Package}
        iconBgColor="bg-[#e6f4ea]"
        iconColor="text-[#0f9d58]"
      />
      <StatCard 
        title="Item Stok Rendah"
        value={lowStockItems.toString()}
        trend="-2 dari kemarin"
        trendPositive={true} // fewer low stock items is a positive trend
        subtitle={
          <div className="flex items-center gap-1.5 mt-1">
            <Clock size={14} className="text-orange-500" />
            <span className="text-orange-500 font-medium">Perlu restock segera</span>
          </div>
        }
        icon={Clock}
        iconBgColor="bg-orange-50"
        iconColor="text-orange-500"
      />
      <StatCard 
        title="Item Habis"
        value={outOfStockItems.toString()}
        trend="+1 dari kemarin"
        trendPositive={false} // more out of stock items is negative
        subtitle={
          <div className="flex items-center gap-1.5 mt-1">
            <AlertCircle size={14} className="text-red-500" />
            <span className="text-red-500 font-medium">Butuh tindakan cepat</span>
          </div>
        }
        icon={AlertCircle}
        iconBgColor="bg-red-50"
        iconColor="text-red-500"
      />
    </div>
  );
}
