import React, { useState, useEffect } from 'react';
import MainLayout from '../../layouts/MainLayout';
import MahasiswaTable from '../../fragments/MahasiswaTable';
import Button from '@/components/auth/elements/Button';

const DaftarMahasiswa = () => {
  const [dataMahasiswa, setDataMahasiswa] = useState([]);

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      const response = await fetch('/api/admin/mahasiswa');
      const data = await response.json();
      setDataMahasiswa(data);
    };

    fetchData();
  }, []);

  const handleAddData = () => {
    console.log('Add Data button clicked!');
  };

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        {/* Use the Button component for "Add Data" */}
        <Button
          label="Tambah Data"
          icon="edit"
          onClick={handleAddData}
          variant="primary"
        />
      </div>
      <MahasiswaTable data={dataMahasiswa} />
    </MainLayout>
  );
};

export default DaftarMahasiswa;
