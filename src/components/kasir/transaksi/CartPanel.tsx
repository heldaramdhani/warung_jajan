'use client';

import React from 'react';
import { ShoppingCart, Trash2, PauseCircle, CheckCircle2 } from 'lucide-react';
import { CartItem } from './CartItem';
import { Button } from '@/ui/Button';
import { Input } from '@/ui/Input';

interface CartItemData {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartPanelProps {
  cart: CartItemData[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onClearCart: () => void;
  customerName: string;
  setCustomerName: (name: string) => void;
  onCheckout: () => void;
}

export function CartPanel({ cart, onUpdateQuantity, onClearCart, customerName, setCustomerName, onCheckout }: CartPanelProps) {
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const tax = Math.round(subtotal * 0.1); // PB01 10%
  const total = subtotal + tax;

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-slate-100 bg-slate-50/50">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            Pesanan Baru <ShoppingCart size={20} className="text-[#0f9d58]" />
          </h2>
          <span className="text-[10px] font-bold text-slate-400 tracking-wider">
            #TRX-{new Date().toISOString().split('T')[0].replace(/-/g, '')}-001
          </span>
        </div>
        
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-400 uppercase tracking-wide">Nama Pelanggan</label>
          <Input 
            placeholder="Input Nama / Guest" 
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="bg-white"
          />
        </div>
      </div>

      {/* Cart Items List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-0 bg-slate-50/30">
        {cart.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center opacity-40 py-20">
            <ShoppingCart size={48} className="mb-4 text-slate-300" />
            <p className="text-sm font-medium text-slate-400">Keranjang masih kosong</p>
          </div>
        ) : (
          cart.map((item) => (
            <CartItem 
              key={item.id} 
              {...item} 
              onUpdateQuantity={onUpdateQuantity} 
            />
          ))
        )}
      </div>

      {/* Summary & Actions */}
      <div className="p-6 border-t border-slate-100 bg-white space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm font-medium text-slate-500">
            <span>Subtotal</span>
            <span>Rp {subtotal.toLocaleString('id-ID')}</span>
          </div>
          <div className="flex justify-between text-sm font-medium text-slate-500">
            <span>Pajak (PB01 10%)</span>
            <span>Rp {tax.toLocaleString('id-ID')}</span>
          </div>
          <div className="flex justify-between text-lg font-extrabold text-slate-800 pt-2 border-t border-slate-50">
            <span>Total Akhir</span>
            <span className="text-[#0f9d58]">Rp {total.toLocaleString('id-ID')}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <Button 
            variant="outline" 
            className="gap-2 text-amber-600 border-amber-100 hover:bg-amber-50"
            disabled={cart.length === 0}
          >
            <PauseCircle size={16} />
            Tunda
          </Button>
          <Button 
            variant="outline" 
            className="gap-2 text-rose-600 border-rose-100 hover:bg-rose-50"
            onClick={onClearCart}
            disabled={cart.length === 0}
          >
            <Trash2 size={16} />
            Kosongkan
          </Button>
        </div>

        <Button 
          className="w-full py-6 rounded-xl font-bold text-base gap-3 shadow-lg shadow-emerald-100 bg-[#0f9d58] hover:bg-[#0c8a4d]"
          disabled={cart.length === 0}
          onClick={onCheckout}
        >
          <CheckCircle2 size={20} />
          PROSES PEMBAYARAN
        </Button>
      </div>
    </div>
  );
}
