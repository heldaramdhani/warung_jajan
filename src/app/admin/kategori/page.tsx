'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Search, Loader2 } from 'lucide-react';
import { CategoryTable, Category } from '../../../components/admin/kategori/CategoryTable';
import { CategoryModals } from '../../../components/admin/kategori/CategoryModals';
import { CategoryStats } from '../../../components/admin/kategori/CategoryStats';
import { Button } from '@/ui/Button';

export default function KategoriPage() {
  const [categoriesList, setCategoriesList] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modals state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  // Form states for Add Category
  const [addForm, setAddForm] = useState({
    name: ''
  });

  // Fetch categories from API
  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/kategori');
      const result = await response.json();
      
      if (result.success && Array.isArray(result.data)) {
        const transformedCategories = result.data.map((c: any) => ({
          id: c.id,
          name: c.nama_kategori,
          created_at: c.created_at || new Date().toISOString()
        }));
        setCategoriesList(transformedCategories);
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Filter categories
  const filteredCategories = categoriesList.filter((category) => {
    return category.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleEdit = (category: Category) => {
    setSelectedCategory(category);
    setIsEditModalOpen(true);
  };

  const handleDelete = (category: Category) => {
    setSelectedCategory(category);
    setIsDeleteModalOpen(true);
  };

  const submitAddCategory = async () => {
    if (!addForm.name) return;
    
    try {
      const response = await fetch('/api/kategori', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          nama_kategori: addForm.name
        }),
      });
      
      const result = await response.json();
      if (result.success) {
        setIsModalOpen(false);
        setAddForm({ name: '' });
        fetchCategories();
      } else {
        alert(result.message || 'Gagal menambahkan kategori');
      }
    } catch (error) {
      console.error('Failed to add category:', error);
    }
  };

  const submitEditCategory = async () => {
    if (!selectedCategory) return;
    
    try {
      const response = await fetch(`/api/kategori/${selectedCategory.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          nama_kategori: selectedCategory.name
        }),
      });
      
      const result = await response.json();
      if (result.success) {
        setIsEditModalOpen(false);
        setSelectedCategory(null);
        fetchCategories();
      } else {
        alert(result.message || 'Gagal mengubah kategori');
      }
    } catch (error) {
      console.error('Failed to edit category:', error);
    }
  };

  const submitDeleteCategory = async () => {
    if (!selectedCategory) return;
    
    try {
      const response = await fetch(`/api/kategori/${selectedCategory.id}`, {
        method: 'DELETE',
      });
      
      const result = await response.json();
      if (result.success) {
        setIsDeleteModalOpen(false);
        setSelectedCategory(null);
        fetchCategories();
      } else {
        alert(result.message || 'Gagal menghapus kategori');
      }
    } catch (error) {
      console.error('Failed to delete category:', error);
    }
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
          Tambah Kategori
        </Button>
      </div>

      {/* Stats Cards Row */}
      <CategoryStats totalCategories={categoriesList.length} />

      {/* Search Row */}
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
            placeholder="Cari nama kategori..."
          />
        </div>
      </div>

      {/* Category Table */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white border border-slate-100 rounded-2xl">
          <Loader2 className="h-8 w-8 text-[#0f9d58] animate-spin mb-4" />
          <p className="text-slate-500 font-medium">Memuat data kategori...</p>
        </div>
      ) : (
        <CategoryTable 
          categories={filteredCategories} 
          totalCategories={categoriesList.length} 
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {/* All Category Modals */}
      <CategoryModals 
        isAddOpen={isModalOpen}
        setIsAddOpen={setIsModalOpen}
        addForm={addForm}
        setAddForm={setAddForm}
        submitAddCategory={submitAddCategory}
        isEditOpen={isEditModalOpen}
        setIsEditOpen={setIsEditModalOpen}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        submitEditCategory={submitEditCategory}
        isDeleteOpen={isDeleteModalOpen}
        setIsDeleteOpen={setIsDeleteModalOpen}
        submitDeleteCategory={submitDeleteCategory}
      />
    </div>
  );
}
