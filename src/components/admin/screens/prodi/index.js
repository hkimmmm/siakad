import React, { useState, useEffect } from 'react';
import MainLayout from '../../layouts/MainLayout';
import ProdiTable from '../../fragments/ProdiTable';
import ProdiForm from './ProdiForm';
import Button from '../../elements/Button';
import axios from 'axios';

const DaftarProdi = () => {
  const [prodiList, setProdiList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProdi, setEditingProdi] = useState(null);

  useEffect(() => {
    const fetchProdiList = async () => {
      try {
        const response = await axios.get('/api/admin/prodi');
        console.log('Prodi List fetched:', response.data.data);
        setProdiList(response.data.data);
      } catch (error) {
        console.error('Error fetching Prodi list:', error);
      }
    };

    fetchProdiList();
  }, []);

  const handleCreateOrUpdate = async (prodiData) => {
    try {
      console.log('Data to be submitted:', prodiData);
      if (editingProdi) {
        console.log('Updating Prodi...');
        await axios.put(`/api/admin/prodi/${editingProdi._id}`, prodiData);
      } else {
        console.log('Creating new Prodi...');
        await axios.post('/api/admin/prodi', prodiData);
      }
      const response = await axios.get('/api/admin/prodi');
      console.log('Updated Prodi List:', response.data.data);
      setProdiList(response.data.data);
      setIsModalOpen(false);
      setEditingProdi(null);
    } catch (error) {
      console.error('Error creating/updating Prodi:', error);
    }
  };

  const handleAddData = () => {
    setEditingProdi(null);
    setIsModalOpen(true);
  };

  const handleEdit = (prodi) => {
    console.log('Editing Prodi:', prodi);
    setEditingProdi(prodi);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = async (_id) => {
    try {
      console.log('Deleting Prodi with Kode Prodi:', _id);
      await axios.delete(`/api/admin/prodi/${_id}`);
      const response = await axios.get('/api/admin/prodi');
      setProdiList(response.data.data);
    } catch (error) {
      console.error('Error deleting Prodi:', error);
    }
  };

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Button
          label="Tambah Data"
          icon="edit"
          onClick={handleAddData}
          variant="primary"
        />
      </div>

      <div className="mt-5">
        <ProdiTable
          prodiList={prodiList}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <ProdiForm
              onSubmit={handleCreateOrUpdate}
              existingProdi={editingProdi}
              onClose={handleCloseModal}
            />
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default DaftarProdi;
