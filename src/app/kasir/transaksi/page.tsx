'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { ProductCatalog } from '@/components/kasir/transaksi/ProductCatalog';
import { CartPanel } from '@/components/kasir/transaksi/CartPanel';
import { SuccessModal } from '@/components/kasir/transaksi/SuccessModal';
import { Receipt } from '@/components/kasir/transaksi/Receipt';

// Types
interface Product {
  id: string;
  nama_produk: string;
  harga: number;
  gambar_url: string | null;
  kategori: { nama_kategori: string } | null;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export default function TransaksiPage() {
  // --- States ---
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [customerName, setCustomerName] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('Tunai');

  // --- Derived State ---
  const subtotal = useMemo(() => cart.reduce((acc, item) => acc + (item.price * item.quantity), 0), [cart]);
  const total = useMemo(() => subtotal + Math.round(subtotal * 0.1), [subtotal]);

  const categories = useMemo(() => [
    'Semua', 
    ...Array.from(new Set(products.map(p => p.kategori?.nama_kategori).filter(Boolean)))
  ] as string[], [products]);

  const groupedProducts = useMemo(() => {
    const filtered = products.filter(p => {
      const matchesSearch = p.nama_produk.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === 'Semua' || p.kategori?.nama_kategori === activeCategory;
      return matchesSearch && matchesCategory;
    });

    return filtered.reduce((acc, product) => {
      const categoryName = product.kategori?.nama_kategori || 'Lainnya';
      if (!acc[categoryName]) acc[categoryName] = [];
      acc[categoryName].push(product);
      return acc;
    }, {} as Record<string, Product[]>);
  }, [products, searchTerm, activeCategory]);

  // --- Effects ---
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/produk');
        const result = await response.json();
        if (result.success) setProducts(result.data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // --- Handlers ---
  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { id: product.id, name: product.nama_produk, price: product.harga, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const clearCart = () => {
    if (window.confirm('Apakah Anda yakin ingin mengosongkan keranjang?')) {
      setCart([]);
      setCustomerName('');
    }
  };

  const handleWhatsApp = () => {
    const itemsText = cart.map(item => `${item.name} x${item.quantity}`).join(', ');
    const message = `Nota DimsumKu\nPelanggan: ${customerName || 'Guest'}\nMetode: ${paymentMethod}\nPesanan: ${itemsText}\nTotal: Rp ${total.toLocaleString('id-ID')}\nTerima Kasih!`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleNewTransaction = () => {
    setCart([]);
    setCustomerName('');
    setPaymentMethod('Tunai');
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-[calc(125vh-110px)]">
      {/* Kolom Kiri: Katalog Produk (Modular) */}
      <ProductCatalog 
        isLoading={isLoading}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        groupedProducts={groupedProducts}
        onAddToCart={addToCart}
      />

      {/* Kolom Kanan: Panel Keranjang */}
      <div className="w-full lg:w-[400px] flex-shrink-0 flex flex-col h-full">
        <CartPanel 
          cart={cart}
          onUpdateQuantity={updateQuantity}
          onClearCart={clearCart}
          customerName={customerName}
          setCustomerName={setCustomerName}
          onCheckout={() => setIsModalOpen(true)}
        />
      </div>

      {/* Modals & Receipts */}
      <SuccessModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        total={total}
        onPrint={() => window.print()}
        onWhatsApp={handleWhatsApp}
        onNewTransaction={handleNewTransaction}
        paymentMethod={paymentMethod}
        setPaymentMethod={setPaymentMethod}
      />

      <Receipt 
        customerName={customerName}
        cart={cart}
        total={total}
        paymentMethod={paymentMethod}
      />
    </div>
  );
}

