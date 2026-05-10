'use client';

import React, { useState } from 'react';
import { StokStats } from '@/components/admin/stok/StokStats';
import { StokTable, StokItem } from '@/components/admin/stok/StokTable';
import { StokModals } from '@/components/admin/stok/StokModals';

const initialStokItems: StokItem[] = [
  {
    id: '#INV-021',
    name: 'Dimsum Ayam',
    category: 'Dimsum',
    location: 'Freezer A',
    stock: 4,
    maxStock: 50,
    unit: 'pack',
    status: 'Rendah',
    history: [],
  },
  {
    id: '#INV-034',
    name: 'Dimsum Mozarella',
    category: 'Dimsum',
    location: 'Freezer A',
    stock: 9,
    maxStock: 50,
    unit: 'pack',
    status: 'Rendah',
    history: [],
  },
  {
    id: '#INV-052',
    name: 'Lemon Tea',
    category: 'Minuman',
    location: 'Chiller Depan',
    stock: 0,
    maxStock: 24,
    unit: 'botol',
    status: 'Habis',
    history: [],
  },
  {
    id: '#INV-066',
    name: 'Teh Tarik',
    category: 'Minuman',
    location: 'Chiller Depan',
    stock: 6,
    maxStock: 24,
    unit: 'botol',
    status: 'Rendah',
    history: [],
  },
  {
    id: '#INV-079',
    name: 'Chili Oil',
    category: 'Pelengkap',
    location: 'Rak Bumbu',
    stock: 42,
    maxStock: 50,
    unit: 'jar',
    status: 'Aman',
    history: [],
  },
  {
    id: '#INV-095',
    name: 'Kecap Asin',
    category: 'Pelengkap',
    location: 'Rak Bumbu',
    stock: 2,
    maxStock: 20,
    unit: 'botol',
    status: 'Rendah',
    history: [],
  },
];

export default function StokPage() {
  const [stokItems, setStokItems] = useState<StokItem[]>(initialStokItems);

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

  const submitEditItem = (updatedItem: StokItem) => {
    updatedItem.status = getStatus(updatedItem.stock, updatedItem.maxStock);
    setStokItems(stokItems.map(item => item.id === updatedItem.id ? updatedItem : item));
    setIsEditOpen(false);
  };

  const submitRestockItem = (id: string, additionalStock: number) => {
    setStokItems(stokItems.map(item => {
      if (item.id === id) {
        const newStock = item.stock + additionalStock;
        const newHistory = {
          id: Date.now().toString(),
          type: 'in' as const,
          amount: additionalStock,
          description: 'Restock',
          date: new Date().toISOString()
        };
        
        // Ensure item.history exists just in case
        const currentHistory = item.history || [];
        
        return {
          ...item,
          stock: newStock,
          status: getStatus(newStock, item.maxStock),
          history: [newHistory, ...currentHistory]
        };
      }
      return item;
    }));
    setIsRestockOpen(false);
  };

  const submitDeleteItem = (id: string) => {
    setStokItems(stokItems.filter(item => item.id !== id));
    setIsDeleteOpen(false);
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

      <StokTable items={stokItems} onAction={handleAction} />

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
