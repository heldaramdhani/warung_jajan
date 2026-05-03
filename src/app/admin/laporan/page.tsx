'use client';

import React, { useState } from 'react';
import { Search, Calendar, FileDown, FileSpreadsheet } from 'lucide-react';
import { Button } from '@/ui/Button';
import { LaporanTable, Laporan } from '@/components/admin/laporan/LaporanTable';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const mockLaporan: Laporan[] = [
  {
    id: '#TRX-10021',
    tanggalWaktu: '15 Mar 2026, 14:30',
    namaKasir: 'Budi Santoso',
    metodePembayaran: 'QRIS',
    totalItem: 4,
    totalBayar: 'Rp 125.000'
  },
  {
    id: '#TRX-10022',
    tanggalWaktu: '15 Mar 2026, 14:45',
    namaKasir: 'Budi Santoso',
    metodePembayaran: 'Tunai',
    totalItem: 2,
    totalBayar: 'Rp 45.000'
  },
  {
    id: '#TRX-10023',
    tanggalWaktu: '15 Mar 2026, 15:10',
    namaKasir: 'Siti Aminah',
    metodePembayaran: 'Debit',
    totalItem: 8,
    totalBayar: 'Rp 340.000'
  },
  {
    id: '#TRX-10024',
    tanggalWaktu: '15 Mar 2026, 15:25',
    namaKasir: 'Budi Santoso',
    metodePembayaran: 'QRIS',
    totalItem: 1,
    totalBayar: 'Rp 15.000'
  },
  {
    id: '#TRX-10025',
    tanggalWaktu: '15 Mar 2026, 16:00',
    namaKasir: 'Siti Aminah',
    metodePembayaran: 'Tunai',
    totalItem: 3,
    totalBayar: 'Rp 78.000'
  },
  {
    id: '#TRX-10026',
    tanggalWaktu: '15 Mar 2026, 16:15',
    namaKasir: 'Siti Aminah',
    metodePembayaran: 'QRIS',
    totalItem: 5,
    totalBayar: 'Rp 210.000'
  }
];

export default function LaporanPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [kasirFilter, setKasirFilter] = useState('Semua Kasir');
  const [metodeFilter, setMetodeFilter] = useState('Metode Pembayaran');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const filteredLaporan = mockLaporan.filter((item) => {
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
      <LaporanTable 
        data={filteredLaporan} 
        totalPendapatan={totalPendapatanStr} 
        totalItemKeseluruhan={totalItemKeseluruhan} 
      />
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
