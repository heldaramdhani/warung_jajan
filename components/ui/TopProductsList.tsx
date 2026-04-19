import React from "react";

const MOCK_PRODUCTS = [
  { name: "Kopi Susu", quantity: 142, percentage: 85 },
  { name: "Roti Bakar", quantity: 98, percentage: 65 },
  { name: "Es Teh Manis", quantity: 84, percentage: 55 },
  { name: "Mie Goreng", quantity: 56, percentage: 35 },
  { name: "Nasi Gila", quantity: 31, percentage: 20 },
];
const TOP_PRODUCTS = MOCK_PRODUCTS.slice(0, 3);

export default function TopProductsList() {
  return (
    <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-200 w-full">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-slate-900">
          Produk Paling Laris
        </h3>
        <p className="text-[11px] text-slate-500 mt-1">
          Menampilkan 3 produk teratas
        </p>
      </div>

      <div className="space-y-3">
        {TOP_PRODUCTS.map((prod, idx) => (
          <div
            key={idx}
            className="rounded-3xl border border-slate-100 bg-slate-50 p-3"
          >
            <div className="flex items-center gap-3">
              <div className="min-w-[90px]">
                <span className="block text-[13px] font-medium text-slate-800 truncate">
                  {prod.name}
                </span>
                <span className="block text-[11px] text-slate-500 mt-1">
                  {prod.percentage}% terjual
                </span>
              </div>
              <div className="flex-1 h-2 rounded-full bg-slate-200 overflow-hidden">
                <div
                  className={`h-full rounded-full ${idx === 0 ? "bg-[#00A86B]" : "bg-[#4ad1a0] opacity-90"}`}
                  style={{ width: `${prod.percentage}%` }}
                />
              </div>
              <span className="text-[13px] font-semibold text-slate-900">
                {prod.quantity}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
