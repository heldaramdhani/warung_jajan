'use client';

import React, { useState } from 'react';
import { UsersTable, UserItem } from '@/components/admin/users/UsersTable';
import { UserModals } from '@/components/admin/users/UserModals';

const initialUsers: UserItem[] = [
  {
    id: 'u1',
    fullName: 'Budi Santoso',
    username: 'budi_kasir',
    role: 'Kasir',
    location: 'Cabang Surabaya',
    status: 'Aktif'
  },
  {
    id: 'u2',
    fullName: 'Andi Kurniawan',
    username: 'andi_admin',
    role: 'Admin',
    location: 'Gudang Pusat',
    status: 'Aktif'
  },
  {
    id: 'u3',
    fullName: 'Andi Kurniawan',
    username: 'andi_admin',
    role: 'Admin',
    location: 'Gudang Pusat',
    status: 'Aktif'
  },
  {
    id: 'u4',
    fullName: 'Andi Kurniawan',
    username: 'andi_admin',
    role: 'Admin',
    location: 'Gudang Pusat',
    status: 'Aktif'
  },
  {
    id: 'u5',
    fullName: 'Andi Kurniawan',
    username: 'andi_admin',
    role: 'Admin',
    location: 'Gudang Pusat',
    status: 'Aktif'
  }
];

export default function UsersPage() {
  const [users, setUsers] = useState<UserItem[]>(initialUsers);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserItem | null>(null);

  const handleAction = (action: 'edit' | 'add', user?: UserItem) => {
    if (action === 'add') {
      setIsAddOpen(true);
    } else if (action === 'edit' && user) {
      setSelectedUser(user);
      setIsEditOpen(true);
    }
  };

  const submitAddUser = (newUser: Omit<UserItem, 'id'>) => {
    const id = `u${Date.now()}`;
    setUsers([{ ...newUser, id }, ...users]);
    setIsAddOpen(false);
  };

  const submitEditUser = (updatedUser: UserItem) => {
    setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
    setIsEditOpen(false);
  };

  return (
    <div className="flex flex-col gap-6 w-full pb-8 pt-2">
      {/* Main Table Component */}
      <UsersTable users={users} onAction={handleAction} />

      <UserModals 
        isAddOpen={isAddOpen}
        setIsAddOpen={setIsAddOpen}
        submitAddUser={submitAddUser}
        isEditOpen={isEditOpen} 
        setIsEditOpen={setIsEditOpen} 
        selectedUser={selectedUser} 
        submitEditUser={submitEditUser} 
      />
    </div>
  );
}
