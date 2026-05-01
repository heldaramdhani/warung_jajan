import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  subtitle: string;
  subtitleHighlight?: string;
  subtitleHighlightColor?: string;
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
  icon: Icon,
  iconBgColor = 'bg-[#e6f4ea]',
  iconColor = 'text-[#0f9d58]'
}: StatCardProps) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 flex flex-col justify-between h-full">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-sm font-medium text-slate-500">{title}</h3>
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${iconBgColor} ${iconColor}`}>
          <Icon size={18} />
        </div>
      </div>
      <div>
        <div className="text-2xl font-bold text-slate-800 mb-1">{value}</div>
        <div className="text-xs text-slate-500 flex items-center gap-1">
          {subtitleHighlight && (
            <span className={`font-medium ${subtitleHighlightColor}`}>{subtitleHighlight}</span>
          )}
          {subtitle}
        </div>
      </div>
    </div>
  );
}
