'use client';

import React, { useState, useMemo } from 'react';
import { StatCards } from '@/components/kasir/riwayat/StatCards';
import { HistoryFilters } from '@/components/kasir/riwayat/HistoryFilters';
import { TransactionTable } from '@/components/kasir/riwayat/TransactionTable';

const MOCK_TRANSACTIONS = [
  { id: '#TRX-20260405-001', waktu: '08:12', method: 'Tunai', pelanggan: 'Guest / Walk-in', kasir: 'Eleanor', total: 'Rp 72.600', status: 'Lunas' },
  { id: '#TRX-20260405-002', waktu: '09:07', method: 'QRIS', pelanggan: 'Nadia Putri', kasir: 'Rian', total: 'Rp 126.000', status: 'Lunas' },
  { id: '#TRX-20260405-003', waktu: '09:41', method: 'Tunai', pelanggan: 'Budi Santoso', kasir: 'Eleanor', total: 'Rp 54.000', status: 'Tertunda' },
  { id: '#TRX-20260405-004', waktu: '09:52', method: 'QRIS', pelanggan: 'Maya Lestari', kasir: 'Aldi', total: 'Rp 86.500', status: 'Lunas' },
  { id: '#TRX-20260405-005', waktu: '10:14', method: 'QRIS', pelanggan: 'Devi Anggraini', kasir: 'Rian', total: 'Rp 81.000', status: 'Refund' },
  { id: '#TRX-20260405-006', waktu: '10:46', method: 'Tunai', pelanggan: 'Guest / Walk-in', kasir: 'Aldi', total: 'Rp 43.000', status: 'Lunas' },
];

export default function RiwayatTransaksiPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [method, setMethod] = useState('Semua metode');
  const [cashier, setCashier] = useState('Semua kasir');
  const [status, setStatus] = useState('Semua Status');

  const filteredTransactions = useMemo(() => {
    return MOCK_TRANSACTIONS.filter(trx => {
      const matchesSearch = trx.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           trx.pelanggan.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesMethod = method === 'Semua metode' || trx.method === method;
      const matchesCashier = cashier === 'Semua kasir' || trx.kasir === cashier;
      const matchesStatus = status === 'Semua Status' || trx.status === status;
      
      return matchesSearch && matchesMethod && matchesCashier && matchesStatus;
    });
  }, [searchTerm, method, cashier, status]);

  return (
    <div className="flex flex-col gap-6">
      {/* Stats Cards Row */}
      <StatCards />

      {/* Main Content (Table & Filters) */}
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
    </div>
  );
}

