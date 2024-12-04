import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import MahasiswaForm from '../../forms/MahasiswaForm';

const TambahMahasiswa = () => {
  return (
    <MainLayout>
      <h1 className="text-2xl font-bold mb-4">Tambah Mahasiswa</h1>
      <MahasiswaForm />
    </MainLayout>
  );
};

export default TambahMahasiswa;
