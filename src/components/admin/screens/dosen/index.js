import axios from 'axios';
import DosenForm from './DosenForm';
import Button from '../../elements/Button';
import MainLayout from '../../layouts/MainLayout';
import React, { useState, useEffect } from 'react';
import DosenTable from '../../fragments/DosenTable';

const DaftarDosen = () => {
  const [dosenList, setDosenList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDosen, setEditingDosen] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/admin/dosen');
        console.log('Dosen List fetched:', response.data.data);
        setDosenList(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        alert('Gagal memuat data dosen.');
      }
    };
    fetchData();
  }, []);

  const handleCreateOrUpdate = async (formData) => {
    try {
      console.log('Data to be submitted:', formData);
      if (editingDosen) {
        console.log('Updating Dosen...');
        await axios.put(`/api/admin/dosen/${editingDosen._id}`, formData);
      } else {
        await axios.post('/api/admin/dosen', formData);
      }

      const response = await axios.get('/api/admin/dosen');
      setDosenList(response.data.data);

      setIsModalOpen(false);
      setEditingDosen(null);
      alert('Data berhasil disimpan!');
    } catch (error) {
      console.error('Error creating/updating Dosen:', error);
      alert('Terjadi kesalahan saat menyimpan data.');
    }
  };

  const handleAddData = () => {
    setEditingDosen(null);
    setIsModalOpen(true);
  };

  const handleEdit = (dosen) => {
    setEditingDosen(dosen);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = async (_id) => {
    try {
      if (window.confirm('Apakah Anda yakin ingin menghapus Data Dosen ini?')) {
        await axios.delete(`/api/admin/dosen/${_id}`);

        const response = await axios.get('/api/admin/dosen');
        setDosenList(response.data.data);
        alert('Dosen berhasil dihapus');
      }
    } catch (error) {
      console.error('Error deleting Dosen:', error);
      alert('Gagal menghapus Dosen');
    }
  };

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Daftar Dosen</h1>
        <Button
          label="Tambah Data"
          icon="edit"
          onClick={handleAddData}
          variant="primary"
        />
      </div>

      <div className="mt-5">
        <DosenTable
          dosenList={dosenList}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <DosenForm
              onSubmit={handleCreateOrUpdate}
              existingDosen={editingDosen}
              onClose={handleCloseModal}
            />
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default DaftarDosen;
