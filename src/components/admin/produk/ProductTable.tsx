'use client';

import React, { useState, useEffect } from 'react';
import { Pencil, Trash2, Database, ChevronLeft, ChevronRight } from 'lucide-react';
import { Badge } from '@/ui/Badge';

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  sellingPrice: string;
  image?: string;
}

interface ProductTableProps {
  products: Product[];
  totalProducts: number;
  onEdit?: (product: Product) => void;
  onDelete?: (product: Product) => void;
}

export function ProductTable({ products = [], totalProducts = 0, onEdit, onDelete }: ProductTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    setCurrentPage(1);
  }, [products]);

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = products.slice(startIndex, startIndex + itemsPerPage);

  const getStockColor = (status: string) => {
    switch (status) {
      case 'high': return 'bg-[#0f9d58]';
      case 'medium': return 'bg-[#fbbc04]';
      case 'low': return 'bg-[#ea4335]';
      default: return 'bg-slate-200';
    }
  };

  const getStockWidth = (stock: number) => {
    // Max stock assuming 100 for percentage
    const percentage = Math.min(100, Math.max(0, (stock / 100) * 100));
    return `${percentage}%`;
  };

  return (
    <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden flex flex-col">
      {/* Table Header Section */}
      <div className="p-6 border-b border-slate-100 flex justify-between items-start md:items-center flex-col md:flex-row gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-800">Daftar Inventaris Produk</h2>
          <p className="text-sm text-slate-500 mt-1">Pantau detail produk lengkap untuk operasional toko dan gudang.</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#e6f4ea] text-[#0f9d58] rounded-full text-sm font-medium">
          <Database size={16} />
          {totalProducts} produk tercatat
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="py-4 px-6 font-medium text-slate-400 text-sm text-center">ID</th>
              <th className="py-4 px-6 font-medium text-slate-400 text-sm text-center">Gambar</th>
              <th className="py-4 px-6 font-medium text-slate-400 text-sm text-center">Nama Produk</th>
              <th className="py-4 px-6 font-medium text-slate-400 text-sm text-center">Kategori</th>

              <th className="py-4 px-6 font-medium text-slate-400 text-sm text-center">Harga Jual</th>
              <th className="py-4 px-6 font-medium text-slate-400 text-sm text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {paginatedProducts.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-slate-500">Data tidak ditemukan</td>
              </tr>
            ) : (
              paginatedProducts.map((product) => (
                <tr key={product.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-6 text-sm font-bold text-slate-800">{product.id}</td>
                  <td className="py-4 px-6">
                    {product.image ? (
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-lg bg-slate-100 shrink-0 flex items-center justify-center text-slate-400 font-bold text-lg">
                        {product.name.charAt(0)}
                      </div>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-sm font-bold text-slate-800">{product.name}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{product.description}</div>
                  </td>
                  <td className="py-4 px-6">
                    <Badge variant={product.category.toLowerCase() === 'makanan' ? 'success' : 'info'}>
                      {product.category}
                    </Badge>
                  </td>

                  <td className="py-4 px-6 text-sm text-slate-600">{product.sellingPrice}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => onEdit && onEdit(product)}
                        className="w-8 h-8 rounded-lg bg-orange-50 text-orange-500 flex items-center justify-center hover:bg-orange-100 transition-colors"
                      >
                        <Pencil size={14} />
                      </button>
                      <button 
                        onClick={() => onDelete && onDelete(product)}
                        className="w-8 h-8 rounded-lg bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-100 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Table Footer */}
      <div className="p-4 border-t border-slate-100 bg-white flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-slate-500">
          {products.length === 0 
            ? `Data tidak ditemukan (Total: ${totalProducts} produk)`
            : `Menampilkan ${startIndex + 1}-${Math.min(startIndex + itemsPerPage, products.length)} dari ${products.length} produk yang difilter (Total: ${totalProducts}).`}
        </p>
        
        {totalPages > 1 && (
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="w-8 h-8 rounded-lg bg-slate-50 text-slate-500 flex items-center justify-center hover:bg-slate-100 disabled:opacity-50 disabled:hover:bg-slate-50 transition-colors"
            >
              <ChevronLeft size={16} />
            </button>
            <div className="flex gap-1">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-8 h-8 rounded-lg text-sm font-bold flex items-center justify-center transition-colors ${
                    currentPage === i + 1 
                      ? 'bg-[#e6f4ea] text-[#0f9d58]' 
                      : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="w-8 h-8 rounded-lg bg-slate-50 text-slate-500 flex items-center justify-center hover:bg-slate-100 disabled:opacity-50 disabled:hover:bg-slate-50 transition-colors"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
