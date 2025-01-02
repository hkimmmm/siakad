import axios from 'axios';
import JadwalForm from './JadwalForm';
import Button from '../../elements/Button';
import MainLayout from '../../layouts/MainLayout';
import React, { useState, useEffect } from 'react';
import JadwalTable from '../../fragments/JadwalTable';

const DaftarJadwal = () => {
  const [jadwalList, setJadwalList] = useState([]);
  const [matkulOptions, setMatkulOptions] = useState([]);
  const [kelasOptions, setKelasOptions] = useState([]);
  const [dosenOptions, setDosenOptions] = useState([]);
  const [ruanganOptions, setRuanganOptions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJadwal, setEditingJadwal] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const jadwalResponse = await axios.get('/api/admin/jadwal');
        setJadwalList(jadwalResponse.data.data);

        const matkulResponse = await axios.get('/api/admin/matkul');
        setMatkulOptions(matkulResponse.data.data);

        const kelasResponse = await axios.get('/api/admin/kelas');
        setKelasOptions(kelasResponse.data.data);

        const dosenResponse = await axios.get('/api/admin/dosen');
        setDosenOptions(dosenResponse.data.data);

        const ruanganResponse = await axios.get('/api/admin/ruangan');
        setRuanganOptions(ruanganResponse.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Gagal memuat data. Silakan coba lagi nanti.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCreateOrUpdate = async (formData) => {
    setLoading(true);
    try {
      let response;
      if (editingJadwal) {
        console.log('Mengupdate jadwal dengan ID:', editingJadwal._id);
        response = await axios.put(
          `/api/admin/jadwal/${editingJadwal._id}`,
          formData
        );
      } else {
        response = await axios.post('/api/admin/jadwal', formData);
      }

      console.log('Response dari API:', response.data);

      const jadwalResponse = await axios.get('/api/admin/jadwal');
      setJadwalList(jadwalResponse.data.data);

      setIsModalOpen(false);
      setEditingJadwal(null);
    } catch (error) {
      console.error('Error creating/updating jadwal:', error);
      alert('Terjadi kesalahan saat menyimpan data.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (_id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus Jadwal ini?')) {
      setLoading(true);
      try {
        await axios.delete(`/api/admin/jadwal/${_id}`);
        const response = await axios.get('/api/admin/jadwal');
        setJadwalList(response.data.data);
        alert('Jadwal berhasil dihapus');
      } catch (error) {
        console.error('Error deleting Jadwal:', error);
        alert('Gagal menghapus Jadwal');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleAddData = () => {
    setEditingJadwal(null);
    setIsModalOpen(true);
  };

  const handleEdit = (jadwal) => {
    setEditingJadwal(jadwal);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingJadwal(null);
  };

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Daftar Jadwal</h1>
        <Button
          label="Tambah Data"
          icon="edit"
          onClick={handleAddData}
          variant="primary"
        />
      </div>

      {loading ? (
        <div className="text-center mt-5">Loading...</div>
      ) : error ? (
        <div className="text-center mt-5 text-red-500">{error}</div>
      ) : (
        <div className="mt-5">
          <JadwalTable
            jadwalList={jadwalList}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <JadwalForm
              onSubmit={handleCreateOrUpdate}
              existingJadwal={editingJadwal}
              matkulOptions={matkulOptions}
              kelasOptions={kelasOptions}
              dosenOptions={dosenOptions}
              ruanganOptions={ruanganOptions}
              onClose={handleCloseModal}
              loading={loading}
            />
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default DaftarJadwal;
