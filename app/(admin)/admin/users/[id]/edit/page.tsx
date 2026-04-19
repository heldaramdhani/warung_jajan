import React from "react";

interface EditUserPageProps {
  params: { id: string };
}

export default function EditUserPage({ params }: EditUserPageProps) {
  return (
    <div className="max-w-6xl mx-auto space-y-4 py-6">
      <h1 className="text-2xl font-semibold text-slate-900">
        Edit User {params.id}
      </h1>
      <p className="text-sm text-slate-500">
        Halaman ini digunakan untuk mengedit data user staff tertentu.
      </p>
    </div>
  );
}
