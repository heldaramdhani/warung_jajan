"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Mail,
  Lock,
  ArrowRight,
  Loader2,
} from "lucide-react";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    // Validasi sederhana: Cek jika input email dan password kosong
    if (!email.trim() || !password.trim()) {
      setErrorMsg("Email dan Password wajib diisi sebelum login!");
      return;
    }

    setIsLoading(true);

    try {
      // Melakukan request HTTP POST ke endpoint backend
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Tampilkan pesan error langsung dari backend API
        setErrorMsg(data.message || "Gagal masuk. Silakan coba lagi.");
        setIsLoading(false);
        return;
      }

      // Tampilkan flash message sukses
      setSuccessMsg(data.message || "Login berhasil!");
      
      // Jika berhasil, tunggu sejenak lalu alihkan ke route berdasarkan role
      setTimeout(() => {
        router.push(data.data?.role === "kasir" ? "/kasir" : "/admin");
      }, 1500);
      
    } catch (error) {
      setErrorMsg("Koneksi ke server terputus. Cek internet Anda.");
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-[420px] bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] px-8 py-6 flex flex-col items-center z-10">
      {/* Header */}
      <h1 className="text-[26px] font-bold text-slate-800 mb-2 tracking-tight">
        LOGIN
      </h1>
      <p className="text-[12px] text-slate-500 text-center leading-relaxed px-4 mb-4 w-[90%]">
        Login admin atau kasir baru untuk mulai mengakses sistem operasional
        POS.
      </p>

      {/* Pesan Error (Toast Sederhana) */}
      {errorMsg && (
        <div className="w-full bg-red-50 text-red-500 text-[12px] p-2.5 rounded-md mb-4 text-center font-medium border border-red-100 flex items-center justify-center animate-in fade-in slide-in-from-top-1">
          {errorMsg}
        </div>
      )}

      {/* Pesan Sukses (Toast Sederhana) */}
      {successMsg && (
        <div className="w-full bg-[#ECFDF5] text-[#00A86B] text-[12px] p-2.5 rounded-md mb-4 text-center font-medium border border-[#A7F3D0] flex items-center justify-center animate-in fade-in slide-in-from-top-1">
          {successMsg}
        </div>
      )}

      {/* Form Container */}
      <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
        {/* Email */}
        <div className="space-y-1.5">
          <label className="block text-[11px] font-bold text-slate-700 tracking-wider">
            EMAIL
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#f1f5f9] h-10 rounded-md pl-9 pr-3 text-[12px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#00a663] placeholder:text-[11px] placeholder:text-slate-400 transition-all font-medium border-none"
              placeholder="contoh@email.com"
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <label className="block text-[11px] font-bold text-slate-700 tracking-wider">
            PASSWORD
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#f1f5f9] h-10 rounded-md pl-9 pr-3 text-[12px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#00a663] placeholder:text-[11px] placeholder:text-slate-400 transition-all font-medium tracking-[0.2em] border-none"
              placeholder="••••••••"
            />
          </div>
        </div>

        {/* Checkbox and Agreement */}
        <div className="flex items-center gap-2.5 mt-0.5 cursor-pointer">
          <input
            type="checkbox"
            id="agreement"
            className="w-4 h-4 rounded-[3px] border-slate-300 text-[#00a663] focus:ring-[#00a663] accent-[#00a663] bg-white cursor-pointer"
          />
          <label
            htmlFor="agreement"
            className="text-[12px] text-slate-500 font-medium cursor-pointer select-none"
          >
            Saya setuju dengan kebijakan penggunaan sistem
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full h-10 bg-[#00A86B] hover:bg-[#00965e] disabled:opacity-75 disabled:cursor-not-allowed text-white font-bold text-[13px] tracking-wide rounded-md flex items-center justify-center gap-2 transition-all mt-1.5"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin text-white" />{" "}
              MEMPROSES...
            </>
          ) : (
            <>
              LOGIN <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
