import React from 'react';

export default function KasirDashboard() {
  return (
    <div className="p-8 min-h-screen bg-[#f8fbf9] flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 text-center max-w-md w-full">
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Kasir Dashboard</h1>
        <p className="text-slate-500 mb-6 text-sm">Selamat datang di antarmuka Kasir. Silakan mulai melayani pelanggan.</p>
        <a href="/login" className="px-4 py-2 bg-slate-100 text-slate-600 rounded-md text-sm font-medium hover:bg-slate-200 transition-colors">Kembali ke Login</a>
      </div>
    </div>
  );
}
