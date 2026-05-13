import React, { SelectHTMLAttributes } from 'react';

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
}

export function Select({ options, className = '', ...props }: SelectProps) {
  const filterSelectClass = "appearance-none px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-[#0f9d58]";
  const filterSelectStyle = { 
    backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%2394a3b8\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'%3E%3C/path%3E%3C/svg%3E")', 
    backgroundPosition: 'right 12px center', 
    backgroundRepeat: 'no-repeat', 
    backgroundSize: '16px', 
    paddingRight: '40px' 
  };

  return (
    <select 
      className={`${filterSelectClass} ${className}`}
      style={filterSelectStyle}
      {...props}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>{opt.label}</option>
      ))}
    </select>
  );
}
