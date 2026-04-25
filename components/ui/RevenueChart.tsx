"use client";

import React, { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// --- MOCK DATA ---
const dataSets = {
  "7_days": [
    { name: "Sen", revenue: 8.2 },
    { name: "Sel", revenue: 12.8 },
    { name: "Rab", revenue: 9.1 },
    { name: "Kam", revenue: 14.5 },
    { name: "Jum", revenue: 11.0 },
    { name: "Sab", revenue: 16.8 },
    { name: "Min", revenue: 18.0 },
  ],
  "30_days": [
    { name: "Mg 1", revenue: 8.5 },
    { name: "Mg 2", revenue: 12.0 },
    { name: "Mg 3", revenue: 9.2 },
    { name: "Mg 4", revenue: 14.8 },
  ],
  this_year: [
    { name: "Q1", revenue: 45.0 },
    { name: "Q2", revenue: 38.5 },
    { name: "Q3", revenue: 52.0 },
    { name: "Q4", revenue: 64.2 },
  ],
};

type DataFilterKey = keyof typeof dataSets;

export default function RevenueChart() {
  const [activeFilter, setActiveFilter] = useState<DataFilterKey>("30_days");
  const currentData = dataSets[activeFilter];

  const totalRevenue = currentData.reduce((sum, item) => sum + item.revenue, 0);
  const avgRevenue = totalRevenue / currentData.length;
  const highestRevenue = Math.max(...currentData.map((item) => item.revenue));

  const subtitleText =
    activeFilter === "7_days"
      ? "7 hari terakhir"
      : activeFilter === "30_days"
        ? "30 hari terakhir"
        : "tahun ini";

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 w-full flex flex-col">
      {/* HEADER & FILTER SECTION */}
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h3 className="text-[18px] font-bold text-slate-800">
            Tren Pendapatan
          </h3>
          <p className="text-[13px] text-slate-500 mt-1">
            Analitik pendapatan dalam {subtitleText} (Juta Rupiah)
          </p>
        </div>

        <div className="relative">
          <select
            value={activeFilter}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setActiveFilter(e.target.value as DataFilterKey)
            }
            className="appearance-none bg-white border border-slate-200 text-slate-600 text-[13px] font-medium py-2 pl-4 pr-10 rounded-lg hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#00A86B]/20 focus:border-[#00A86B] transition-all cursor-pointer shadow-sm"
          >
            <option value="7_days">7 Hari Terakhir</option>
            <option value="30_days">30 Hari Terakhir</option>
            <option value="this_year">Tahun Ini</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </div>
        </div>
      </div>

      {/* SUMMARY STATS SECTION */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="p-3 bg-slate-50/50 rounded-xl border border-slate-100/50 flex flex-col items-start gap-1">
          <span className="text-[11px] font-medium text-slate-500">Total</span>
          <span className="text-xl font-bold text-slate-800">
            Rp {totalRevenue.toFixed(1)} Jt
          </span>
        </div>
        <div className="p-3 bg-slate-50/50 rounded-xl border border-slate-100/50 flex flex-col items-start gap-1">
          <span className="text-[11px] font-medium text-slate-500">
            Rata-rata
          </span>
          <span className="text-xl font-bold text-slate-800">
            Rp {avgRevenue.toFixed(2)} Jt
          </span>
        </div>
        <div className="p-3 bg-slate-50/50 rounded-xl border border-slate-100/50 flex flex-col items-start gap-1">
          <span className="text-[11px] font-medium text-slate-500">
            Tertinggi
          </span>
          <span className="text-xl font-bold text-slate-800">
            Rp {highestRevenue.toFixed(1)} Jt
          </span>
        </div>
      </div>

      {/* CHART SECTION (Fix 100% Full Bleed & Render) */}
      <div className="w-full -mx-8 mt-4" style={{ height: 280 }}>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart
            data={currentData}
            margin={{ top: 10, right: 30, left: 30, bottom: 30 }}
          >
            <defs>
              <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00A86B" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#00A86B" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f1f5f9"
            />

            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "#94a3b8", fontWeight: 500 }}
              dy={15}
              padding={{ left: 30, right: 30 }}
            />

            <YAxis
              width={75}
              tickMargin={0}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "#94a3b8", fontWeight: 500, dx: 15 }}
              tickFormatter={(value) => `Rp ${value}`}
            />

            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                border: "none",
                boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
              }}
              itemStyle={{ color: "#00A86B", fontWeight: "bold" }}
              formatter={(value) => [`Rp ${value} Jt`, "Pendapatan"]}
            />

            <Area
              key={activeFilter}
              type="monotone"
              dataKey="revenue"
              stroke="#00A86B"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#colorRev)"
              dot={{ r: 4, fill: "#ffffff", strokeWidth: 2, stroke: "#00A86B" }}
              activeDot={{ r: 6, strokeWidth: 0, fill: "#00A86B" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
