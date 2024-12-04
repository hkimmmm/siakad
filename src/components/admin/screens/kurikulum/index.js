import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import KurikulumTable from '../../fragments/KurikulumTable.js';
import Button from '../../elements/Button';

const DaftarKurikulum = () => {
  const handleAddData = () => {
    console.log('Add Data button clicked!');
  };

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        {/* Use the Button component */}
        <Button
          label="Tambah Data"
          icon="edit"
          onClick={handleAddData}
          variant="primary"
        />
      </div>
      <div className="mt-5">
        <KurikulumTable />
      </div>
    </MainLayout>
  );
};

export default DaftarKurikulum;
