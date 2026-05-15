'use client';

import React from 'react';
import { Minus, Plus } from 'lucide-react';

interface CartItemProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
  onUpdateQuantity: (id: string, delta: number) => void;
}

export function CartItem({ id, name, price, quantity, onUpdateQuantity }: CartItemProps) {
  const subtotal = price * quantity;

  return (
    <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h4 className="text-sm font-bold text-slate-800">{name}</h4>
          <p className="text-xs text-slate-400 font-medium">Harga: Rp {price.toLocaleString('id-ID')}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-400 font-medium">Subtotal</p>
          <p className="text-sm font-bold text-slate-800">Rp {subtotal.toLocaleString('id-ID')}</p>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-500 font-medium italic">Qty</span>
        <div className="flex items-center gap-3 bg-slate-50 px-2 py-1 rounded-lg border border-slate-100">
          <button 
            onClick={() => onUpdateQuantity(id, -1)}
            className="w-6 h-6 flex items-center justify-center text-slate-400 hover:text-rose-500 transition-colors"
          >
            <Minus size={14} />
          </button>
          <span className="text-sm font-bold text-slate-700 min-w-[20px] text-center">{quantity}</span>
          <button 
            onClick={() => onUpdateQuantity(id, 1)}
            className="w-6 h-6 flex items-center justify-center text-slate-400 hover:text-emerald-500 transition-colors"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
