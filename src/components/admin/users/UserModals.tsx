import React, { useState, useEffect } from 'react';
import { Modal } from '@/ui/Modal';
import { Input } from '@/ui/Input';
import { Button } from '@/ui/Button';
import { UserItem } from './UsersTable';

interface UserModalsProps {
  isAddOpen: boolean;
  setIsAddOpen: (open: boolean) => void;
  submitAddUser: (user: Omit<UserItem, 'id'>) => void;
  isEditOpen: boolean;
  setIsEditOpen: (open: boolean) => void;
  selectedUser: UserItem | null;
  submitEditUser: (user: UserItem) => void;
}

export function UserModals({
  isAddOpen, setIsAddOpen, submitAddUser,
  isEditOpen, setIsEditOpen, selectedUser, submitEditUser
}: UserModalsProps) {
  const [editForm, setEditForm] = useState<UserItem | null>(null);
  
  const [addForm, setAddForm] = useState({
    fullName: '',
    username: '',
    role: 'Kasir',
    location: '',
    status: 'Aktif' as 'Aktif' | 'Nonaktif'
  });

  useEffect(() => {
    if (selectedUser && isEditOpen) {
      setEditForm({ ...selectedUser });
    }
  }, [selectedUser, isEditOpen]);

  useEffect(() => {
    if (isAddOpen) {
      setAddForm({
        fullName: '',
        username: '',
        role: 'Kasir',
        location: '',
        status: 'Aktif'
      });
    }
  }, [isAddOpen]);

  return (
    <>
      <Modal 
        isOpen={isAddOpen} 
        onClose={() => setIsAddOpen(false)}
        title={null}
      >
        <div className="flex flex-col text-slate-700">
          <div className="text-center pb-3 border-b border-dashed border-slate-300 mb-4">
            <h2 className="text-lg font-bold text-slate-800">Tambah User Baru</h2>
          </div>
          
          <div className="flex flex-col gap-4">
            <Input 
              label="Nama Lengkap" 
              value={addForm.fullName}
              onChange={(e) => setAddForm({ ...addForm, fullName: e.target.value })}
            />
            
            <Input 
              label="Username" 
              value={addForm.username}
              onChange={(e) => setAddForm({ ...addForm, username: e.target.value })}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-700">Role</label>
                <select 
                  value={addForm.role}
                  onChange={(e) => setAddForm({ ...addForm, role: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f9d58]"
                >
                  <option value="Kasir">Kasir</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
              
              <Input 
                label="Penempatan" 
                value={addForm.location}
                onChange={(e) => setAddForm({ ...addForm, location: e.target.value })}
              />
            </div>
            
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-700">Status</label>
              <select 
                value={addForm.status}
                onChange={(e) => setAddForm({ ...addForm, status: e.target.value as 'Aktif' | 'Nonaktif' })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f9d58]"
              >
                <option value="Aktif">Aktif</option>
                <option value="Nonaktif">Nonaktif</option>
              </select>
            </div>
            
            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <Button variant="secondary" onClick={() => setIsAddOpen(false)}>
                Batal
              </Button>
              <Button onClick={() => submitAddUser(addForm)} className="bg-[#0f9d58] text-white hover:bg-[#0b8043]">
                Simpan
              </Button>
            </div>
          </div>
        </div>
      </Modal>

      <Modal 
        isOpen={isEditOpen} 
        onClose={() => setIsEditOpen(false)}
        title={null}
      >
      {editForm && (
        <div className="flex flex-col text-slate-700">
          <div className="text-center pb-3 border-b border-dashed border-slate-300 mb-4">
            <h2 className="text-lg font-bold text-slate-800">Edit User</h2>
          </div>
          
          <div className="flex flex-col gap-4">
            <Input 
              label="Nama Lengkap" 
              value={editForm.fullName}
              onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
            />
            
            <Input 
              label="Username" 
              value={editForm.username}
              onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
            />
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-slate-700">Role</label>
                <select 
                  value={editForm.role}
                  onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f9d58]"
                >
                  <option value="Kasir">Kasir</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
              
              <Input 
                label="Penempatan" 
                value={editForm.location}
                onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
              />
            </div>
            
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-700">Status</label>
              <select 
                value={editForm.status}
                onChange={(e) => setEditForm({ ...editForm, status: e.target.value as 'Aktif' | 'Nonaktif' })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:outline-none focus:ring-2 focus:ring-[#0f9d58]"
              >
                <option value="Aktif">Aktif</option>
                <option value="Nonaktif">Nonaktif</option>
              </select>
            </div>
            
            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <Button variant="secondary" onClick={() => setIsEditOpen(false)}>
                Batal
              </Button>
              <Button onClick={() => submitEditUser(editForm)} className="bg-[#0f9d58] text-white hover:bg-[#0b8043]">
                Simpan
              </Button>
            </div>
          </div>
        </div>
      )}
    </Modal>
    </>
  );
}
