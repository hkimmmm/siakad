import MainLayout from '../../layouts/MainLayout';
import RoleTable from '../../fragments/RoleTable';
import Button from '../../elements/Button';
import { useState } from 'react';
import RoleFormModal from '../../forms/RoleFormModal';

export default function RoleListScreen() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Daftar Role</h1>
        <Button
          label="Tambah Role"
          onClick={() => setIsModalOpen(true)}
          variant="primary"
        />
      </div>
      <RoleTable />
      {isModalOpen && <RoleFormModal onClose={() => setIsModalOpen(false)} />}
    </MainLayout>
  );
}
