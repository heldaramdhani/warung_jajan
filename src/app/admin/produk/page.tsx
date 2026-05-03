'use client';

import React, { useState } from 'react';
import { Plus, Search, ChevronDown } from 'lucide-react';
import { ProductTable, Product } from '@/components/admin/produk/ProductTable';
import { ProductModals } from '@/components/admin/produk/ProductModals';
import { ProductStats } from '@/components/admin/produk/ProductStats';
import { Button } from '@/ui/Button';

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

  const filterSelectClass = "appearance-none px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-[#0f9d58]";
  const filterSelectStyle = { 
    backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%2394a3b8\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'%3E%3C/path%3E%3C/svg%3E")', 
    backgroundPosition: 'right 12px center', 
    backgroundRepeat: 'no-repeat', 
    backgroundSize: '16px', 
    paddingRight: '40px' 
  };

  return (
    <div className="flex flex-col gap-4 w-full pb-8 relative">
      {/* Top Action Row */}
      <div className="flex justify-end">
        <Button 
          onClick={() => setIsModalOpen(true)}
          variant="primary"
          className="gap-2"
        >
          <Plus size={18} />
          Tambah Produk
        </Button>
      </div>

      {/* Stats Cards Row */}
      <ProductStats totalProducts={productsList.length} />

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
            className={filterSelectClass}
            style={filterSelectStyle}
          >
            <option value="Semua kategori">Semua kategori</option>
            <option value="Makanan">Makanan</option>
            <option value="Minuman">Minuman</option>
          </select>
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={filterSelectClass}
            style={filterSelectStyle}
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

      {/* All Product Modals */}
      <ProductModals 
        isAddOpen={isModalOpen}
        setIsAddOpen={setIsModalOpen}
        addForm={addForm}
        setAddForm={setAddForm}
        submitAddProduct={submitAddProduct}
        isEditOpen={isEditModalOpen}
        setIsEditOpen={setIsEditModalOpen}
        selectedProduct={selectedProduct}
        setSelectedProduct={setSelectedProduct}
        submitEditProduct={submitEditProduct}
        isDeleteOpen={isDeleteModalOpen}
        setIsDeleteOpen={setIsDeleteModalOpen}
        submitDeleteProduct={submitDeleteProduct}
      />
    </div>
  );
}
