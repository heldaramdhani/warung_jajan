'use client';

import React, { useState, useEffect } from 'react';
import { Search, Calendar, FileDown, FileSpreadsheet, Loader2 } from 'lucide-react';
import { Button } from '@/ui/Button';
import { LaporanTable, Laporan } from '@/components/admin/laporan/LaporanTable';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function LaporanPage() {
  const [laporanList, setLaporanList] = useState<Laporan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [kasirFilter, setKasirFilter] = useState('Semua Kasir');
  const [metodeFilter, setMetodeFilter] = useState('Metode Pembayaran');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Fetch transactions from API
  useEffect(() => {
    const fetchLaporan = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/transaksi');
        const result = await response.json();
        
        if (result.success && Array.isArray(result.data)) {
          const transformedLaporan = result.data.map((t: any) => {
            // Calculate total items
            const totalItem = t.detail_transaksi.reduce((acc: number, item: any) => acc + item.jumlah, 0);
            
            // Format date: "15 Mar 2026, 14:30"
            const date = new Date(t.created_at || t.tanggal);
            const day = date.getDate().toString().padStart(2, '0');
            const monthNames = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Ags", "Sep", "Okt", "Nov", "Des"];
            const month = monthNames[date.getMonth()];
            const year = date.getFullYear();
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            const formattedDate = `${day} ${month} ${year}, ${hours}:${minutes}`;

            // Map payment method
            let method: 'QRIS' | 'Tunai' | 'Debit' = 'Tunai';
            if (t.metode_pembayaran === 'QRIS') method = 'QRIS';
            else if (t.metode_pembayaran === 'DEBIT' || t.metode_pembayaran === 'Debit') method = 'Debit';
            else if (t.metode_pembayaran === 'CASH' || t.metode_pembayaran === 'Tunai') method = 'Tunai';

            return {
              id: t.kode_transaksi || `#TRX-${t.id.substring(0, 8)}`,
              tanggalWaktu: formattedDate,
              namaKasir: t.users?.nama || 'Unknown',
              metodePembayaran: method,
              totalItem: totalItem,
              totalBayar: `Rp ${t.total.toLocaleString('id-ID')}`
            };
          });
          setLaporanList(transformedLaporan);
        }
      } catch (error) {
        console.error('Failed to fetch laporan:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLaporan();
  }, []);

  const filteredLaporan = laporanList.filter((item) => {
    const matchSearch = item.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchKasir = kasirFilter === 'Semua Kasir' || item.namaKasir === kasirFilter;
    const matchMetode = metodeFilter === 'Metode Pembayaran' || item.metodePembayaran === metodeFilter;
    
    let matchDate = true;
    if (startDate || endDate) {
      // Parse "15 Mar 2026, 14:30" ke timestamp sederhana
      // Karena format bulannya text, kita buat parser sederhana untuk bulan Indonesia/Inggris
      const months: Record<string, string> = { "Jan": "01", "Feb": "02", "Mar": "03", "Apr": "04", "Mei": "05", "Jun": "06", "Jul": "07", "Ags": "08", "Sep": "09", "Okt": "10", "Nov": "11", "Des": "12" };
      const parts = item.tanggalWaktu.split(',')[0].split(' '); // ["15", "Mar", "2026"]
      if (parts.length === 3) {
        const itemDateStr = `${parts[2]}-${months[parts[1]] || '01'}-${parts[0].padStart(2, '0')}`;
        const itemDate = new Date(itemDateStr);
        const start = startDate ? new Date(startDate) : new Date('2000-01-01');
        const end = endDate ? new Date(endDate) : new Date('2100-01-01');
        matchDate = itemDate >= start && itemDate <= end;
      }
    }

    return matchSearch && matchKasir && matchMetode && matchDate;
  });

  const totalItemKeseluruhan = filteredLaporan.reduce((acc, curr) => acc + curr.totalItem, 0);
  const totalPendapatanNum = filteredLaporan.reduce((acc, curr) => {
    const numericPrice = parseInt(curr.totalBayar.replace(/[^0-9]/g, ''), 10) || 0;
    return acc + numericPrice;
  }, 0);
  const totalPendapatanStr = `Rp ${totalPendapatanNum.toLocaleString('id-ID').replace(/,/g, '.')}`;

  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredLaporan.map(item => ({
      'ID Transaksi': item.id,
      'Tanggal & Waktu': item.tanggalWaktu,
      'Nama Kasir': item.namaKasir,
      'Metode Pembayaran': item.metodePembayaran,
      'Total Item': item.totalItem,
      'Total Bayar': item.totalBayar
    })));
    const workbook = XLSX.utils.book_new();
    XLSX.writeFile(workbook, "LaporanTransaksi_WarungJajan.xlsx");
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Laporan Transaksi", 14, 15);
    doc.setFontSize(10);
    doc.text(`Periode: ${startDate || 'Awal'} s.d. ${endDate || 'Sekarang'}`, 14, 22);
    
    const tableColumn = ["ID Transaksi", "Tanggal & Waktu", "Nama Kasir", "Metode Pembayaran", "Total Item", "Total Bayar"];
    const tableRows = filteredLaporan.map(item => [
      item.id,
      item.tanggalWaktu,
      item.namaKasir,
      item.metodePembayaran,
      item.totalItem,
      item.totalBayar
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 25,
      theme: 'grid',
      headStyles: { fillColor: [15, 157, 88] } // Warna hijau warung jajan
    });

    doc.save("Laporan_Transaksi_Warung_Jajan.pdf");
  };

  const filterSelectClass = "appearance-none px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-[#0f9d58]";
  const filterSelectStyle = { 
    backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%2394a3b8\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'%3E%3C/path%3E%3C/svg%3E")', 
    backgroundPosition: 'right 12px center', 
    backgroundRepeat: 'no-repeat', 
    backgroundSize: '16px', 
    paddingRight: '40px' 
  };

  return (
    <div className="flex flex-col gap-4 w-full pb-8 relative mt-2">
      {/* Action & Filter Bar */}
      <div className="flex flex-col xl:flex-row gap-4 xl:justify-between xl:items-center bg-white p-4 rounded-2xl border border-slate-100">
        
        {/* Filters */}
        <div className="flex flex-wrap gap-3">
          <div className="relative w-[180px]">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0f9d58] transition-all text-slate-700 placeholder-slate-400"
              placeholder="Cari ID Transaksi..."
            />
          </div>
          
          <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg px-3 py-1.5 focus-within:ring-2 focus-within:ring-[#0f9d58] transition-all">
            <Calendar size={16} className="text-slate-400" />
            <input 
              type="date" 
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="text-sm text-slate-600 bg-transparent focus:outline-none"
            />
            <span className="text-slate-400 text-sm">-</span>
            <input 
              type="date" 
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="text-sm text-slate-600 bg-transparent focus:outline-none"
            />
          </div>

          <select 
            value={kasirFilter}
            onChange={(e) => setKasirFilter(e.target.value)}
            className={filterSelectClass} 
            style={filterSelectStyle}
          >
            <option value="Semua Kasir">Semua Kasir</option>
            <option value="Budi Santoso">Budi Santoso</option>
            <option value="Siti Aminah">Siti Aminah</option>
          </select>

          <select 
            value={metodeFilter}
            onChange={(e) => setMetodeFilter(e.target.value)}
            className={filterSelectClass} 
            style={filterSelectStyle}
          >
            <option value="Metode Pembayaran">Metode Pembayaran</option>
            <option value="QRIS">QRIS</option>
            <option value="Tunai">Tunai</option>
            <option value="Debit">Debit</option>
          </select>

          {/* TOMBOL PDF JADI MERAH */}
          <Button 
            className="gap-2 bg-red-600 text-white hover:bg-red-700 border border-red-700" 
            onClick={handleDownloadPDF}
          >
            <FileDown size={16} />
            PDF
          </Button>

          <Button variant="primary" className="gap-2" onClick={handleExportExcel}>
            <FileSpreadsheet size={16} />
            Excel
          </Button>
        </div>
      </div>

      {/* Data Table */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white border border-slate-100 rounded-2xl">
          <Loader2 className="h-8 w-8 text-[#0f9d58] animate-spin mb-4" />
          <p className="text-slate-500 font-medium">Memuat data laporan...</p>
        </div>
      ) : (
        <LaporanTable 
          data={filteredLaporan} 
          totalPendapatan={totalPendapatanStr} 
          totalItemKeseluruhan={totalItemKeseluruhan} 
        />
      )}
    </div>
  );
}

// Inline helper for ChevronDown
function ChevronDownIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#94a3b8" className="w-4 h-4 ml-1">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
    </svg>
  );
}
