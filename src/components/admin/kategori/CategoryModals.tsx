import React from 'react';
import { Modal } from '../../../ui/Modal';
import { Input } from '../../../ui/Input';
import { Button } from '../../../ui/Button';
import { Category } from './CategoryTable';

interface CategoryModalsProps {
  // Add Modal State
  isAddOpen: boolean;
  setIsAddOpen: (open: boolean) => void;
  addForm: any;
  setAddForm: React.Dispatch<React.SetStateAction<any>>;
  submitAddCategory: () => void;

  // Edit Modal State
  isEditOpen: boolean;
  setIsEditOpen: (open: boolean) => void;
  selectedCategory: Category | null;
  setSelectedCategory: React.Dispatch<React.SetStateAction<Category | null>>;
  submitEditCategory: () => void;

  // Delete Modal State
  isDeleteOpen: boolean;
  setIsDeleteOpen: (open: boolean) => void;
  submitDeleteCategory: () => void;
}

export function CategoryModals({
  isAddOpen, setIsAddOpen, addForm, setAddForm, submitAddCategory,
  isEditOpen, setIsEditOpen, selectedCategory, setSelectedCategory, submitEditCategory,
  isDeleteOpen, setIsDeleteOpen, submitDeleteCategory
}: CategoryModalsProps) {

  return (
    <>
      {/* Add Category Modal */}
      <Modal 
        isOpen={isAddOpen} 
        onClose={() => setIsAddOpen(false)}
        title={null}
      >
        <div className="flex flex-col text-slate-700">
          <div className="text-center pb-3 border-b border-dashed border-slate-300 mb-4">
            <h2 className="text-lg font-bold text-slate-800">Tambah Kategori Baru</h2>
          </div>
          <div className="flex flex-col gap-4">
          <Input 
            label="Nama Kategori" 
            value={addForm.name}
            onChange={(e) => setAddForm({ ...addForm, name: e.target.value })}
            placeholder="Contoh: Dimsum" 
          />
          
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <Button 
              variant="secondary"
              onClick={() => setIsAddOpen(false)}
            >
              Batal
            </Button>
            <Button 
              variant="primary"
              onClick={submitAddCategory}
            >
              Simpan Kategori
            </Button>
          </div>
        </div>
      </div>
      </Modal>

      {/* Edit Category Modal */}
      <Modal 
        isOpen={isEditOpen} 
        onClose={() => {
          setIsEditOpen(false);
          setSelectedCategory(null);
        }}
        title={null}
      >
        {selectedCategory && (
          <div className="flex flex-col text-slate-700">
            <div className="text-center pb-3 border-b border-dashed border-slate-300 mb-4">
              <h2 className="text-lg font-bold text-slate-800">Edit Kategori</h2>
            </div>
            <div className="flex flex-col gap-4">
            <Input 
              label="Nama Kategori" 
              value={selectedCategory.name}
              onChange={(e) => setSelectedCategory({ ...selectedCategory, name: e.target.value })}
              placeholder="Contoh: Dimsum" 
            />
            
            <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
              <Button 
                variant="secondary"
                onClick={() => {
                  setIsEditOpen(false);
                  setSelectedCategory(null);
                }}
              >
                Batal
              </Button>
              <Button 
                variant="primary"
                onClick={submitEditCategory}
              >
                Simpan Perubahan
              </Button>
            </div>
          </div>
        </div>
        )}
      </Modal>

      {/* Delete Category Modal */}
      <Modal 
        isOpen={isDeleteOpen} 
        onClose={() => {
          setIsDeleteOpen(false);
          setSelectedCategory(null);
        }}
        title={null}
      >
        {selectedCategory && (
          <div className="flex flex-col text-slate-700">
            <div className="text-center pb-3 border-b border-dashed border-slate-300 mb-4">
              <h2 className="text-lg font-bold text-red-600">Hapus Kategori</h2>
            </div>
            <p className="text-slate-600 text-sm text-center mb-6">
              Apakah Anda yakin ingin menghapus kategori <br/>
              <span className="font-bold text-slate-800 text-base block mt-2">🏷️ {selectedCategory.name}</span>
              <span className="text-xs text-red-500 mt-2 block italic">Peringatan: Produk dengan kategori ini mungkin terdampak.</span>
            </p>
            <div className="flex justify-center gap-3 pt-4 border-t border-slate-100">
              <Button 
                variant="secondary"
                onClick={() => {
                  setIsDeleteOpen(false);
                  setSelectedCategory(null);
                }}
                className="px-6"
              >
                Batal
              </Button>
              <Button 
                variant="danger"
                onClick={submitDeleteCategory}
                className="px-6"
              >
                Ya, Hapus
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
