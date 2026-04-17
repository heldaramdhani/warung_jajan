import React from 'react';

const MOCK_PRODUCTS = [
  { name: 'Kopi Susu', quantity: 142, percentage: 85 },
  { name: 'Roti Bakar', quantity: 98, percentage: 65 },
  { name: 'Es Teh Manis', quantity: 84, percentage: 55 },
  { name: 'Mie Goreng', quantity: 56, percentage: 35 },
  { name: 'Nasi Gila', quantity: 31, percentage: 20 },
];

export default function TopProductsList() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col h-full">
      <div className="mb-6">
        <h3 className="text-[15px] font-bold text-slate-800">Produk Paling Laris</h3>
        <p className="text-[12px] text-slate-400 mt-0.5">Berdasarkan kuantitas terjual</p>
      </div>

      <div className="flex flex-col gap-4 flex-1 justify-center">
        {MOCK_PRODUCTS.map((prod, idx) => (
          <div key={idx} className="flex items-center justify-between">
            <span className="text-[13px] font-medium text-slate-700 w-24 truncate">{prod.name}</span>
            <div className="flex-1 mx-4 h-2 bg-slate-100 rounded-full overflow-hidden flex">
               <div 
                 className={`h-full rounded-full ${idx === 0 ? 'bg-[#00A86B]' : 'bg-[#4ad1a0] opacity-80'}`} 
                 style={{ width: `${prod.percentage}%` }}
               />
            </div>
            <span className="text-[13px] font-bold text-slate-800 tracking-tight">{prod.quantity}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
