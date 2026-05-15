'use client';

import React, { useState } from 'react';
import { StokStats } from '@/components/admin/stok/StokStats';
import { StokTable, StokItem } from '@/components/admin/stok/StokTable';
import { StokModals } from '@/components/admin/stok/StokModals';

// Fetching data from API instead of using initialStokItems


export default function StokPage() {
  const [stokItems, setStokItems] = useState<StokItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchStok = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/stok');
      const result = await response.json();
      
      if (result.success && Array.isArray(result.data)) {
        const transformedData = result.data.map((s: any) => ({
          id: s.id,
          name: s.produk?.nama_produk || 'Unknown',
          category: s.produk?.kategori?.nama_kategori || 'Tanpa Kategori',
          location: 'Gudang Utama', // Default location
          stock: s.jumlah_stok,
          maxStock: 100, // Default max stock
          unit: 'pcs', // Default unit
          status: getStatus(s.jumlah_stok, 100),
          history: [],
          image: s.produk?.gambar_url || undefined
        }));
        setStokItems(transformedData);
      }
    } catch (error) {
      console.error('Failed to fetch stock:', error);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchStok();
  }, []);

  // Modal States
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isRestockOpen, setIsRestockOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<StokItem | null>(null);

  const getStatus = (stock: number, maxStock: number): StokItem['status'] => {
    if (stock <= 0) return 'Habis';
    if (maxStock > 0 && stock <= maxStock * 0.2) return 'Rendah'; // Below 20%
    return 'Aman';
  };

  const handleAction = (action: 'detail' | 'edit' | 'restock' | 'delete', item: StokItem) => {
    setSelectedItem(item);
    switch (action) {
      case 'detail': setIsDetailOpen(true); break;
      case 'edit': setIsEditOpen(true); break;
      case 'restock': setIsRestockOpen(true); break;
      case 'delete': setIsDeleteOpen(true); break;
    }
  };

  const submitEditItem = async (updatedItem: StokItem) => {
    try {
      const response = await fetch(`/api/stok/${updatedItem.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jumlah_stok: updatedItem.stock })
      });
      const result = await response.json();
      if (result.success) {
        fetchStok(); // Refresh data
        setIsEditOpen(false);
      }
    } catch (error) {
      console.error('Failed to update stock:', error);
    }
  };

  const submitRestockItem = async (id: string, additionalStock: number) => {
    const item = stokItems.find(i => i.id === id);
    if (!item) return;

    try {
      const response = await fetch(`/api/stok/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jumlah_stok: item.stock + additionalStock })
      });
      const result = await response.json();
      if (result.success) {
        fetchStok(); // Refresh data
        setIsRestockOpen(false);
      }
    } catch (error) {
      console.error('Failed to restock:', error);
    }
  };

  const submitDeleteItem = async (id: string) => {
    try {
      const response = await fetch(`/api/stok/${id}`, { method: 'DELETE' });
      const result = await response.json();
      if (result.success) {
        fetchStok(); // Refresh data
        setIsDeleteOpen(false);
      }
    } catch (error) {
      console.error('Failed to delete stock:', error);
    }
  };

  // Derived stats
  const totalItems = stokItems.length;
  const lowStockItems = stokItems.filter(i => i.status === 'Rendah').length;
  const outOfStockItems = stokItems.filter(i => i.status === 'Habis').length;

  return (
    <div className="flex flex-col gap-6 w-full pb-8 pt-2">
      <StokStats 
        totalItems={totalItems} 
        lowStockItems={lowStockItems} 
        outOfStockItems={outOfStockItems} 
      />

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0f9d58]"></div>
        </div>
      ) : (
        <StokTable items={stokItems} onAction={handleAction} />
      )}

      <StokModals 
        isDetailOpen={isDetailOpen} setIsDetailOpen={setIsDetailOpen}
        isEditOpen={isEditOpen} setIsEditOpen={setIsEditOpen}
        isRestockOpen={isRestockOpen} setIsRestockOpen={setIsRestockOpen}
        isDeleteOpen={isDeleteOpen} setIsDeleteOpen={setIsDeleteOpen}
        selectedItem={selectedItem}
        submitEditItem={submitEditItem}
        submitRestockItem={submitRestockItem}
        submitDeleteItem={submitDeleteItem}
      />
    </div>
  );
}
