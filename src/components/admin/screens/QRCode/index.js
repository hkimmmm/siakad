import axios from 'axios';
import QRCodeForm from './QRCodeForm';
import Button from '../../elements/Button';
import MainLayout from '../../layouts/MainLayout';
import React, { useState, useEffect } from 'react';
import QRCodeTable from '../../fragments/QRCodeTable';

const DaftarQRCode = () => {
  const [qrcodeList, setQRCodeList] = useState([]);
  const [jadwalOptions, setJadwalOptions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingQRCode, setEditingQRCode] = useState(null);
  const [loading, setLoading] = useState(false); // State loading
  const [error, setError] = useState(null); // State error

  // Fetch data saat komponen pertama kali di-mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [qrcodeResponse, jadwalResponse] = await Promise.all([
          axios.get('/api/admin/qrcode'),
          axios.get('/api/admin/jadwal')
        ]);

        setQRCodeList(qrcodeResponse.data.data);
        setJadwalOptions(jadwalResponse.data.data);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Gagal memuat data. Silakan coba lagi.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCreateOrUpdate = async (formData) => {
    try {
      if (editingQRCode) {
        await axios.put(`/api/admin/qrcode/${editingQRCode._id}`, formData);
      } else {
        await axios.post('/api/admin/qrcode', formData);
      }

      // Refresh daftar QR Code
      const response = await axios.get('/api/admin/qrcode');
      setQRCodeList(response.data.data);

      setIsModalOpen(false);
      setEditingQRCode(null);
      alert('Data berhasil disimpan!');
    } catch (err) {
      console.error('Error creating/updating QR Code:', err);
      alert('Terjadi kesalahan saat menyimpan data.');
    }
  };

  const handleAddData = () => {
    setEditingQRCode(null);
    setIsModalOpen(true);
  };

  const handleEdit = (qrcode) => {
    setEditingQRCode(qrcode);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = async (_id) => {
    try {
      if (window.confirm('Apakah Anda yakin ingin menghapus QR Code ini?')) {
        await axios.delete(`/api/admin/qrcode/${_id}`);

        const response = await axios.get('/api/admin/qrcode');
        setQRCodeList(response.data.data);
        alert('QR Code berhasil dihapus');
      }
    } catch (err) {
      console.error('Error deleting QR Code:', err);
      alert('Gagal menghapus QR Code');
    }
  };

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Daftar QR Code</h1>
        <Button
          label="Tambah Data"
          icon="edit"
          onClick={handleAddData}
          variant="primary"
        />
      </div>

      {/* Menampilkan loading state */}
      {loading && <p className="text-gray-500">Memuat data...</p>}

      {/* Menampilkan error jika ada */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Tabel QR Code */}
      {!loading && !error && (
        <div className="mt-5">
          <QRCodeTable
            qrcodeList={qrcodeList}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      )}

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <QRCodeForm
              onSubmit={handleCreateOrUpdate}
              existingQRCode={editingQRCode}
              jadwalOptions={jadwalOptions}
              onClose={handleCloseModal}
            />
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default DaftarQRCode;
