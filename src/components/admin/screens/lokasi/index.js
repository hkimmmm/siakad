import axios from 'axios';
import LokasiForm from './LokasiForm';
import Button from '../../elements/Button';
import MainLayout from '../../layouts/MainLayout';
import React, { useState, useEffect } from 'react';
import LokasiTable from '../../fragments/LokasiTable';

const DaftarLokasi = () => {
  const [lokasiList, setLokasiList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLokasi, setEditingLokasi] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const lokasiResponse = await axios.get('/api/admin/lokasi');
        setLokasiList(lokasiResponse.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleCreateOrUpdate = async (formData) => {
    try {
      if (editingLokasi) {
        await axios.put(`/api/admin/lokasi/${editingLokasi._id}`, formData);
      } else {
        await axios.post('/api/admin/lokasi', formData);
      }

      const response = await axios.get('/api/admin/lokasi');
      setLokasiList(response.data.data);

      setIsModalOpen(false);
      setEditingLokasi(null);
      alert('Data berhasil disimpan!');
    } catch (error) {
      console.error('Error creating/updating Lokasi:', error);
      alert('Terjadi kesalahan saat menyimpan data.');
    }
  };

  const handleAddData = () => {
    setEditingLokasi(null);
    setIsModalOpen(true);
  };

  const handleEdit = (lokasi) => {
    setEditingLokasi(lokasi);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = async (_id) => {
    try {
      if (
        window.confirm('Apakah Anda yakin ingin menghapus Titik Lokasi ini?')
      ) {
        await axios.delete(`/api/admin/lokasi/${_id}`);

        const response = await axios.get('/api/admin/lokasi');
        setLokasiList(response.data.data);
        alert('Titik Lokasi berhasil dihapus');
      }
    } catch (error) {
      console.error('Error deleting Titik Lokasi:', error);
      alert('Gagal menghapus Titik Lokasi');
    }
  };

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Daftar Titik Lokasi</h1>
        <Button
          label="Tambah Data"
          icon="edit"
          onClick={handleAddData}
          variant="primary"
        />
      </div>

      <div className="mt-5">
        <LokasiTable
          lokasiList={lokasiList}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <LokasiForm
              onSubmit={handleCreateOrUpdate}
              existingLokasi={editingLokasi}
              onClose={handleCloseModal}
            />
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default DaftarLokasi;
