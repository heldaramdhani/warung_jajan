'use client';

import React, { useState, useMemo } from 'react';
import { X, Wallet, QrCode, CreditCard, MessageCircle, Printer, CheckCircle2 } from 'lucide-react';
import { Modal } from '@/ui/Modal';
import { Button } from '@/ui/Button';
import { Input } from '@/ui/Input';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  total: number;
  onPrint: () => void;
  onWhatsApp: () => void;
  onNewTransaction: () => void;
  paymentMethod: string;
  setPaymentMethod: (method: string) => void;
}

export function SuccessModal({ 
  isOpen, 
  onClose, 
  total, 
  onPrint,
  onWhatsApp, 
  onNewTransaction,
  paymentMethod,
  setPaymentMethod
}: SuccessModalProps) {
  // State untuk input uang yang diterima
  const [payAmount, setPayAmount] = useState<string>('');

  // Logika hitung kembalian
  const change = useMemo(() => {
    const paid = parseInt(payAmount.replace(/\./g, '')) || 0;
    return Math.max(0, paid - total);
  }, [payAmount, total]);

  // Tombol cepat nominal uang
  const quickAmounts = [
    { label: 'Uang Pas', value: total.toString() },
    { label: `Rp ${(Math.ceil(total / 5000) * 5000).toLocaleString('id-ID')}`, value: (Math.ceil(total / 5000) * 5000).toString() },
    { label: `Rp ${(Math.ceil((total + 1) / 10000) * 10000).toLocaleString('id-ID')}`, value: (Math.ceil((total + 1) / 10000) * 10000).toString() },
    { label: `Rp ${(Math.ceil((total + 1) / 50000) * 50000).toLocaleString('id-ID')}`, value: (Math.ceil((total + 1) / 50000) * 50000).toString() },
  ];

  const handleQuickAmount = (val: string) => {
    setPayAmount(parseInt(val).toLocaleString('id-ID'));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '');
    setPayAmount(val ? parseInt(val).toLocaleString('id-ID') : '');
  };

  const handleFinalize = () => {
    onPrint();
    onNewTransaction();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Pembayaran">
      <div className="space-y-6">
        {/* Box Total Pesanan */}
        <div className="bg-slate-50 rounded-xl p-6 text-center border border-slate-100">
          <p className="text-xs font-medium text-slate-500 mb-1">Total Pesanan</p>
          <h3 className="text-3xl font-extrabold text-slate-800">
            Rp {total.toLocaleString('id-ID')}
          </h3>
        </div>

        {/* Metode Pembayaran Tabs */}
        <div className="space-y-3">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Metode Pembayaran</p>
          <div className="grid grid-cols-3 gap-3">
            {[
              { id: 'Tunai', icon: Wallet, label: 'Tunai' },
              { id: 'QRIS', icon: QrCode, label: 'QRIS' },
              { id: 'Debit', icon: CreditCard, label: 'Debit / Kredit' }
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => setPaymentMethod(m.id)}
                className={`flex flex-col items-center justify-center py-3 rounded-xl border transition-all ${
                  paymentMethod === m.id 
                    ? 'border-[#0f9d58] bg-[#e6f4ea] text-[#0f9d58]' 
                    : 'border-slate-100 bg-white text-slate-400 hover:bg-slate-50'
                }`}
              >
                <m.icon size={20} className="mb-1" />
                <span className="text-[10px] font-bold">{m.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Input Uang Diterima */}
        <div className="space-y-3">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Uang yang Diterima</p>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">Rp</span>
            <input 
              type="text"
              value={payAmount}
              onChange={handleInputChange}
              placeholder="0"
              className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl font-bold text-lg focus:outline-none focus:ring-2 focus:ring-[#0f9d58] focus:border-transparent transition-all"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {quickAmounts.map((q, i) => (
              <button
                key={i}
                onClick={() => handleQuickAmount(q.value)}
                className="px-3 py-1.5 rounded-lg border border-slate-100 bg-white text-[10px] font-bold text-slate-500 hover:bg-slate-50 transition-colors"
              >
                {q.label}
              </button>
            ))}
          </div>
        </div>

        {/* Pengembalian */}
        <div className="flex justify-between items-center pt-2">
          <p className="text-sm font-bold text-slate-800">Pengembalian</p>
          <p className="text-xl font-extrabold text-[#0f9d58]">
            Rp {change.toLocaleString('id-ID')}
          </p>
        </div>

        {/* Footer Buttons */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
          <Button 
            variant="outline" 
            className="gap-2 py-6 rounded-xl border-slate-200 text-slate-600 font-bold"
            onClick={onWhatsApp}
          >
            <MessageCircle size={18} />
            Kirim ke WhatsApp
          </Button>
          <Button 
            className="gap-2 py-6 rounded-xl bg-[#0f9d58] hover:bg-[#0c8a4d] font-bold text-white shadow-lg shadow-emerald-100"
            onClick={onPrint}
          >
            <Printer size={18} />
            Cetak Struk
          </Button>
        </div>
      </div>
    </Modal>
  );
}
