import axios from 'axios';
import MatkulForm from './MatkulForm';
import Button from '../../elements/Button';
import MainLayout from '../../layouts/MainLayout';
import React, { useState, useEffect } from 'react';
import MatkulTable from '../../fragments/MatkulTable';

const DaftarMatkul = () => {
  const [matkulList, setMatkulList] = useState([]);
  const [prodiOptions, setProdiOptions] = useState([]);
  const [dosenOptions, setDosenOptions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMatkul, setEditingMatkul] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const matkulResponse = await axios.get('/api/admin/matkul');
        setMatkulList(matkulResponse.data.data);
        const prodiResponse = await axios.get('/api/admin/prodi');
        setProdiOptions(prodiResponse.data.data);
        const dosenResponse = await axios.get('/api/admin/dosen');
        setDosenOptions(dosenResponse.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleCreateOrUpdate = async (formData) => {
    try {
      if (editingMatkul) {
        await axios.put(`/api/admin/matkul/${editingMatkul._id}`, formData);
      } else {
        await axios.post('/api/admin/matkul', formData);
      }

      const response = await axios.get('/api/admin/matkul');
      setMatkulList(response.data.data);

      setIsModalOpen(false);
      setEditingMatkul(null);
      alert('Data berhasil disimpan!');
    } catch (error) {
      console.error('Error creating/updating mata kuliah:', error);
      alert('Terjadi kesalahan saat menyimpan data.');
    }
  };

  const handleAddData = () => {
    setEditingMatkul(null);
    setIsModalOpen(true);
  };

  const handleEdit = (matkul) => {
    setEditingMatkul(matkul);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = async (_id) => {
    try {
      if (
        window.confirm('Apakah Anda yakin ingin menghapus Mata Kuliah ini?')
      ) {
        await axios.delete(`/api/admin/matkul/${_id}`);

        const response = await axios.get('/api/admin/matkul');
        setMatkulList(response.data.data);
        alert('Mata Kuliah berhasil dihapus');
      }
    } catch (error) {
      console.error('Error deleting Mata Kuliah:', error);
      alert('Gagal menghapus Mata Kuliah');
    }
  };

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Daftar Mata Kuliah</h1>
        <Button
          label="Tambah Data"
          icon="edit"
          onClick={handleAddData}
          variant="primary"
        />
      </div>

      <div className="mt-5">
        <MatkulTable
          matkulList={matkulList}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <MatkulForm
              onSubmit={handleCreateOrUpdate}
              existingMatkul={editingMatkul}
              prodiOptions={prodiOptions}
              dosenOptions={dosenOptions}
              onClose={handleCloseModal}
            />
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default DaftarMatkul;
