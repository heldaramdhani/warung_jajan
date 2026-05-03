'use client';

import React from 'react';
import { Pencil, Trash2, Database } from 'lucide-react';

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  purchasePrice: string;
  sellingPrice: string;
  stock: number;
  stockStatus: string;
}

interface ProductTableProps {
  products: Product[];
  totalProducts: number;
  onEdit?: (product: Product) => void;
  onDelete?: (product: Product) => void;
}

export function ProductTable({ products = [], totalProducts = 0, onEdit, onDelete }: ProductTableProps) {
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
              <th className="py-4 px-6 font-medium text-slate-400 text-sm">ID</th>
              <th className="py-4 px-6 font-medium text-slate-400 text-sm">Nama Produk</th>
              <th className="py-4 px-6 font-medium text-slate-400 text-sm">Kategori</th>
              <th className="py-4 px-6 font-medium text-slate-400 text-sm">Harga Beli</th>
              <th className="py-4 px-6 font-medium text-slate-400 text-sm">Harga Jual</th>
              <th className="py-4 px-6 font-medium text-slate-400 text-sm">Stok</th>
              <th className="py-4 px-6 font-medium text-slate-400 text-sm">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-8 text-center text-slate-500">Data tidak ditemukan</td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-6 text-sm font-bold text-slate-800">{product.id}</td>
                  <td className="py-4 px-6">
                    <div className="text-sm font-bold text-slate-800">{product.name}</div>
                    <div className="text-xs text-slate-400 mt-0.5">{product.description}</div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      product.category.toLowerCase() === 'makanan' 
                        ? 'bg-[#e6f4ea] text-[#0f9d58]' 
                        : 'bg-[#e0f2fe] text-[#0284c7]'
                    }`}>
                      {product.category}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm text-slate-600">{product.purchasePrice}</td>
                  <td className="py-4 px-6 text-sm text-slate-600">{product.sellingPrice}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${getStockColor(product.stockStatus)}`} 
                          style={{ width: getStockWidth(product.stock) }}
                        ></div>
                      </div>
                      <span className="text-sm font-bold text-slate-800 w-12">{product.stock} pcs</span>
                    </div>
                  </td>
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
      <div className="p-4 border-t border-slate-100 bg-white">
        <p className="text-sm text-slate-500">
          Menampilkan {products.length} dari {totalProducts} produk. Gunakan pencarian dan filter kategori untuk mempercepat pengelolaan inventaris.
        </p>
      </div>
    </div>
  );
}
