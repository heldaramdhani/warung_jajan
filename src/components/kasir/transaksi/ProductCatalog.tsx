'use client';

import React from 'react';
import { Search, Loader2 } from 'lucide-react';
import { Input } from '@/ui/Input';
import { ProductCard } from './ProductCard';

interface Product {
  id: string;
  nama_produk: string;
  harga: number;
  gambar_url: string | null;
  kategori: {
    nama_kategori: string;
  } | null;
}

interface ProductCatalogProps {
  isLoading: boolean;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  categories: string[];
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  groupedProducts: Record<string, Product[]>;
  onAddToCart: (product: Product) => void;
}

export function ProductCatalog({
  isLoading,
  searchTerm,
  setSearchTerm,
  categories,
  activeCategory,
  setActiveCategory,
  groupedProducts,
  onAddToCart
}: ProductCatalogProps) {
  return (
    <div className="flex-1 flex flex-col min-w-0 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      {/* Toolbar */}
      <div className="p-6 border-b border-slate-100 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <Input 
            placeholder="Cari menu..." 
            className="pl-10 h-11 bg-slate-50/50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeCategory === cat 
                  ? 'bg-[#0f9d58] text-white shadow-md shadow-emerald-100' 
                  : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Catalog List */}
      <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-slate-50/10">
        {isLoading ? (
          <div className="h-full flex flex-col items-center justify-center py-20">
            <Loader2 className="h-10 w-10 text-[#0f9d58] animate-spin mb-4" />
            <p className="text-slate-500 font-medium">Memuat menu...</p>
          </div>
        ) : Object.keys(groupedProducts).length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center py-20 opacity-40">
            <p className="text-slate-400 font-medium">Menu tidak ditemukan</p>
          </div>
        ) : (
          Object.entries(groupedProducts).map(([category, prods]) => (
            <div key={category} className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest flex items-center gap-2">
                  Kategori: {category} 
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                </h3>
                <span className="text-xs font-bold text-slate-400">{prods.length} produk</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {prods.map((p) => (
                  <ProductCard 
                    key={p.id}
                    id={p.id}
                    name={p.nama_produk}
                    price={p.harga}
                    category={p.kategori?.nama_kategori || 'Lainnya'}
                    image={p.gambar_url || undefined}
                    onAdd={() => onAddToCart(p)}
                  />
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
