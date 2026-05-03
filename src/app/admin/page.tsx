'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChevronDown, Package, Banknote, ReceiptText, Clock, ArrowRight } from 'lucide-react';
import { StatCard } from '@/components/admin/StatCard';

// Mock Data for different filters
const chartDataOptions = {
  '7 Hari Terakhir': {
    data: [
      { name: 'Sen', value: 8 }, { name: 'Sel', value: 13 }, { name: 'Rab', value: 9 },
      { name: 'Kam', value: 14.5 }, { name: 'Jum', value: 11 }, { name: 'Sab', value: 17 }, { name: 'Min', value: 18 }
    ],
    subtitle: 'Analitik pendapatan dalam 7 hari terakhir',
    summary: { total: 'Rp 90.4 Jt', rata: 'Rp 12.91 Jt', tertinggi: 'Rp 18.0 Jt' }
  },
  '1 Bulan': {
    data: [
      { name: 'M1', value: 40 }, { name: 'M2', value: 55 }, { name: 'M3', value: 48 }, { name: 'M4', value: 65 }
    ],
    subtitle: 'Analitik pendapatan dalam 1 bulan terakhir',
    summary: { total: 'Rp 208.0 Jt', rata: 'Rp 52.0 Jt', tertinggi: 'Rp 65.0 Jt' }
  },
  '1 Tahun': {
    data: [
      { name: 'Jan', value: 50 }, { name: 'Feb', value: 60 }, { name: 'Mar', value: 55 }, { name: 'Apr', value: 70 },
      { name: 'Mei', value: 65 }, { name: 'Jun', value: 80 }, { name: 'Jul', value: 75 }, { name: 'Ags', value: 90 },
      { name: 'Sep', value: 85 }, { name: 'Okt', value: 100 }, { name: 'Nov', value: 95 }, { name: 'Des', value: 110 }
    ],
    subtitle: 'Analitik pendapatan dalam 1 tahun terakhir',
    summary: { total: 'Rp 935.0 Jt', rata: 'Rp 77.9 Jt', tertinggi: 'Rp 110.0 Jt' }
  }
};

type FilterOption = keyof typeof chartDataOptions;

export default function AdminDashboard() {
  const [filter, setFilter] = useState<FilterOption>('7 Hari Terakhir');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const currentChartData = chartDataOptions[filter];

  const transactions = [
    { id: '#TRX-89012', date: '24 Okt 2023, 14:32', kasir: 'Budi Santoso', method: 'QRIS', total: 'Rp 125.000', status: 'Berhasil' },
    { id: '#TRX-89011', date: '24 Okt 2023, 14:15', kasir: 'Budi Santoso', method: 'Tunai', total: 'Rp 45.000', status: 'Berhasil' },
    { id: '#TRX-89010', date: '24 Okt 2023, 13:50', kasir: 'Ayu Lestari', method: 'Debit', total: 'Rp 320.000', status: 'Berhasil' },
    { id: '#TRX-89009', date: '24 Okt 2023, 13:42', kasir: 'Ayu Lestari', method: 'QRIS', total: 'Rp 15.000', status: 'Berhasil' },
  ];

  return (
    <div className="flex flex-col gap-4 w-full">
      
      {/* Top and Middle Sections aligned with CSS Grid */}
      <div className="grid grid-cols-3 gap-4">
        
        {/* Row 1: Top Cards */}
        <div className="col-span-1">
          <StatCard 
            title="Total Penjualan"
            value="Rp 15.450.000"
            subtitle="dari hari kemarin"
            subtitleHighlight="+2.5%"
            icon={Banknote}
          />
        </div>
        <div className="col-span-1">
          <StatCard 
            title="Jumlah Transaksi"
            value="342"
            subtitle="dari hari kemarin"
            subtitleHighlight="+5.2%"
            icon={ReceiptText}
          />
        </div>
        <div className="col-span-1">
          <StatCard 
            title="Total Produk Aktif"
            value="1,204"
            subtitle="12 produk stok menipis"
            icon={Package}
            iconBgColor="bg-orange-50"
            iconColor="text-orange-500"
          />
        </div>

        {/* Row 2: Left Column (Tren Pendapatan) */}
        <div className="col-span-2 flex flex-col gap-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 flex flex-col h-full">
            <div className="flex justify-between items-start mb-5">
              <div>
                <h2 className="text-lg font-bold text-slate-800">Tren Pendapatan Harian</h2>
                <p className="text-sm text-slate-400 mt-1">{currentChartData.subtitle}</p>
              </div>
              
              {/* Functional Dropdown */}
              <div className="relative z-10">
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 px-4 py-2 border border-[#0f9d58] text-[#0f9d58] rounded-lg text-sm font-medium hover:bg-green-50 transition-colors"
                >
                  {filter}
                  <ChevronDown size={16} />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-slate-100 overflow-hidden">
                    {(Object.keys(chartDataOptions) as FilterOption[]).map((option) => (
                      <button
                        key={option}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 transition-colors ${filter === option ? 'text-[#0f9d58] font-medium bg-green-50' : 'text-slate-600'}`}
                        onClick={() => {
                          setFilter(option);
                          setIsDropdownOpen(false);
                        }}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Summary Stats above chart */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className="text-sm font-medium text-slate-500 mb-1">Total</div>
                <div className="text-xl font-bold text-slate-800">{currentChartData.summary.total}</div>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className="text-sm font-medium text-slate-500 mb-1">Rata-rata</div>
                <div className="text-xl font-bold text-slate-800">{currentChartData.summary.rata}</div>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className="text-sm font-medium text-slate-500 mb-1">Tertinggi</div>
                <div className="text-xl font-bold text-slate-800">{currentChartData.summary.tertinggi}</div>
              </div>
            </div>

            <div className="h-[280px] w-full mt-auto">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={currentChartData.data} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0f9d58" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#0f9d58" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#94a3b8', fontSize: 12 }} 
                    dy={10} 
                  />
                  <YAxis 
                    width={70}
                    tickCount={5}
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#94a3b8', fontSize: 12, dx: -15 }}
                    tickFormatter={(value) => value >= 1000 ? `${value / 1000}k` : `${value}M`}
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    itemStyle={{ color: '#0f9d58' }}
                    formatter={(value: number) => [`Rp ${value} Jt`, 'Pendapatan']}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#0f9d58" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorValue)" 
                    dot={{ r: 3, fill: '#fff', stroke: '#0f9d58', strokeWidth: 2 }}
                    activeDot={{ r: 5, fill: '#0f9d58', stroke: '#fff', strokeWidth: 2 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Row 2: Right Column (Produk Paling Laris & Restock) */}
        <div className="col-span-1 flex flex-col gap-4">
          {/* Produk Paling Laris */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 flex flex-col">
            <h2 className="text-lg font-bold text-slate-800">Produk Paling Laris</h2>
            <p className="text-sm text-slate-400 mt-1 mb-5">Menampilkan 3 produk teratas</p>

            <div className="space-y-5">
              {/* Dimsum Siomay */}
              <div className="flex items-center justify-between">
                <div className="w-1/3">
                  <div className="text-sm font-bold text-slate-800">Dimsum Siomay</div>
                </div>
                <div className="flex-1 mx-3 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#0f9d58]" style={{ width: '85%' }}></div>
                </div>
                <div className="text-sm font-bold text-slate-800 w-8 text-right">142</div>
              </div>

              {/* Dimsum Hakau */}
              <div className="flex items-center justify-between">
                <div className="w-1/3">
                  <div className="text-sm font-bold text-slate-800">Dimsum Hakau</div>
                </div>
                <div className="flex-1 mx-3 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#34d399]" style={{ width: '65%' }}></div>
                </div>
                <div className="text-sm font-bold text-slate-800 w-8 text-right">98</div>
              </div>

              {/* Es Lychee Tea */}
              <div className="flex items-center justify-between">
                <div className="w-1/3">
                  <div className="text-sm font-bold text-slate-800">Es Lychee Tea</div>
                </div>
                <div className="flex-1 mx-3 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full bg-[#6ee7b7]" style={{ width: '55%' }}></div>
                </div>
                <div className="text-sm font-bold text-slate-800 w-8 text-right">84</div>
              </div>
            </div>
          </div>

          {/* Restock Barang */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 relative">
            <div className="absolute top-6 right-6 w-8 h-8 bg-[#f0fdf4] rounded-xl flex items-center justify-center text-[#0f9d58]">
              <Package size={16} />
            </div>
            
            <h2 className="text-lg font-bold text-slate-800">Restock Barang</h2>
            <p className="text-sm text-slate-400 mt-1 mb-5 pr-10">Menampilkan 2 dari 3 barang</p>

            <div className="space-y-4 mb-5">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm font-bold text-slate-800">Dimsum Siomay</div>
                  <div className="text-xs text-slate-500 mt-0.5">Kritis</div>
                </div>
                <div className="text-sm font-bold text-slate-800">2 pcs</div>
              </div>

              <div className="w-full h-px bg-slate-100"></div>

              <div className="flex justify-between items-center">
                <div>
                  <div className="text-sm font-bold text-slate-800">Es Lemon Tea</div>
                  <div className="text-xs text-slate-500 mt-0.5">Segera restock</div>
                </div>
                <div className="text-sm font-bold text-slate-800">5 pcs</div>
              </div>
            </div>

            <button className="w-full py-2.5 bg-[#0f9d58] text-white rounded-xl text-sm font-medium hover:bg-[#0b8043] transition-colors flex justify-center items-center gap-2">
              Restok Sekarang
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

      </div>

      {/* Bottom Section: Transaksi Terbaru */}
      <div className="bg-white p-6 rounded-2xl border border-slate-100">
        <div className="flex justify-between items-center mb-5">
          <div>
            <h2 className="text-lg font-bold text-slate-800">Transaksi Terbaru</h2>
            <p className="text-sm text-slate-400 mt-1">Mengambil data dari tabel transaksi & detail_transaksi</p>
          </div>
          <Link href="/admin/laporan" className="text-sm font-medium text-[#0f9d58] hover:text-[#0b8043] flex items-center gap-1">
            Lihat Semua
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="pb-3 font-medium text-slate-400 text-sm">ID Referensi</th>
                <th className="pb-3 font-medium text-slate-400 text-sm">Tanggal & Waktu</th>
                <th className="pb-3 font-medium text-slate-400 text-sm">Kasir</th>
                <th className="pb-3 font-medium text-slate-400 text-sm">Metode</th>
                <th className="pb-3 font-medium text-slate-400 text-sm">Total Bayar</th>
                <th className="pb-3 font-medium text-slate-400 text-sm">Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((trx, index) => (
                <tr key={index} className="border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors">
                  <td className="py-3 text-sm font-medium text-slate-800">{trx.id}</td>
                  <td className="py-3 text-sm text-slate-500">{trx.date}</td>
                  <td className="py-3 text-sm text-slate-500">{trx.kasir}</td>
                  <td className="py-3">
                    {trx.method.toUpperCase() === 'QRIS' && <span className="px-3 py-1 bg-blue-50 text-blue-600 border border-blue-100 rounded-md text-xs font-semibold">QRIS</span>}
                    {trx.method.toUpperCase() === 'TUNAI' && <span className="px-3 py-1 bg-slate-100 text-slate-600 border border-slate-200 rounded-md text-xs font-semibold">Tunai</span>}
                    {trx.method.toUpperCase() === 'DEBIT' && <span className="px-3 py-1 bg-purple-50 text-purple-600 border border-purple-100 rounded-md text-xs font-semibold">Debit</span>}
                  </td>
                  <td className="py-3 text-sm font-medium text-slate-800">{trx.total}</td>
                  <td className="py-3">
                    <span className="px-3 py-1 bg-[#e6f4ea] text-[#0f9d58] rounded-full text-xs font-medium">
                      {trx.status}
                    </span>
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

