'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { StatCards } from '@/components/kasir/riwayat/StatCards';
import { HistoryFilters } from '@/components/kasir/riwayat/HistoryFilters';
import { TransactionTable } from '@/components/kasir/riwayat/TransactionTable';
import { Loader2 } from 'lucide-react';

export default function RiwayatTransaksiPage() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [method, setMethod] = useState('Semua metode');
  const [cashier, setCashier] = useState('Semua kasir');
  const [status, setStatus] = useState('Semua Status');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/transaksi');
        const result = await response.json();
        if (result.success) {
          const transformed = result.data.map((trx: any) => ({
            id: trx.kode_transaksi,
            waktu: new Date(trx.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
            method: trx.metode_pembayaran,
            pelanggan: 'Guest / Walk-in', // Not in ERD/API
            kasir: trx.user?.nama || 'Unknown',
            total: `Rp ${trx.total.toLocaleString('id-ID')}`,
            status: 'Lunas' // Assuming success = lunas for now
          }));
          setTransactions(transformed);
        }
      } catch (error) {
        console.error('Failed to fetch transactions:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  const filteredTransactions = useMemo(() => {
    return transactions.filter(trx => {
      const matchesSearch = trx.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           trx.pelanggan.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesMethod = method === 'Semua metode' || trx.method === method;
      const matchesCashier = cashier === 'Semua kasir' || trx.kasir === cashier;
      const matchesStatus = status === 'Semua Status' || trx.status === status;
      
      return matchesSearch && matchesMethod && matchesCashier && matchesStatus;
    });
  }, [transactions, searchTerm, method, cashier, status]);

  return (
    <div className="flex flex-col gap-6">
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-slate-100">
          <Loader2 className="h-8 w-8 text-[#0f9d58] animate-spin mb-4" />
          <p className="text-slate-500 font-medium">Memuat riwayat transaksi...</p>
        </div>
      ) : (
        <>
          <StatCards transactions={transactions} />
          <div className="space-y-6">
            <HistoryFilters 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              method={method}
              setMethod={setMethod}
              cashier={cashier}
              setCashier={setCashier}
              status={status}
              setStatus={setStatus}
            />
            <TransactionTable transactions={filteredTransactions} />
          </div>
        </>
      )}
    </div>
  );
}

