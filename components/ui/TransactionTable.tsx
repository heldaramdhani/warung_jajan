import React from 'react';
import Link from 'next/link';

const MOCK_TRANSACTIONS = [
  { id: '#TRX-89012', date: '24 Okt 2023, 14:32', cashier: 'Budi Santoso', total: 'Rp 125.000', status: 'Berhasil' },
  { id: '#TRX-89011', date: '24 Okt 2023, 14:15', cashier: 'Budi Santoso', total: 'Rp 45.000', status: 'Berhasil' },
  { id: '#TRX-89010', date: '24 Okt 2023, 13:50', cashier: 'Ayu Lestari', total: 'Rp 320.000', status: 'Berhasil' },
  { id: '#TRX-89009', date: '24 Okt 2023, 13:42', cashier: 'Ayu Lestari', total: 'Rp 15.000', status: 'Berhasil' },
];

export default function TransactionTable() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 w-full mt-6">
      <div className="flex justify-between items-start mb-6 w-full">
        <div>
          <h3 className="text-[15px] font-bold text-slate-800">Transaksi Terbaru</h3>
          <p className="text-[12px] text-slate-400 mt-0.5">Mengambil data dari tabel transaksi & detail_transaksi</p>
        </div>
        <Link href="/dashboard/transaksi" className="text-[12px] font-bold text-[#00A86B] hover:text-[#008f5a]">
          Lihat Semua
        </Link>
      </div>

      <div className="overflow-x-auto w-full">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="pb-3 text-[12px] font-bold text-slate-400 font-sans tracking-wide">ID Referensi</th>
              <th className="pb-3 text-[12px] font-bold text-slate-400 font-sans tracking-wide">Tanggal & Waktu</th>
              <th className="pb-3 text-[12px] font-bold text-slate-400 font-sans tracking-wide">Kasir</th>
              <th className="pb-3 text-[12px] font-bold text-slate-400 font-sans tracking-wide">Total Bayar</th>
              <th className="pb-3 text-[12px] font-bold text-slate-400 font-sans tracking-wide">Status</th>
            </tr>
          </thead>
          <tbody className="text-[13px] font-medium text-slate-700">
            {MOCK_TRANSACTIONS.map((trx, idx) => (
              <tr key={idx} className="border-b border-slate-50 last:border-none hover:bg-slate-50/50 transition-colors">
                <td className="py-4 font-semibold text-slate-600">{trx.id}</td>
                <td className="py-4 text-slate-500">{trx.date}</td>
                <td className="py-4 text-slate-500">{trx.cashier}</td>
                <td className="py-4 font-semibold text-slate-800">{trx.total}</td>
                <td className="py-4">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#d1f4e0] text-[#00a663]">
                    {trx.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
