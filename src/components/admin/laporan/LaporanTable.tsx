import React from 'react';
import { Badge } from '@/ui/Badge';

export interface Laporan {
  id: string;
  tanggalWaktu: string;
  namaKasir: string;
  metodePembayaran: 'QRIS' | 'Tunai' | 'Debit';
  totalItem: number;
  totalBayar: string;
}

interface LaporanTableProps {
  data: Laporan[];
  totalPendapatan: string;
  totalItemKeseluruhan: number;
}

export function LaporanTable({ data, totalPendapatan, totalItemKeseluruhan }: LaporanTableProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden mt-6">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">ID Transaksi</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Tanggal & Waktu</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Nama Kasir</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider">Metode Pembayaran</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Total Item</th>
              <th className="py-4 px-6 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Total Bayar</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-slate-500">Data tidak ditemukan</td>
              </tr>
            ) : (
              data.map((row) => (
                <tr key={row.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-6 text-sm font-bold text-slate-800">{row.id}</td>
                  <td className="py-4 px-6 text-sm text-slate-600">{row.tanggalWaktu}</td>
                  <td className="py-4 px-6 text-sm text-slate-600">{row.namaKasir}</td>
                  <td className="py-4 px-6">
                    <Badge variant={
                      row.metodePembayaran === 'QRIS' ? 'info' : 
                      row.metodePembayaran === 'Tunai' ? 'success' : 'purple'
                    }>
                      {row.metodePembayaran}
                    </Badge>
                  </td>
                  <td className="py-4 px-6 text-sm text-slate-600 text-right">{row.totalItem} item</td>
                  <td className="py-4 px-6 text-sm font-bold text-slate-800 text-right">{row.totalBayar}</td>
                </tr>
              ))
            )}
          </tbody>
          <tfoot>
            <tr className="bg-[#0f9d58] text-white">
              <td colSpan={4} className="py-4 px-6 text-sm font-medium text-right">
                Total Pendapatan
              </td>
              <td className="py-4 px-6 text-sm font-medium text-right">
                {totalItemKeseluruhan} item
              </td>
              <td className="py-4 px-6 text-sm font-bold text-right">
                {totalPendapatan}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
