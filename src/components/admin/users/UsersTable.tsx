'use client';

import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/ui/Button';

export interface UserItem {
  id: string;
  fullName: string;
  username: string;
  role: string;
  location: string;
  status: 'Aktif' | 'Nonaktif';
}

interface UsersTableProps {
  users: UserItem[];
  onAction: (action: 'edit' | 'add', user?: UserItem) => void;
}

export function UsersTable({ users, onAction }: UsersTableProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter(user => 
    user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-sm flex flex-col p-6">
      
      {/* Header Actions */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="relative w-full md:max-w-xs">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0f9d58] transition-all text-slate-700 placeholder-slate-400"
            placeholder="Cari User..."
          />
        </div>
        
        <Button 
          variant="primary"
          onClick={() => onAction('add')}
          className="flex items-center gap-2 whitespace-nowrap"
        >
          <span>+</span> Tambah User
        </Button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="py-4 px-2 font-semibold text-slate-500 text-xs tracking-wider w-[20%]">NAMA LENGKAP</th>
              <th className="py-4 px-2 font-semibold text-slate-500 text-xs tracking-wider w-[15%]">USERNAME</th>
              <th className="py-4 px-2 font-semibold text-slate-500 text-xs tracking-wider w-[15%]">ROLE</th>
              <th className="py-4 px-2 font-semibold text-slate-500 text-xs tracking-wider w-[20%]">PENEMPATAN</th>
              <th className="py-4 px-2 font-semibold text-slate-500 text-xs tracking-wider w-[15%]">STATUS</th>
              <th className="py-4 px-2 font-semibold text-slate-500 text-xs tracking-wider w-[15%]">AKSI</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                <td className="py-4 px-2 text-sm font-medium text-slate-800">{user.fullName}</td>
                <td className="py-4 px-2 text-sm text-slate-800">{user.username}</td>
                <td className="py-4 px-2 text-sm text-slate-800">{user.role}</td>
                <td className="py-4 px-2 text-sm text-slate-800">{user.location}</td>
                <td className="py-4 px-2">
                  <span className={`text-sm font-semibold ${user.status === 'Aktif' ? 'text-[#0f9d58]' : 'text-slate-400'}`}>
                    {user.status}
                  </span>
                </td>
                <td className="py-4 px-2">
                  <button 
                    onClick={() => onAction('edit', user)}
                    className="text-sm font-medium text-blue-500 hover:text-blue-700 transition-colors"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan={6} className="py-8 text-center text-slate-500 text-sm">
                  User tidak ditemukan
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
