'use client';

import React, { useState } from 'react';
import { Plus, Search, ListFilter, Filter, ChevronDown } from 'lucide-react';
import { ProductTable, Product } from '@/components/admin/ProductTable';
import { Modal } from '@/ui/Modal';
import { Input } from '@/ui/Input';

const initialProducts: Product[] = [
  {
    id: 'PRD-001',
    name: 'Dimsum',
    description: '6 pcs • Siap jual',
    category: 'Makanan',
    purchasePrice: 'Rp 8.000',
    sellingPrice: 'Rp 18.000',
    stock: 82,
    stockStatus: 'high',
  },
  {
    id: 'PRD-002',
    name: 'Dimsum Mentai',
    description: 'Porsi reguler • Fresh made',
    category: 'Makanan',
    purchasePrice: 'Rp 10.000',
    sellingPrice: 'Rp 22.000',
    stock: 24,
    stockStatus: 'medium',
  },
  {
    id: 'PRD-003',
    name: 'Dimsum Mozarella',
    description: 'Ukuran medium • Frozen stock',
    category: 'Makanan',
    purchasePrice: 'Rp 7.500',
    sellingPrice: 'Rp 15.000',
    stock: 8,
    stockStatus: 'low',
  },
  {
    id: 'PRD-004',
    name: 'Es Teh Manis',
    description: 'Cup 16 oz • Best seller',
    category: 'Minuman',
    purchasePrice: 'Rp 3.000',
    sellingPrice: 'Rp 8.000',
    stock: 63,
    stockStatus: 'high',
  },
  {
    id: 'PRD-005',
    name: 'Dimsum Kuah Pedas',
    description: 'Porsi jumbo • Pedas level 3',
    category: 'Makanan',
    purchasePrice: 'Rp 9.500',
    sellingPrice: 'Rp 19.000',
    stock: 11,
    stockStatus: 'low',
  },
  {
    id: 'PRD-006',
    name: 'Lemon Tea',
    description: 'Cup 16 oz • Best seller',
    category: 'Minuman',
    purchasePrice: 'Rp 5.000',
    sellingPrice: 'Rp 12.000',
    stock: 18,
    stockStatus: 'medium',
  },
];

export default function ProdukPage() {
  const [productsList, setProductsList] = useState<Product[]>(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Semua kategori');
  const [statusFilter, setStatusFilter] = useState('Semua status');
  
  // Modals state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Form states for Add Product
  const [addForm, setAddForm] = useState({
    name: '', description: '', category: 'Makanan', stock: '', purchasePrice: '', sellingPrice: ''
  });

  // Filter products
  const filteredProducts = productsList.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'Semua kategori' || product.category === categoryFilter;
    
    const matchesStatus = statusFilter === 'Semua status' || 
      (statusFilter === 'Aman' && product.stockStatus === 'high') ||
      (statusFilter === 'Menipis' && product.stockStatus === 'medium') ||
      (statusFilter === 'Kritis' && product.stockStatus === 'low');

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  const handleDelete = (product: Product) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

  const getStockStatus = (stock: number) => {
    if (stock > 20) return 'high';
    if (stock > 10) return 'medium';
    return 'low';
  };

  const submitAddProduct = () => {
    const newProduct: Product = {
      id: `PRD-${Math.floor(1000 + Math.random() * 9000)}`,
      name: addForm.name || 'Produk Baru',
      description: addForm.description || '-',
      category: addForm.category,
      purchasePrice: `Rp ${addForm.purchasePrice || '0'}`,
      sellingPrice: `Rp ${addForm.sellingPrice || '0'}`,
      stock: parseInt(addForm.stock) || 0,
      stockStatus: getStockStatus(parseInt(addForm.stock) || 0)
    };
    setProductsList([newProduct, ...productsList]);
    setIsModalOpen(false);
    setAddForm({ name: '', description: '', category: 'Makanan', stock: '', purchasePrice: '', sellingPrice: '' });
  };

  const submitEditProduct = () => {
    if (!selectedProduct) return;
    const updatedList = productsList.map(p => p.id === selectedProduct.id ? selectedProduct : p);
    setProductsList(updatedList);
    setIsEditModalOpen(false);
    setSelectedProduct(null);
  };

  const submitDeleteProduct = () => {
    if (!selectedProduct) return;
    setProductsList(productsList.filter(p => p.id !== selectedProduct.id));
    setIsDeleteModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto pb-8 relative">
      {/* Top Action Row */}
      <div className="flex justify-end">
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#0f9d58] hover:bg-[#0b8043] text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
        >
          <Plus size={18} />
          Tambah Produk
        </button>
      </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 flex flex-col justify-between">
          <h3 className="text-sm font-medium text-slate-400 mb-2">Total Produk</h3>
          <div>
            <div className="text-3xl font-bold text-slate-800 mb-1">{productsList.length}</div>
            <div className="text-xs text-slate-400">12 kategori aktif</div>
          </div>
        </div>
        {/* Card 2 */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 flex flex-col justify-between">
          <h3 className="text-sm font-medium text-slate-400 mb-2">Kategori Terbanyak</h3>
          <div>
            <div className="text-3xl font-bold text-slate-800 mb-1">Minuman</div>
            <div className="text-xs text-slate-400">36 item terdaftar</div>
          </div>
        </div>
        {/* Card 3 */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 flex flex-col justify-between">
          <h3 className="text-sm font-medium text-slate-400 mb-2">Stok Menipis</h3>
          <div>
            <div className="text-3xl font-bold text-slate-800 mb-1">9 Item</div>
            <div className="text-xs text-slate-400">Perlu restock hari ini</div>
          </div>
        </div>
        {/* Card 4 */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 flex flex-col justify-between">
          <h3 className="text-sm font-medium text-slate-400 mb-2">Update Terakhir</h3>
          <div>
            <div className="text-3xl font-bold text-slate-800 mb-1">09:24</div>
            <div className="text-xs text-slate-400">Sinkronisasi harga gudang</div>
          </div>
        </div>
      </div>

      {/* Search & Filter Row */}
      <div className="flex flex-col md:flex-row gap-4 relative z-10">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0f9d58] focus:border-transparent transition-all text-slate-700 placeholder-slate-400"
            placeholder="Cari nama produk..."
          />
        </div>
        <div className="flex gap-4">
          <select 
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="appearance-none px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-[#0f9d58]"
            style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%2394a3b8\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'%3E%3C/path%3E%3C/svg%3E")', backgroundPosition: 'right 12px center', backgroundRepeat: 'no-repeat', backgroundSize: '16px', paddingRight: '40px' }}
          >
            <option value="Semua kategori">Semua kategori</option>
            <option value="Makanan">Makanan</option>
            <option value="Minuman">Minuman</option>
          </select>
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="appearance-none px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-[#0f9d58]"
            style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%2394a3b8\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'%3E%3C/path%3E%3C/svg%3E")', backgroundPosition: 'right 12px center', backgroundRepeat: 'no-repeat', backgroundSize: '16px', paddingRight: '40px' }}
          >
            <option value="Semua status">Semua status</option>
            <option value="Aman">Stok Aman</option>
            <option value="Menipis">Stok Menipis</option>
            <option value="Kritis">Stok Kritis</option>
          </select>
        </div>
      </div>

      {/* Product Table */}
      <ProductTable 
        products={filteredProducts} 
        totalProducts={productsList.length} 
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Add Product Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Tambah Produk Baru"
      >
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
                <option value="Makanan">Makanan</option>
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
          
          <div className="flex justify-end gap-3 mt-4">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Batal
            </button>
            <button 
              onClick={submitAddProduct}
              className="px-4 py-2 rounded-lg text-sm font-medium bg-[#0f9d58] text-white hover:bg-[#0b8043] transition-colors"
            >
              Simpan Produk
            </button>
          </div>
        </div>
      </Modal>

      {/* Edit Product Modal */}
      <Modal 
        isOpen={isEditModalOpen} 
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedProduct(null);
        }}
        title="Edit Produk"
      >
        {selectedProduct && (
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
                  <option value="Makanan">Makanan</option>
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
            
            <div className="flex justify-end gap-3 mt-4">
              <button 
                onClick={() => {
                  setIsEditModalOpen(false);
                  setSelectedProduct(null);
                }}
                className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Batal
              </button>
              <button 
                onClick={submitEditProduct}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-[#fbbc04] text-white hover:bg-yellow-500 transition-colors"
              >
                Simpan Perubahan
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Product Modal */}
      <Modal 
        isOpen={isDeleteModalOpen} 
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedProduct(null);
        }}
        title="Hapus Produk"
      >
        {selectedProduct && (
          <div className="flex flex-col gap-4">
            <p className="text-slate-600 text-sm">
              Apakah Anda yakin ingin menghapus produk <span className="font-bold text-slate-800">{selectedProduct.name}</span>? 
              Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="flex justify-end gap-3 mt-4">
              <button 
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setSelectedProduct(null);
                }}
                className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Batal
              </button>
              <button 
                onClick={submitDeleteProduct}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-red-500 text-white hover:bg-red-600 transition-colors"
              >
                Hapus Produk
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
