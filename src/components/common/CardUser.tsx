import React from 'react';

export interface CardUserProps {
  name: string;
  role: string;
  initial?: string;
  avatarUrl?: string;
}

export function CardUser({ name, role, initial = 'U', avatarUrl }: CardUserProps) {
  return (
    <div className="flex items-center gap-3 text-left">
      <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center overflow-hidden">
        {avatarUrl ? (
          <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
        ) : (
          <span className="text-sm font-medium text-slate-500">{initial}</span>
        )}
      </div>
      <div>
        <div className="text-sm font-bold text-slate-800">{name}</div>
        <div className="text-xs text-slate-400">{role}</div>
      </div>
    </div>
  );
}
