import React, { useEffect, useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import AkademikTable from '../../fragments/AkademikTable';
import Button from '../../elements/Button';
import AkademikForm from './AkademikForm';
import axios from 'axios';

const DaftarAkademik = () => {
  const [akademikList, setAkademikList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAkadmik, setEditingAkademik] = useState(null);

  useEffect(() => {
    const fetchAkademikList = async () => {
      try {
        const response = await axios.get('/api/admin/akademik');
        console.log('Akademik List fetched:', response.data.data);
        setAkademikList(response.data.data);
      } catch (error) {
        console.error('Error fetching Akademik list:', error);
      }
    };

    fetchAkademikList();
  }, []);

  const handleCreateOrUpdate = async (akademikData) => {
    try {
      console.log('Data to be submitted:', akademikData);
      if (editingAkadmik) {
        console.log('Updating Akademik...');
        await axios.put(
          `/api/admin/akademik/${editingAkadmik._id}`,
          akademikData
        );
      } else {
        console.log('Creating new Akademik...');
        await axios.post('/api/admin/akademik', akademikData);
      }
      const response = await axios.get('/api/admin/akademik');
      console.log('Updated Akademik List:', response.data.data);
      setAkademikList(response.data.data);
      setIsModalOpen(false);
      setEditingAkademik(null);
    } catch (error) {
      console.error('Error creating/updating Akademik:', error);
    }
  };

  const handleAddData = () => {
    setEditingAkademik(null);
    setIsModalOpen(true);
  };

  const handleEdit = (akademik) => {
    console.log('Editing Akademik:', akademik);
    setEditingAkademik(akademik);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = async (_id) => {
    try {
      console.log('Deleting Akademik with Kode Akademik:', _id);
      await axios.delete(`/api/admin/akademik/${_id}`);
      const response = await axios.get('/api/admin/akademik');
      setAkademikList(response.data.data);
    } catch (error) {
      console.error('Error deleting Akademik:', error);
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
        <AkademikTable
          akademikList={akademikList}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <AkademikForm
              onSubmit={handleCreateOrUpdate}
              existingAkademik={editingAkadmik}
              onClose={handleCloseModal}
            />
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default DaftarAkademik;
