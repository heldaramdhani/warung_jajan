'use client';

import React, { useState, useEffect } from 'react';
import { Pencil, Trash2, Database, ChevronLeft, ChevronRight, Tag } from 'lucide-react';
import { Badge } from '../../../ui/Badge';

export interface Category {
  id: string;
  name: string;
  created_at: string;
}

interface CategoryTableProps {
  categories: Category[];
  totalCategories: number;
  onEdit?: (category: Category) => void;
  onDelete?: (category: Category) => void;
}

export function CategoryTable({ categories = [], totalCategories = 0, onEdit, onDelete }: CategoryTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    setCurrentPage(1);
  }, [categories]);

  const totalPages = Math.ceil(categories.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCategories = categories.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden flex flex-col">
      {/* Table Header Section */}
      <div className="p-6 border-b border-slate-100 flex justify-between items-start md:items-center flex-col md:flex-row gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-800">Daftar Kategori Produk</h2>
          <p className="text-sm text-slate-500 mt-1">Kelola kategori untuk pengelompokan produk yang lebih baik.</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-[#e6f4ea] text-[#0f9d58] rounded-full text-sm font-medium">
          <Database size={16} />
          {totalCategories} kategori tersedia
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[500px]">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-100">
              <th className="py-4 px-6 font-medium text-slate-400 text-sm">Nama Kategori</th>
              <th className="py-4 px-6 font-medium text-slate-400 text-sm text-center">Tanggal Dibuat</th>
              <th className="py-4 px-6 font-medium text-slate-400 text-sm text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCategories.length === 0 ? (
              <tr>
                <td colSpan={3} className="py-8 text-center text-slate-500">Data tidak ditemukan</td>
              </tr>
            ) : (
              paginatedCategories.map((category) => (
                <tr key={category.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                        <Tag size={16} />
                      </div>
                      <span className="text-sm font-bold text-slate-800">{category.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className="text-sm text-slate-400">{new Date(category.created_at).toLocaleDateString('id-ID')}</span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-center gap-2">
                      <button 
                        onClick={() => onEdit && onEdit(category)}
                        className="w-8 h-8 rounded-lg bg-orange-50 text-orange-500 flex items-center justify-center hover:bg-orange-100 transition-colors"
                      >
                        <Pencil size={14} />
                      </button>
                      <button 
                        onClick={() => onDelete && onDelete(category)}
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
          {categories.length === 0 
            ? `Data tidak ditemukan (Total: ${totalCategories} kategori)`
            : `Menampilkan ${startIndex + 1}-${Math.min(startIndex + itemsPerPage, categories.length)} dari ${categories.length} kategori yang difilter.`}
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
                      ? 'bg-[#0f9d58] text-white' 
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
