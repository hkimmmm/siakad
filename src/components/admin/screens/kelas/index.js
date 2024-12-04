import axios from 'axios';
import KelasForm from './KelasForm';
import Button from '../../elements/Button';
import MainLayout from '../../layouts/MainLayout';
import React, { useState, useEffect } from 'react';
import KelasTable from '../../fragments/KelasTable';

const DaftarKelas = () => {
  const [kelasList, setKelasList] = useState([]);
  const [prodiOptions, setProdiOptions] = useState([]);
  const [akademikOptions, setAkademikOptions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingKelas, setEditingKelas] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const kelasResponse = await axios.get('/api/admin/kelas');
        setKelasList(kelasResponse.data.data);
        const prodiResponse = await axios.get('/api/admin/prodi');
        setProdiOptions(prodiResponse.data.data);
        const akademikResponse = await axios.get('/api/admin/akademik');
        setAkademikOptions(akademikResponse.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleCreateOrUpdate = async (formData) => {
    try {
      if (editingKelas) {
        await axios.put(
          `/api/admin/kelas/${editingKelas.nama_kelas}`,
          formData
        );
      } else {
        await axios.post('/api/admin/kelas', formData);
      }

      const response = await axios.get('/api/admin/kelas');
      setKelasList(response.data.data);

      setIsModalOpen(false);
      setEditingKelas(null);
    } catch (error) {
      console.error('Error creating/updating Kelas:', error);
    }
  };

  const handleAddData = () => {
    setEditingKelas(null);
    setIsModalOpen(true);
  };

  const handleEdit = (kelas) => {
    setEditingKelas(kelas);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = async (nama_kelas) => {
    try {
      if (window.confirm('Apakah Anda yakin ingin menghapus kelas ini?')) {
        await axios.delete(`/api/admin/kelas/${nama_kelas}`);

        const response = await axios.get('/api/admin/kelas');
        setKelasList(response.data.data);
      }
    } catch (error) {
      console.error('Error deleting Kelas:', error);
    }
  };

  return (
    <MainLayout>
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Daftar Kelas</h1>
        <Button
          label="Tambah Data"
          icon="edit"
          onClick={handleAddData}
          variant="primary"
        />
      </div>

      {/* Daftar Kelas */}
      <div className="mt-5">
        <KelasTable
          kelasList={kelasList}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {/* Modal untuk Tambah/Edit Kelas */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <KelasForm
              onSubmit={handleCreateOrUpdate}
              existingKelas={editingKelas}
              prodiOptions={prodiOptions}
              akademikOptions={akademikOptions}
              onClose={handleCloseModal}
            />
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default DaftarKelas;
