import React from 'react';
import { X, Search, Package, Calendar, Info } from 'lucide-react';
import { Button } from '@/ui/Button';

interface StokDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function StokDrawer({ isOpen, onClose }: StokDrawerProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-800/40 z-40 transition-opacity"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 w-full md:w-[400px] bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-800">Tambah Stok</h2>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-5">
          
          {/* Pilih Barang */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700">Pilih Barang</label>
            <div className="relative">
              <select className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0f9d58] appearance-none text-slate-600">
                <option value="">-- Pilih barang --</option>
                <option value="INV-021">Dimsum</option>
                <option value="INV-034">Dimsum Mozarella</option>
                <option value="INV-052">Lemon Tea</option>
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Search size={16} className="text-slate-400" />
              </div>
            </div>
          </div>

          {/* Jumlah Tambahan */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700">Jumlah Tambahan</label>
            <div className="relative">
              <input 
                type="number" 
                placeholder="Masukkan jumlah stok"
                className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0f9d58] placeholder-slate-400"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Package size={16} className="text-slate-400" />
              </div>
            </div>
          </div>

          {/* Tanggal */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700">Tanggal</label>
            <div className="relative">
              <input 
                type="date" 
                defaultValue={new Date().toISOString().split('T')[0]}
                className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0f9d58] text-slate-600"
              />
            </div>
          </div>

          {/* Supplier (Opsional) */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700">Supplier (Opsional)</label>
            <select className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0f9d58] text-slate-600 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2394a3b8%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px_12px] bg-[right_16px_center] bg-no-repeat">
              <option value="">Pilih supplier</option>
              <option value="sup-1">CV. Sumber Jaya</option>
              <option value="sup-2">Toko ABC</option>
            </select>
          </div>

          {/* Keterangan */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700">Keterangan (Opsional)</label>
            <textarea 
              placeholder="Contoh: Pembelian dari CV. Sumber Jaya"
              rows={4}
              className="w-full p-4 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0f9d58] placeholder-slate-400 resize-none"
            />
          </div>

          {/* Info Banner */}
          <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl mt-2 border border-blue-100">
            <Info size={18} className="text-blue-500 flex-shrink-0 mt-0.5" />
            <p className="text-xs font-medium text-blue-700 leading-relaxed">
              Stok akan bertambah sesuai jumlah yang diinput.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-100 grid grid-cols-2 gap-4">
          <Button 
            variant="outline" 
            onClick={onClose}
            className="w-full font-semibold border-slate-200 text-slate-700 hover:bg-slate-50"
          >
            Batal
          </Button>
          <Button 
            variant="primary" 
            onClick={onClose}
            className="w-full font-semibold"
          >
            Simpan
          </Button>
        </div>
      </div>
    </>
  );
}
