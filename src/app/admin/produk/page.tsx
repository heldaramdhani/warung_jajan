'use client';

import React, { useState } from 'react';
import { Plus, Search, ChevronDown } from 'lucide-react';
import { ProductTable, Product } from '@/components/admin/produk/ProductTable';
import { ProductModals } from '@/components/admin/produk/ProductModals';
import { ProductStats } from '@/components/admin/produk/ProductStats';
import { Button } from '@/ui/Button';
import { Select } from '@/ui/Select';
import { initialProducts } from '@/data/mockProducts';

export default function ProdukPage() {
  const [productsList, setProductsList] = useState<Product[]>(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Semua kategori');
  
  // Modals state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Form states for Add Product
  const [addForm, setAddForm] = useState({
    name: '', description: '', category: 'Dimsum', purchasePrice: '', sellingPrice: '', image: ''
  });

  // Filter products
  const filteredProducts = productsList.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'Semua kategori' || product.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  const handleDelete = (product: Product) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

  const submitAddProduct = () => {
    const newProduct: Product = {
      id: `PRD-${Math.floor(1000 + Math.random() * 9000)}`,
      name: addForm.name || 'Produk Baru',
      description: addForm.description || '-',
      category: addForm.category,
      purchasePrice: `Rp ${addForm.purchasePrice || '0'}`,
      sellingPrice: `Rp ${addForm.sellingPrice || '0'}`,
      image: addForm.image || undefined
    };
    setProductsList([newProduct, ...productsList]);
    setIsModalOpen(false);
    setAddForm({ name: '', description: '', category: 'Dimsum', purchasePrice: '', sellingPrice: '', image: '' });
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
          <Select 
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            options={[
              { label: 'Semua kategori', value: 'Semua kategori' },
              { label: 'Dimsum', value: 'Dimsum' },
              { label: 'Minuman', value: 'Minuman' },
            ]}
          />

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
