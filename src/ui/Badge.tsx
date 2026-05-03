import React from 'react';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'default' | 'purple';
  className?: string;
}

export function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  const variants = {
    success: 'bg-[#e6f4ea] text-[#0f9d58]',
    warning: 'bg-orange-50 text-orange-600',
    danger: 'bg-red-50 text-red-600',
    info: 'bg-[#e0f2fe] text-[#0284c7]', // Modified to match light blue in the design
    purple: 'bg-[#f3e8ff] text-[#9333ea]', // Added for Debit status
    default: 'bg-slate-100 text-slate-600'
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium inline-flex items-center justify-center ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
