import React from 'react';
import { ChevronDown } from 'lucide-react';
import { CardUser } from './CardUser';

export interface NavbarProps {
  title?: string;
}

export function Navbar({ title = 'Dashboard Admin' }: NavbarProps) {
  return (
    <header className="h-20 bg-white flex items-center justify-between px-6 border-b border-slate-100">
      <h1 className="text-lg font-bold text-slate-800">{title}</h1>
      
      <div className="flex items-center gap-3 cursor-pointer p-2 rounded-xl hover:bg-slate-50 transition-colors">
        <CardUser 
          name="Siti Aminah" 
          role="Administrator Utama" 
          initial="S"
        />
        <ChevronDown className="text-slate-400" size={16} />
      </div>
    </header>
  );
}
