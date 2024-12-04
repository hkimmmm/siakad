import MainLayout from '../../layouts/MainLayout';
import RuanganTable from '../../fragments/RuanganTable';
import RuanganForm from './RuangForm';
import Button from '../../elements/Button';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DaftarRuangan = () => {
  const [ruanganList, setRuanganList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRuangan, setEditingRuangan] = useState(null);

  useEffect(() => {
    const fetchRuanganList = async () => {
      try {
        const response = await axios.get('/api/admin/ruangan');
        console.log('Data List fetched:', response.data.data);
        setRuanganList(response.data.data);
      } catch (error) {
        console.error('Error fetching Data list:', error);
      }
    };

    fetchRuanganList();
  }, []);

  const handleCreateOrUpdate = async (ruanganData) => {
    try {
      console.log('Data to be submitted:', ruanganData);
      if (editingRuangan) {
        console.log('Updating Data...');
        await axios.put(
          `/api/admin/ruangan/${editingRuangan.kd_ruangan}`,
          ruanganData
        );
      } else {
        console.log('Creating new Data...');
        await axios.post('/api/admin/ruangan', ruanganData);
      }
      const response = await axios.get('/api/admin/ruangan');
      console.log('Updated Data List:', response.data.data);
      setRuanganList(response.data.data);
      setIsModalOpen(false);
      setEditingRuangan(null);
    } catch (error) {
      console.error('Error creating/updating Data:', error);
    }
  };

  const handleAddData = () => {
    setEditingRuangan(null);
    setIsModalOpen(true);
  };

  const handleEdit = (ruangan) => {
    console.log('Editing Data:', ruangan);
    setEditingRuangan(ruangan);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = async (kd_ruangan) => {
    try {
      console.log('Deleting Ruangan with Kode Ruangan:', kd_ruangan);
      await axios.delete(`/api/admin/ruangan/${kd_ruangan}`);
      const response = await axios.get('/api/admin/ruangan');
      setRuanganList(response.data.data);
    } catch (error) {
      console.error('Error deleting Data:', error);
    }
  };

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Button
          label="Tambah Ruangan"
          onClick={() => setIsModalOpen(true)}
          variant="primary"
        />
      </div>
      <div className="mt-5">
        <RuanganTable
          ruanganList={ruanganList}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <RuanganForm
              onSubmit={handleCreateOrUpdate}
              existingRuangan={editingRuangan}
              onClose={handleCloseModal}
            />
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default DaftarRuangan;
