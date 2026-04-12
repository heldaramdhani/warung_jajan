"use client";

import React from 'react';
import { User, IdCard, Mail, Lock, RotateCcw, ChevronDown, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8fbf9] relative font-sans">
      {/* Top Left Logo / Title */}
      <div className="absolute top-8 left-10">
        <h2 className="text-[22px] font-bold text-slate-800 tracking-tight">
          Warung Jajan
        </h2>
      </div>

      {/* Main Login Card */}
      <div className="w-[580px] bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-12 flex flex-col items-center z-10">
        {/* Header */}
        <h1 className="text-[32px] font-bold text-slate-800 mb-3 tracking-tight">LOGIN</h1>
        <p className="text-[14px] text-slate-500 text-center leading-relaxed px-4 mb-10 w-[90%]">
          Login admin atau kasir baru untuk mulai mengakses sistem operasional POS.
        </p>

        {/* Form Container */}
        <form className="w-full flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
          {/* Row 1: Name and Role */}
          <div className="grid grid-cols-2 gap-5">
            {/* Nama Lengkap */}
            <div className="space-y-2.5">
              <label className="block text-[12px] font-bold text-slate-700 tracking-wider">
                NAMA LENGKAP
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  className="w-full bg-[#f1f5f9] h-11 rounded-md pl-10 pr-3 text-[14px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#00a663] placeholder:text-slate-400 transition-all font-medium border-none"
                  placeholder="Masukkan nama"
                />
              </div>
            </div>

            {/* Role Akun */}
            <div className="space-y-2.5">
              <label className="block text-[12px] font-bold text-slate-700 tracking-wider">
                ROLE AKUN
              </label>
              <div className="relative">
                <IdCard className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <select
                  className="w-full bg-[#f1f5f9] h-11 rounded-md pl-10 pr-10 text-[14px] text-slate-800 appearance-none focus:outline-none focus:ring-2 focus:ring-[#00a663] transition-all font-medium border-none cursor-pointer"
                  defaultValue=""
                >
                  <option value="" disabled className="text-slate-400">
                    Pilih role
                  </option>
                  <option value="admin">Admin</option>
                  <option value="kasir">Kasir</option>
                </select>
                <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Row 2: Email */}
          <div className="space-y-2.5">
            <label className="block text-[12px] font-bold text-slate-700 tracking-wider">
              EMAIL
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="email"
                className="w-full bg-[#f1f5f9] h-11 rounded-md pl-10 pr-3 text-[14px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#00a663] placeholder:text-slate-400 transition-all font-medium border-none"
                placeholder="contoh@email.com"
              />
            </div>
          </div>

          {/* Row 3: Passwords */}
          <div className="grid grid-cols-2 gap-5">
            {/* Password */}
            <div className="space-y-2.5">
              <label className="block text-[12px] font-bold text-slate-700 tracking-wider">
                PASSWORD
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  className="w-full bg-[#f1f5f9] h-11 rounded-md pl-10 pr-3 text-[14px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#00a663] placeholder:text-slate-400 transition-all font-medium tracking-[0.2em] border-none"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Konfirmasi Password */}
            <div className="space-y-2.5">
              <label className="block text-[12px] font-bold text-slate-700 tracking-wider">
                KONFIRMASI PASSWORD
              </label>
              <div className="relative">
                <RotateCcw className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  className="w-full bg-[#f1f5f9] h-11 rounded-md pl-10 pr-3 text-[14px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#00a663] placeholder:text-slate-400 transition-all font-medium tracking-[0.2em] border-none"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          {/* Checkbox and Agreement */}
          <div className="flex items-center gap-3 mt-1 cursor-pointer">
            <input
              type="checkbox"
              id="agreement"
              className="w-[18px] h-[18px] rounded-[4px] border-slate-300 text-[#00a663] focus:ring-[#00a663] accent-[#00a663] bg-white cursor-pointer"
            />
            <label
              htmlFor="agreement"
              className="text-[13px] text-slate-500 font-medium cursor-pointer select-none"
            >
              Saya setuju dengan kebijakan penggunaan sistem
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full h-12 bg-[#00A86B] hover:bg-[#00965e] text-white font-bold text-[14px] tracking-wide rounded-md flex items-center justify-center gap-2 transition-colors mt-2"
          >
            LOGIN <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* Footer */}
      <div className="absolute bottom-10 left-0 right-0 text-center">
        <p className="text-[11px] font-semibold text-slate-400 tracking-wider">
          © 2026 WARUNG JAJAN. ALL RIGHTS RESERVED.
        </p>
      </div>
    </div>
  );
}
