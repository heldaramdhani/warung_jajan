import React from 'react';
import { Modal } from '@/ui/Modal';
import { Input } from '@/ui/Input';
import { Button } from '@/ui/Button';
import { Product } from '@/components/admin/produk/ProductTable';

interface ProductModalsProps {
  // Add Modal State
  isAddOpen: boolean;
  setIsAddOpen: (open: boolean) => void;
  addForm: any;
  setAddForm: React.Dispatch<React.SetStateAction<any>>;
  submitAddProduct: () => void;

  // Edit Modal State
  isEditOpen: boolean;
  setIsEditOpen: (open: boolean) => void;
  selectedProduct: Product | null;
  setSelectedProduct: React.Dispatch<React.SetStateAction<Product | null>>;
  submitEditProduct: () => void;

  // Delete Modal State
  isDeleteOpen: boolean;
  setIsDeleteOpen: (open: boolean) => void;
  submitDeleteProduct: () => void;
}

export function ProductModals({
  isAddOpen, setIsAddOpen, addForm, setAddForm, submitAddProduct,
  isEditOpen, setIsEditOpen, selectedProduct, setSelectedProduct, submitEditProduct,
  isDeleteOpen, setIsDeleteOpen, submitDeleteProduct
}: ProductModalsProps) {

  const getStockStatus = (stock: number) => {
    if (stock > 20) return 'high';
    if (stock > 10) return 'medium';
    return 'low';
  };

  return (
    <>
      {/* Add Product Modal */}
      <Modal 
        isOpen={isAddOpen} 
        onClose={() => setIsAddOpen(false)}
        title={null}
      >
        <div className="flex flex-col text-slate-700">
          <div className="text-center pb-3 border-b border-dashed border-slate-300 mb-4">
            <h2 className="text-lg font-bold text-slate-800">Tambah Produk Baru</h2>
          </div>
          <div className="flex flex-col gap-4">
          <Input 
            label="Nama Produk" 
            value={addForm.name}
            onChange={(e) => setAddForm({ ...addForm, name: e.target.value })}
            placeholder="Contoh: Dimsum Siomay" 
          />
          <Input 
            label="Deskripsi Singkat" 
            value={addForm.description}
            onChange={(e) => setAddForm({ ...addForm, description: e.target.value })}
            placeholder="Contoh: 6 pcs • Siap jual" 
          />
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-700">Kategori</label>
              <select 
                value={addForm.category}
                onChange={(e) => setAddForm({ ...addForm, category: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f9d58]"
              >
                <option value="Dimsum">Dimsum</option>
                <option value="Minuman">Minuman</option>
              </select>
            </div>
            <Input 
              label="Stok Awal" 
              type="number" 
              value={addForm.stock}
              onChange={(e) => setAddForm({ ...addForm, stock: e.target.value })}
              placeholder="0" 
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input 
              label="Harga Beli" 
              type="number" 
              value={addForm.purchasePrice}
              onChange={(e) => setAddForm({ ...addForm, purchasePrice: e.target.value })}
              placeholder="Rp 0" 
            />
            <Input 
              label="Harga Jual" 
              type="number" 
              value={addForm.sellingPrice}
              onChange={(e) => setAddForm({ ...addForm, sellingPrice: e.target.value })}
              placeholder="Rp 0" 
            />
          </div>
          
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <Button 
              variant="secondary"
              onClick={() => setIsAddOpen(false)}
            >
              Batal
            </Button>
            <Button 
              variant="primary"
              onClick={submitAddProduct}
            >
              Simpan Produk
            </Button>
          </div>
        </div>
      </div>
      </Modal>

      {/* Edit Product Modal */}
      <Modal 
        isOpen={isEditOpen} 
        onClose={() => {
          setIsEditOpen(false);
          setSelectedProduct(null);
        }}
        title={null}
      >
        {selectedProduct && (
          <div className="flex flex-col text-slate-700">
            <div className="text-center pb-3 border-b border-dashed border-slate-300 mb-4">
              <h2 className="text-lg font-bold text-slate-800">Edit Produk</h2>
            </div>
            <div className="flex flex-col gap-4">
            <Input 
              label="Nama Produk" 
              value={selectedProduct.name}
              onChange={(e) => setSelectedProduct({ ...selectedProduct, name: e.target.value })}
              placeholder="Contoh: Dimsum Siomay" 
            />
            <Input 
              label="Deskripsi Singkat" 
              value={selectedProduct.description}
              onChange={(e) => setSelectedProduct({ ...selectedProduct, description: e.target.value })}
              placeholder="Contoh: 6 pcs • Siap jual" 
            />
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-700">Kategori</label>
                <select 
                  value={selectedProduct.category}
                  onChange={(e) => setSelectedProduct({ ...selectedProduct, category: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#fbbc04]"
                >
                  <option value="Dimsum">Dimsum</option>
                  <option value="Minuman">Minuman</option>
                </select>
              </div>
              <Input 
                label="Stok" 
                type="number" 
                value={selectedProduct.stock}
                onChange={(e) => setSelectedProduct({ ...selectedProduct, stock: parseInt(e.target.value) || 0, stockStatus: getStockStatus(parseInt(e.target.value) || 0) })}
                placeholder="0" 
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input 
                label="Harga Beli" 
                type="text" 
                value={selectedProduct.purchasePrice.replace('Rp ', '').replace('.', '')}
                onChange={(e) => setSelectedProduct({ ...selectedProduct, purchasePrice: `Rp ${e.target.value}` })}
                placeholder="0" 
              />
              <Input 
                label="Harga Jual" 
                type="text" 
                value={selectedProduct.sellingPrice.replace('Rp ', '').replace('.', '')}
                onChange={(e) => setSelectedProduct({ ...selectedProduct, sellingPrice: `Rp ${e.target.value}` })}
                placeholder="0" 
              />
            </div>
            
            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <Button 
                variant="secondary"
                onClick={() => {
                  setIsEditOpen(false);
                  setSelectedProduct(null);
                }}
              >
                Batal
              </Button>
              <Button 
                onClick={submitEditProduct}
                className="bg-[#fbbc04] text-white hover:bg-yellow-500 focus:ring-[#fbbc04]"
              >
                Simpan Perubahan
              </Button>
            </div>
          </div>
        </div>
        )}
      </Modal>

      {/* Delete Product Modal */}
      <Modal 
        isOpen={isDeleteOpen} 
        onClose={() => {
          setIsDeleteOpen(false);
          setSelectedProduct(null);
        }}
        title={null}
      >
        {selectedProduct && (
          <div className="flex flex-col text-slate-700">
            <div className="text-center pb-3 border-b border-dashed border-slate-300 mb-4">
              <h2 className="text-lg font-bold text-red-600">Hapus Produk</h2>
            </div>
            <p className="text-slate-600 text-sm text-center mb-6">
              Apakah Anda yakin ingin menghapus produk <br/>
              <span className="font-bold text-slate-800 text-base block mt-2">📦 {selectedProduct.name}</span>
            </p>
            <div className="flex justify-center gap-3 pt-4 border-t border-slate-100">
              <Button 
                variant="secondary"
                onClick={() => {
                  setIsDeleteOpen(false);
                  setSelectedProduct(null);
                }}
                className="px-6"
              >
                Batal
              </Button>
              <Button 
                variant="danger"
                onClick={submitDeleteProduct}
                className="px-6"
              >
                Ya, Hapus
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
