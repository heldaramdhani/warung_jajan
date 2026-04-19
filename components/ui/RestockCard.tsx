import React from "react";
import { Package, ArrowUpRight } from "lucide-react";

const RESTOCK_ITEMS = [
  { name: "Kopi Susu", status: "Kritis", stock: 2 },
  { name: "Roti Bakar", status: "Segera restock", stock: 5 },
  { name: "Es Teh Manis", status: "Hampir habis", stock: 3 },
];

export default function RestockCard() {
  return (
    <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-200 w-full">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-slate-900">Restock Barang</p>
          <p className="text-[11px] text-slate-500 mt-1">
            Menampilkan 2 dari 3 barang yang perlu restok
          </p>
        </div>
        <div className="rounded-2xl bg-[#E6F6EE] p-2 text-[#0F766E]">
          <Package className="w-4 h-4" />
        </div>
      </div>

      <div className="space-y-3">
        {RESTOCK_ITEMS.slice(0, 2).map((item) => (
          <div
            key={item.name}
            className="rounded-3xl border border-slate-100 bg-slate-50 p-3"
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <h4 className="text-sm font-semibold text-slate-900">
                  {item.name}
                </h4>
                <p className="text-[11px] text-slate-500 mt-1">{item.status}</p>
              </div>
              <span className="text-[12px] font-semibold text-slate-700">
                {item.stock} pcs
              </span>
            </div>
          </div>
        ))}
      </div>

      <button className="mt-4 w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-[#0F766E] py-2 text-sm font-semibold text-white transition hover:bg-[#0d5f58]">
        Restok Sekarang
        <ArrowUpRight className="w-4 h-4" />
      </button>
    </div>
  );
}
