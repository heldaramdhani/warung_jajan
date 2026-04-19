import React from "react";
import StatCard from "@/components/ui/StatCard";
import RevenueChart from "@/components/ui/RevenueChart";
import TopProductsList from "@/components/ui/TopProductsList";
import TransactionTable from "@/components/ui/TransactionTable";
import RestockCard from "@/components/ui/RestockCard";
import { Banknote, ShoppingBag, Package } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Top Stat Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Penjualan"
          value="Rp 15.450.000"
          trend={12.5}
          trendLabel="dari hari kemarin"
          icon={<Banknote className="w-4 h-4" />}
          iconBg="bg-[#e4faed]"
        />
        <StatCard
          title="Jumlah Transaksi"
          value="342"
          trend={5.2}
          trendLabel="dari hari kemarin"
          icon={<ShoppingBag className="w-4 h-4" />}
          iconBg="bg-[#e4faed]"
        />
        <StatCard
          title="Total Produk Aktif"
          value="1,204"
          trendLabel="12 produk stok menipis"
          icon={<Package className="w-4 h-4 text-amber-500" />}
          iconBg="bg-amber-100/60"
        />
      </div>

      {/* Middle Section: Chart with compact side cards */}
      <div className="grid gap-6 xl:grid-cols-[2.1fr_0.95fr]">
        <RevenueChart />
        <div className="space-y-5 xl:max-w-[380px]">
          <TopProductsList />
          <RestockCard />
        </div>
      </div>

      {/* Bottom Section: Transactions */}
      <TransactionTable />
    </div>
  );
}
