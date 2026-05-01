import React from 'react';
import LoginForm from '@/components/auth/LoginForm';

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
      <LoginForm />

      {/* Footer */}
      <div className="absolute bottom-5 left-0 right-0 text-center">
        <p className="text-[11px] font-semibold text-slate-400 tracking-wider">
          © 2026 WARUNG JAJAN. ALL RIGHTS RESERVED.
        </p>
      </div>
    </div>
  );
}
