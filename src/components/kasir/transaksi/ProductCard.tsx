'use client';

import React from 'react';
import { Plus } from 'lucide-react';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  category: string;
  image?: string;
  onAdd: () => void;
}

export function ProductCard({ name, price, category, image, onAdd }: ProductCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
      <div className="aspect-[4/3] w-full bg-slate-50 relative overflow-hidden">
        {image ? (
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-300 font-bold text-4xl select-none">
            {name.charAt(0)}
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-sm font-bold text-slate-800 line-clamp-1">{name}</h3>
            <p className="text-xs text-slate-500 font-medium mt-0.5">{category}</p>
          </div>
          <button 
            onClick={onAdd}
            className="bg-[#0f9d58] text-white p-1.5 rounded-lg hover:bg-[#0c8a4d] transition-colors shadow-sm shadow-[#0f9d58]/20"
          >
            <Plus size={16} />
          </button>
        </div>
        
        <div className="flex items-center justify-between mt-3">
          <span className="text-sm font-extrabold text-slate-900">
            Rp {price.toLocaleString('id-ID')}
          </span>
        </div>
      </div>
    </div>
  );
}
