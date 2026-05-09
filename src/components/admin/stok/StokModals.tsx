import React, { useState, useEffect } from 'react';
import { Search, Package, Info } from 'lucide-react';
import { Button } from '@/ui/Button';
import { Modal } from '@/ui/Modal';
import { Input } from '@/ui/Input';
import { StokItem } from './StokTable';

interface StokModalsProps {
  // Detail Modal
  isDetailOpen: boolean;
  setIsDetailOpen: (open: boolean) => void;
  selectedItem: StokItem | null;
  
  // Edit Modal
  isEditOpen: boolean;
  setIsEditOpen: (open: boolean) => void;
  submitEditItem: (updatedItem: StokItem) => void;

  // Restock Modal
  isRestockOpen: boolean;
  setIsRestockOpen: (open: boolean) => void;
  submitRestockItem: (id: string, additionalStock: number) => void;

  // Delete Modal
  isDeleteOpen: boolean;
  setIsDeleteOpen: (open: boolean) => void;
  submitDeleteItem: (id: string) => void;
}

export function StokModals({
  isDetailOpen, setIsDetailOpen, selectedItem,
  isEditOpen, setIsEditOpen, submitEditItem,
  isRestockOpen, setIsRestockOpen, submitRestockItem,
  isDeleteOpen, setIsDeleteOpen, submitDeleteItem
}: StokModalsProps) {

  // State for Edit Form
  const [editForm, setEditForm] = useState<StokItem | null>(null);

  // State for Restock Form
  const [restockAmount, setRestockAmount] = useState<number>(0);

  // Sync edit form with selected item
  useEffect(() => {
    if (selectedItem && isEditOpen) {
      setEditForm({ ...selectedItem });
    }
  }, [selectedItem, isEditOpen]);

  // Reset restock amount when opened
  useEffect(() => {
    if (isRestockOpen) setRestockAmount(0);
  }, [isRestockOpen]);

  return (
    <>
      {/* 1. Detail Modal */}
      <Modal 
        isOpen={isDetailOpen} 
        onClose={() => setIsDetailOpen(false)}
        title={null} // Remove default title
      >
        {selectedItem && (
          <div className="flex flex-col text-slate-700">
            
            {/* Header */}
            <div className="text-center pb-3 border-b border-dashed border-slate-300">
              <h2 className="text-lg font-bold text-slate-800">Detail Produk</h2>
            </div>
            
            {/* Section 1: Produk Info */}
            <div className="py-4 border-b border-dashed border-slate-300 flex flex-col gap-3">
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-xl">📦</span>
                  <h3 className="text-base font-bold text-slate-800">{selectedItem.name}</h3>
                </div>
                <div className="text-sm font-medium text-slate-500 pl-7">{selectedItem.id}</div>
              </div>
              
              <div className="flex flex-col gap-1.5 pl-7 mt-1 text-sm font-medium">
                <div className="flex items-center gap-2">
                  <span>📍</span> 
                  <span>{selectedItem.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>💰</span> 
                  <span>Rp {(Math.floor(Math.random() * 20) + 10)}.000</span>
                </div>
              </div>
            </div>

            {/* Section 2: Stok Info */}
            <div className="py-4 border-b border-dashed border-slate-300 flex flex-col gap-2.5">
              <div className="text-sm font-medium flex gap-2">
                <span className="text-slate-500 w-16">Stok</span> 
                <span className="text-slate-800">: {selectedItem.stock} {selectedItem.unit}</span>
              </div>
              <div className="text-sm font-medium flex gap-2">
                <span className="text-slate-500 w-16">Status</span> 
                <span className="flex items-center">: <span className={`ml-1 px-2 py-0.5 rounded text-xs font-bold ${
                  selectedItem.status === 'Habis' ? 'bg-red-100 text-red-600' : 
                  selectedItem.status === 'Rendah' ? 'bg-orange-100 text-orange-600' : 
                  'bg-emerald-100 text-emerald-600'
                }`}>{selectedItem.status}</span></span>
              </div>
              <div className="text-sm font-medium flex gap-2">
                <span className="text-slate-500 w-16">Exp</span> 
                <span className="text-slate-800">: 19 Mei 2026</span>
              </div>
              
              {/* Progress Bar */}
              <div className="mt-2 flex flex-col gap-1.5">
                <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                  <div 
                    className={`h-full ${
                      selectedItem.status === 'Habis' ? 'bg-red-500' : 
                      selectedItem.status === 'Rendah' ? 'bg-orange-500' : 
                      'bg-[#0f9d58]'
                    }`} 
                    style={{ width: `${selectedItem.maxStock > 0 ? Math.min(100, (selectedItem.stock / selectedItem.maxStock) * 100) : 0}%` }}
                  />
                </div>
                <div className="text-xs font-bold text-slate-600">
                  {selectedItem.stock} / {selectedItem.maxStock}
                </div>
              </div>
            </div>

            {/* Section 3: Riwayat Stok */}
            <div className="py-4 flex flex-col gap-2.5 text-sm font-medium">
              {selectedItem.history && selectedItem.history.length > 0 ? (
                selectedItem.history.map((historyItem) => (
                  <div key={historyItem.id} className="flex items-center gap-2">
                    <span className={historyItem.type === 'in' ? "text-emerald-500" : "text-red-500"}>
                      {historyItem.type === 'in' ? '⬆' : '⬇'}
                    </span> 
                    <span className="text-slate-800">
                      {historyItem.type === 'in' ? '+' : '-'}{historyItem.amount} {historyItem.description}
                    </span>
                    <span className="text-slate-400 text-xs ml-auto font-normal">
                      {new Date(historyItem.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-slate-400 text-center italic py-2">Belum ada riwayat stok</div>
              )}
            </div>

            <div className="flex justify-end pt-2">
              <Button variant="outline" className="w-full font-semibold border-slate-200" onClick={() => setIsDetailOpen(false)}>
                Tutup
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* 2. Edit Modal */}
      <Modal 
        isOpen={isEditOpen} 
        onClose={() => setIsEditOpen(false)}
        title={null}
      >
        {editForm && (
          <div className="flex flex-col text-slate-700">
            <div className="text-center pb-3 border-b border-dashed border-slate-300 mb-4">
              <h2 className="text-lg font-bold text-slate-800">Edit Data Stok</h2>
            </div>
            
            <div className="flex flex-col gap-4">
              <Input 
                label="Nama Produk" 
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
              />
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-slate-700">Kategori</label>
                  <select 
                    value={editForm.category}
                    onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f9d58]"
                  >
                    <option value="Dimsum">Dimsum</option>
                    <option value="Minuman">Minuman</option>
                    <option value="Pelengkap">Pelengkap</option>
                  </select>
                </div>
                <Input 
                  label="Lokasi Rak" 
                  value={editForm.location}
                  onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input 
                  label="Stok Sisa" 
                  type="number"
                  value={editForm.stock}
                  onChange={(e) => setEditForm({ ...editForm, stock: parseInt(e.target.value) || 0 })}
                />
                <Input 
                  label="Maksimal Kapasitas" 
                  type="number"
                  value={editForm.maxStock}
                  onChange={(e) => setEditForm({ ...editForm, maxStock: parseInt(e.target.value) || 0 })}
                />
              </div>
              
              <div className="flex justify-end gap-3 mt-2 pt-4 border-t border-slate-100">
                <Button variant="secondary" onClick={() => setIsEditOpen(false)}>
                  Batal
                </Button>
                <Button onClick={() => submitEditItem(editForm)} className="bg-[#0f9d58] text-white hover:bg-[#0b8043]">
                  Simpan
                </Button>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* 3. Restock Modal */}
      <Modal 
        isOpen={isRestockOpen} 
        onClose={() => setIsRestockOpen(false)}
        title={null}
      >
        {selectedItem && (
          <div className="flex flex-col text-slate-700">
            <div className="text-center pb-3 border-b border-dashed border-slate-300 mb-4">
              <h2 className="text-lg font-bold text-slate-800">Restock Barang</h2>
            </div>
            
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 mb-4">
              <div className="flex items-center gap-2 mb-1">
                <span>📦</span>
                <p className="font-bold text-slate-800">{selectedItem.name}</p>
              </div>
              <p className="text-sm text-slate-600 ml-6">Stok saat ini: <span className="font-bold">{selectedItem.stock} {selectedItem.unit}</span></p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-slate-700">Jumlah Tambahan</label>
                <div className="relative">
                  <input 
                    type="number" 
                    value={restockAmount}
                    onChange={(e) => setRestockAmount(parseInt(e.target.value) || 0)}
                    placeholder="Masukkan jumlah"
                    className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0f9d58] placeholder-slate-400"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span>➕</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-slate-700">Tanggal</label>
                <input 
                  type="date" 
                  defaultValue={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#0f9d58] text-slate-600"
                />
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-xl mt-1 border border-blue-100 mb-4">
              <span className="text-blue-500 mt-0.5">ℹ️</span>
              <p className="text-xs font-medium text-blue-700 leading-relaxed">
                Stok akan bertambah <span className="font-bold">{restockAmount} {selectedItem.unit}</span>. Total stok menjadi <span className="font-bold">{selectedItem.stock + restockAmount} {selectedItem.unit}</span>.
              </p>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <Button variant="secondary" onClick={() => setIsRestockOpen(false)}>
                Batal
              </Button>
              <Button variant="primary" onClick={() => submitRestockItem(selectedItem.id, restockAmount)}>
                Konfirmasi Restock
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* 4. Delete Modal */}
      <Modal 
        isOpen={isDeleteOpen} 
        onClose={() => setIsDeleteOpen(false)}
        title={null}
      >
        {selectedItem && (
          <div className="flex flex-col text-slate-700">
            <div className="text-center pb-3 border-b border-dashed border-slate-300 mb-4">
              <h2 className="text-lg font-bold text-red-600">Hapus Data Stok</h2>
            </div>
            <p className="text-slate-600 text-sm text-center mb-6">
              Apakah Anda yakin ingin menghapus data stok untuk <br/>
              <span className="font-bold text-slate-800 text-base block mt-2">📦 {selectedItem.name}</span>
            </p>
            <div className="flex justify-center gap-3 pt-4 border-t border-slate-100">
              <Button variant="secondary" onClick={() => setIsDeleteOpen(false)} className="px-6">
                Batal
              </Button>
              <Button variant="danger" onClick={() => submitDeleteItem(selectedItem.id)} className="px-6">
                Ya, Hapus
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
