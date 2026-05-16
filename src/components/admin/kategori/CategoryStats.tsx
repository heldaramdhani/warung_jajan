import React from 'react';
import { Tag, List, Clock, CheckCircle } from 'lucide-react';
import { StatCard } from '../StatCard';

interface CategoryStatsProps {
  totalCategories: number;
}

export function CategoryStats({ totalCategories }: CategoryStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard 
        title="Total Kategori"
        value={totalCategories.toString()}
        subtitle="Kategori menu aktif"
        icon={Tag}
        iconBgColor="bg-blue-50"
        iconColor="text-blue-500"
      />
      <StatCard 
        title="Kategori Utama"
        value="Makanan"
        subtitle="Item terbanyak"
        icon={List}
        iconBgColor="bg-purple-50"
        iconColor="text-purple-500"
      />
      <StatCard 
        title="Status"
        value="Aktif"
        subtitle="Semua sinkron"
        icon={CheckCircle}
        iconBgColor="bg-green-50"
        iconColor="text-green-500"
      />
      <StatCard 
        title="Update Terakhir"
        value={new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
        subtitle="Data terbaru"
        icon={Clock}
        iconBgColor="bg-slate-50"
        iconColor="text-slate-500"
      />
    </div>
  );
}
