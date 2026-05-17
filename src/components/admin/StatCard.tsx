import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  subtitle: React.ReactNode;
  subtitleHighlight?: React.ReactNode;
  subtitleHighlightColor?: string;
  trend?: string;
  trendPositive?: boolean;
  icon: LucideIcon;
  iconBgColor?: string;
  iconColor?: string;
}

export function StatCard({
  title,
  value,
  subtitle,
  subtitleHighlight,
  subtitleHighlightColor = 'text-[#0f9d58]',
  trend,
  trendPositive = true,
  icon: Icon,
  iconBgColor = 'bg-[#e6f4ea]',
  iconColor = 'text-[#0f9d58]'
}: StatCardProps) {
  return (
    <div className="bg-white p-4 rounded-2xl border border-slate-100 flex flex-col justify-between h-full hover:shadow-md hover:-translate-y-1 transition-all duration-300">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{title}</h3>
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${iconBgColor} ${iconColor}`}>
          <Icon size={18} />
        </div>
      </div>
      <div>
        <div className="flex items-end gap-3 mb-1">
          <div className="text-2xl font-extrabold text-slate-800 leading-none">{value}</div>
          {trend && (
            <div className={`text-xs font-semibold px-2 py-0.5 rounded-full mb-0.5 ${trendPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
              {trend}
            </div>
          )}
        </div>
        <div className="text-xs text-slate-500 flex items-center gap-1.5 mt-1">
          {subtitleHighlight && (
            <span className={`font-medium ${subtitleHighlightColor}`}>{subtitleHighlight}</span>
          )}
          {subtitle}
        </div>
      </div>
    </div>
  );
}
