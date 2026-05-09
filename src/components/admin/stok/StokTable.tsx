'use client';

import React, { useState, useMemo } from 'react';
import { Filter, ArrowUpDown, Eye, Pencil, PackagePlus, Trash2, Search, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { Button } from '@/ui/Button';

export interface StokHistory {
  id: string;
  type: 'in' | 'out';
  amount: number;
  description: string;
  date: string;
}

export interface StokItem {
  id: string;
  name: string;
  category: string;
  location: string;
  stock: number;
  maxStock: number;
  unit: string;
  status: 'Aman' | 'Rendah' | 'Habis';
  history: StokHistory[];
}

interface StokTableProps {
  items: StokItem[];
  onAction: (action: 'detail' | 'edit' | 'restock' | 'delete', item: StokItem) => void;
}

export function StokTable({ items, onAction }: StokTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [sortWarning, setSortWarning] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = new Set(items.map(item => item.category));
    return Array.from(cats);
  }, [items]);

  // Filter and sort items
  const filteredItems = useMemo(() => {
    let result = items.filter(item => 
      (item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
       item.id.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (selectedCategory === '' || item.category === selectedCategory)
    );

    if (sortWarning) {
      const statusWeight = { 'Habis': 3, 'Rendah': 2, 'Aman': 1 };
      result = result.sort((a, b) => {
        // Sort by warning status first
        const weightDiff = statusWeight[b.status] - statusWeight[a.status];
        if (weightDiff !== 0) return weightDiff;
        // If same status, sort by stock percentage
        const percA = a.maxStock > 0 ? (a.stock / a.maxStock) : 0;
        const percB = b.maxStock > 0 ? (b.stock / b.maxStock) : 0;
        return percA - percB;
      });
    }

    return result;
  }, [items, searchTerm, selectedCategory, sortWarning]);

  // Pagination logic
  const totalItems = filteredItems.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  
  if (currentPage > totalPages) {
    setCurrentPage(totalPages);
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);

  const getStatusBadge = (status: StokItem['status']) => {
    switch (status) {
      case 'Aman':
        return <span className="px-3 py-1 bg-[#e6f4ea] text-[#0f9d58] rounded-full text-xs font-semibold whitespace-nowrap">Aman</span>;
      case 'Rendah':
        return <span className="px-3 py-1 bg-orange-50 text-orange-500 rounded-full text-xs font-semibold whitespace-nowrap">Rendah</span>;
      case 'Habis':
        return <span className="px-3 py-1 bg-red-50 text-red-500 rounded-full text-xs font-semibold whitespace-nowrap">Habis</span>;
      default:
        return null;
    }
  };

  const getProgressBar = (status: StokItem['status'], stock: number, maxStock: number, unit: string) => {
    let colorClass = 'bg-[#0f9d58]';
    if (status === 'Rendah') colorClass = 'bg-orange-500';
    if (status === 'Habis') colorClass = 'bg-red-500';

    const percentage = maxStock > 0 ? Math.min(100, (stock / maxStock) * 100) : 0;

    return (
      <div className="flex flex-col gap-1.5 min-w-[120px]">
        <div className="flex justify-between items-center text-xs font-medium text-slate-600">
          <span className={status === 'Habis' ? 'text-red-500 font-bold' : 'font-bold text-slate-800'}>
            {stock} <span className="font-normal text-slate-500">/ {maxStock} {unit}</span>
          </span>
        </div>
        <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
          <div 
            className={`h-full ${colorClass}`} 
            style={{ width: `${status === 'Habis' ? 5 : percentage}%` }}
          />
        </div>
      </div>
    );
  };

  const getRowBackground = (status: StokItem['status']) => {
    if (status === 'Habis') return 'bg-red-50/30 hover:bg-red-50/60 border-l-2 border-l-red-500';
    if (status === 'Rendah') return 'bg-orange-50/30 hover:bg-orange-50/60 border-l-2 border-l-orange-500';
    return 'hover:bg-slate-50 border-l-2 border-l-transparent';
  };

  return (
    <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm flex flex-col">
      {/* Top Header Row with Search & Filters */}
      <div className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="relative w-full md:max-w-xs">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0f9d58] transition-all text-slate-700 placeholder-slate-400"
            placeholder="Cari Barang atau ID..."
          />
        </div>
        
        <div className="flex gap-3 w-full md:w-auto relative">
          
          {/* Category Filter */}
          <div className="relative">
            <Button 
              variant="outline" 
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              className="flex-1 md:flex-none items-center justify-center gap-2 px-4 py-2 bg-white text-slate-700 border-slate-200 hover:bg-slate-50 text-sm rounded-xl"
            >
              <Filter size={16} className={selectedCategory ? 'text-[#0f9d58]' : 'text-slate-500'} />
              <span className="hidden sm:inline">
                {selectedCategory ? selectedCategory : 'Semua Kategori'}
              </span>
            </Button>
            
            {isCategoryOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-lg z-20 py-2">
                <button 
                  onClick={() => { setSelectedCategory(''); setIsCategoryOpen(false); setCurrentPage(1); }}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-slate-50 flex items-center justify-between text-slate-700"
                >
                  Semua Kategori
                  {selectedCategory === '' && <Check size={14} className="text-[#0f9d58]" />}
                </button>
                {categories.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => { setSelectedCategory(cat); setIsCategoryOpen(false); setCurrentPage(1); }}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-slate-50 flex items-center justify-between text-slate-700"
                  >
                    {cat}
                    {selectedCategory === cat && <Check size={14} className="text-[#0f9d58]" />}
                  </button>
                ))}
              </div>
            )}
            
            {/* Backdrop for closing dropdown */}
            {isCategoryOpen && (
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setIsCategoryOpen(false)}
              />
            )}
          </div>

          {/* Sort Warning */}
          <Button 
            variant="outline" 
            onClick={() => setSortWarning(!sortWarning)}
            className={`flex-1 md:flex-none items-center justify-center gap-2 px-4 py-2 text-sm rounded-xl transition-colors ${
              sortWarning 
                ? 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100' 
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <ArrowUpDown size={16} className={sortWarning ? 'text-red-500' : 'text-slate-500'} />
            <span className="hidden sm:inline">Urutkan Peringatan</span>
          </Button>
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead>
            <tr className="border-y border-slate-100 bg-slate-50/50">
              <th className="py-4 px-6 font-semibold text-slate-500 text-xs tracking-wider w-[12%]">ID BARANG</th>
              <th className="py-4 px-6 font-semibold text-slate-500 text-xs tracking-wider w-[22%]">PRODUK</th>
              <th className="py-4 px-6 font-semibold text-slate-500 text-xs tracking-wider w-[12%]">KATEGORI</th>
              <th className="py-4 px-6 font-semibold text-slate-500 text-xs tracking-wider w-[15%]">LOKASI RAK</th>
              <th className="py-4 px-6 font-semibold text-slate-500 text-xs tracking-wider w-[15%]">SISA STOK</th>
              <th className="py-4 px-6 font-semibold text-slate-500 text-xs tracking-wider w-[12%]">STATUS</th>
              <th className="py-4 px-6 font-semibold text-slate-500 text-xs tracking-wider w-[12%] text-center">AKSI</th>
            </tr>
          </thead>
          <tbody>
            {paginatedItems.map((item) => (
              <tr key={item.id} className={`border-b border-slate-50 transition-colors group ${getRowBackground(item.status)}`}>
                <td className="py-4 px-6 text-sm font-semibold text-slate-800">{item.id}</td>
                <td className="py-4 px-6 text-sm font-semibold text-slate-800">{item.name}</td>
                <td className="py-4 px-6 text-sm text-slate-600">{item.category}</td>
                <td className="py-4 px-6 text-sm text-slate-600">{item.location}</td>
                <td className="py-4 px-6">
                  {getProgressBar(item.status, item.stock, item.maxStock, item.unit)}
                </td>
                <td className="py-4 px-6">
                  {getStatusBadge(item.status)}
                </td>
                <td className="py-4 px-6">
                  <div className="flex items-center justify-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                    
                    {/* Detail Action */}
                    <div className="relative group/tooltip">
                      <button 
                        onClick={() => onAction('detail', item)}
                        className="p-1.5 text-slate-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Eye size={16} />
                      </button>
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-800 text-white text-[10px] font-medium rounded opacity-0 group-hover/tooltip:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-10">
                        Lihat Detail
                      </div>
                    </div>

                    {/* Edit Action */}
                    <div className="relative group/tooltip">
                      <button 
                        onClick={() => onAction('edit', item)}
                        className="p-1.5 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 rounded-lg transition-colors"
                      >
                        <Pencil size={16} />
                      </button>
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-800 text-white text-[10px] font-medium rounded opacity-0 group-hover/tooltip:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-10">
                        Edit Produk
                      </div>
                    </div>

                    {/* Restock Action */}
                    <div className="relative group/tooltip">
                      <button 
                        onClick={() => onAction('restock', item)}
                        className={`p-1.5 rounded-lg transition-colors ${
                          item.status === 'Habis' || item.status === 'Rendah' 
                            ? 'text-[#0f9d58] bg-[#e6f4ea] hover:bg-[#0b8043] hover:text-white ring-1 ring-[#0f9d58]/30' 
                            : 'text-slate-400 hover:text-[#0f9d58] hover:bg-[#e6f4ea]'
                        }`}
                      >
                        <PackagePlus size={16} />
                      </button>
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-800 text-white text-[10px] font-medium rounded opacity-0 group-hover/tooltip:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-10">
                        Restock
                      </div>
                    </div>

                    {/* Delete Action */}
                    <div className="relative group/tooltip">
                      <button 
                        onClick={() => onAction('delete', item)}
                        className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-800 text-white text-[10px] font-medium rounded opacity-0 group-hover/tooltip:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-10">
                        Hapus
                      </div>
                    </div>

                  </div>
                </td>
              </tr>
            ))}
            {paginatedItems.length === 0 && (
              <tr>
                <td colSpan={7} className="py-8 text-center text-slate-500 text-sm">
                  {searchTerm || selectedCategory ? 'Data tidak ditemukan' : 'Belum ada data stok'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination & Footer */}
      <div className="p-4 bg-white border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-sm text-slate-500 font-medium">
          Menampilkan <span className="font-bold text-slate-800">
            {totalItems === 0 ? 0 : startIndex + 1} - {Math.min(startIndex + itemsPerPage, totalItems)}
          </span> dari <span className="font-bold text-slate-800">{totalItems}</span> data
        </p>
        
        <div className="flex items-center gap-1">
          <button 
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:bg-slate-50 disabled:opacity-50 transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button 
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-8 h-8 rounded-lg text-sm font-semibold flex items-center justify-center transition-colors ${
                currentPage === page 
                  ? 'bg-[#0f9d58] text-white' 
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              {page}
            </button>
          ))}

          <button 
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-50 transition-colors"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
