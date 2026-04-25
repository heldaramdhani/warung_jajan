import React from "react";
import { TrendingUp, TrendingDown, Clock } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  trend?: number;
  trendLabel?: string;
  icon: React.ReactNode;
  iconBg?: string;
}

export default function StatCard({
  title,
  value,
  trend,
  trendLabel,
  icon,
  iconBg = "bg-[#d1f4e0]",
}: StatCardProps) {
  const isPositive = trend && trend > 0;

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex flex-col justify-between">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-[12px] font-semibold text-slate-400">{title}</h3>
        <div
          className={`w-8 h-8 rounded-md flex items-center justify-center text-[#00a663] ${iconBg}`}
        >
          {icon}
        </div>
      </div>
      <div>
        <h2 className="text-[24px] font-bold text-slate-800 mb-1">{value}</h2>
        {trend !== undefined ? (
          <div className="flex items-center text-[12px]">
            {isPositive ? (
              <TrendingUp className="w-3.5 h-3.5 text-[#00A86B] mr-1" />
            ) : (
              <TrendingDown className="w-3.5 h-3.5 text-red-500 mr-1" />
            )}
            <span
              className={
                isPositive
                  ? "text-[#00A86B] font-medium"
                  : "text-red-500 font-medium"
              }
            >
              {isPositive ? "+" : ""}
              {trend}%
            </span>
            <span className="text-slate-400 ml-1.5">{trendLabel}</span>
          </div>
        ) : (
          <div className="flex items-center text-[12px] text-slate-400 mt-2">
            <Clock className="w-3.5 h-3.5 mr-1 text-amber-500" />
            {trendLabel}
          </div>
        )}
      </div>
    </div>
  );
}
