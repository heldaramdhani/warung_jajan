'use client';

import React, { useState, useEffect } from 'react';

interface ReceiptProps {
  customerName: string;
  cart: Array<{
    name: string;
    price: number;
    quantity: number;
  }>;
  total: number;
  paymentMethod: string;
}

export function Receipt({ customerName, cart, total, paymentMethod }: ReceiptProps) {
  const [mounted, setMounted] = useState(false);
  const [date, setDate] = useState('');

  useEffect(() => {
    setMounted(true);
    setDate(new Date().toLocaleString('id-ID'));
  }, []);

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const tax = Math.round(subtotal * 0.1);

  if (!mounted) return null; // Jangan render apapun di server untuk menghindari mismatch struk

  return (
    <div id="receipt-print" className="hidden print:block p-8 bg-white text-black font-mono text-sm max-w-[300px] mx-auto">
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          body * { visibility: hidden; }
          #receipt-print, #receipt-print * { visibility: visible; }
          #receipt-print { position: absolute; left: 0; top: 0; width: 100%; }
        }
      `}} />
      
      {/* Header Struk */}
      <div className="text-center border-b border-dashed border-black pb-4 mb-4">
        <h1 className="text-xl font-bold uppercase">DimsumKu</h1>
        <p className="text-xs">Warung Jajan Terfavorit</p>
        <p className="text-[10px] mt-1">{date}</p>
      </div>

      {/* Info Pelanggan */}
      <div className="mb-4 text-xs">
        <p>Kasir: Eleanor Pena</p>
        <p>Pelanggan: {customerName || 'Guest'}</p>
        <p>Metode Bayar: {paymentMethod}</p>
      </div>

      {/* Daftar Produk */}
      <div className="border-b border-dashed border-black pb-2 mb-2">
        {cart.map((item, i) => (
          <div key={i} className="flex justify-between mb-1">
            <div className="flex-1">
              <p>{item.name}</p>
              <p className="text-[10px]">{item.quantity} x {item.price.toLocaleString('id-ID')}</p>
            </div>
            <p className="self-end">{(item.price * item.quantity).toLocaleString('id-ID')}</p>
          </div>
        ))}
      </div>

      {/* Ringkasan Harga */}
      <div className="space-y-1 text-xs">
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span>{subtotal.toLocaleString('id-ID')}</span>
        </div>
        <div className="flex justify-between">
          <span>Pajak (10%):</span>
          <span>{tax.toLocaleString('id-ID')}</span>
        </div>
        <div className="flex justify-between font-bold text-base pt-2 border-t border-dashed border-black">
          <span>TOTAL:</span>
          <span>Rp {total.toLocaleString('id-ID')}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-8 pt-4 border-t border-dashed border-black">
        <p className="text-xs italic">Terima kasih telah jajan!</p>
        <p className="text-[10px] mt-1">Simpan struk ini sebagai bukti pembayaran</p>
      </div>
    </div>
  );
}
