import { QRCodeCanvas } from 'qrcode.react';
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import {
  MdChevronLeft,
  MdChevronRight,
  MdEdit,
  MdDelete
} from 'react-icons/md';
import Button from '../elements/Button';
import QRCodeForm from '../screens/QRCode/QRCodeForm';

export default function QRCodeTable() {
  const [QRCodeList, setQRCodeList] = useState([]); // Daftar QR Code
  const [search, setSearch] = useState(''); // Input pencarian
  const [currentPage, setCurrentPage] = useState(1); // Halaman saat ini
  const [entriesPerPage] = useState(10); // Jumlah entri per halaman
  const [editingQRCode, setEditingQRCode] = useState(null); // QR Code yang sedang diedit
  const [loadingDelete, setLoadingDelete] = useState(false); // Loading untuk hapus
  const [loading, setLoading] = useState(true); // Loading untuk fetch data
  const [showModal, setShowModal] = useState(false); // Menangani tampilan modal
  const [selectedQRCode, setSelectedQRCode] = useState(null); // QR Code yang dipilih untuk melihat versi besar

  // Fetch QR Code List
  const fetchList = useCallback(async () => {
    try {
      const response = await axios.get('/api/admin/qrcode');
      setQRCodeList(response.data.data || []);
    } catch (error) {
      console.error('Error fetching QR Code list:', error.response || error);
      alert('Gagal memuat data QR Code. Silakan coba lagi nanti.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  // Filter data berdasarkan pencarian
  const filteredData = QRCodeList.filter(
    (qrcode) =>
      qrcode.jadwal?.nama_matkul
        ?.toLowerCase()
        .includes(search.trim().toLowerCase()) ||
      qrcode.status?.toLowerCase().includes(search.trim().toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / entriesPerPage);
  const currentData = filteredData.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  // Handle edit QR Code
  const handleEdit = (qrcode) => {
    setEditingQRCode(qrcode);
  };

  // Handle delete QR Code
  const handleDelete = async (_id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus QR Code ini?')) {
      try {
        setLoadingDelete(_id); // Indikasikan ID yang sedang dihapus
        await axios.delete(`/api/admin/qrcode/${_id}`);
        setQRCodeList((prevList) =>
          prevList.filter((qrcode) => qrcode._id !== _id)
        );
        alert('QR Code berhasil dihapus');
      } catch (error) {
        console.error('Error deleting QR Code:', error);
        alert('Gagal menghapus QR Code');
      } finally {
        setLoadingDelete(false); // Reset loading
      }
    }
  };

  // Handle update QR Code
  const handleUpdateQRCode = async (updateQRCode) => {
    try {
      const response = await axios.put(
        `/api/admin/qrcode/${updateQRCode._id}`,
        updateQRCode
      );
      if (response.data?.success) {
        setQRCodeList((prevList) =>
          prevList.map((qrcode) =>
            qrcode._id === updateQRCode._id
              ? { ...qrcode, ...updateQRCode }
              : qrcode
          )
        );
        setEditingQRCode(null);
      } else {
        throw new Error(response.data.message || 'Gagal memperbarui data.');
      }
    } catch (error) {
      console.error('Error updating QR Code:', error);
      alert('Gagal memperbarui QR Code. Silakan coba lagi.');
    }
  };

  const handleCloseForm = () => {
    setEditingQRCode(null);
  };

  const openModal = (qrcode) => {
    setSelectedQRCode(qrcode);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedQRCode(null);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-lg font-semibold">Daftar QR Code</h2>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-auto border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring focus:border-blue-300 rounded-md"
        />
      </div>

      <div className="overflow-x-auto mt-5">
        <table className="min-w-full bg-white text-sm">
          <thead className="sticky top-0 bg-white">
            <tr className="border border-gray-300">
              <th className="py-3 px-4 font-semibold text-center">No</th>
              <th className="py-3 px-4 font-semibold text-center">Jadwal</th>
              <th className="py-3 px-4 font-semibold text-center">Status</th>
              <th className="py-3 px-4 font-semibold text-center">Token</th>
              <th className="py-3 px-4 font-semibold text-center">
                Expired At
              </th>
              <th className="py-3 px-4 font-semibold text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="py-3 px-4 text-center">
                  Memuat data...
                </td>
              </tr>
            ) : (
              currentData.map((qrcode, index) => (
                <tr key={qrcode._id} className="border-gray-300">
                  <td className="py-3 px-4 text-center">
                    {(currentPage - 1) * entriesPerPage + index + 1}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {qrcode.jadwal?.hari}
                  </td>
                  <td className="py-3 px-4 text-center">{qrcode.status}</td>
                  <td className="py-3 px-4 text-center">
                    {qrcode.token
                      ? `${qrcode.token.slice(0, 3)}***${qrcode.token.slice(
                          -3
                        )}`
                      : 'Tidak tersedia'}
                  </td>

                  <td className="py-3 px-4 text-center">
                    {qrcode.expired_at
                      ? new Date(qrcode.expired_at).toLocaleString()
                      : 'Tidak tersedia'}
                  </td>
                  <td className="py-3 px-4 flex justify-center space-x-2">
                    <button
                      onClick={() => openModal(qrcode)}
                      className="text-blue-500 hover:text-blue-700 transition"
                    >
                      <QRCodeCanvas
                        value={qrcode.token}
                        size={20} // Ukuran kecil
                      />
                    </button>
                    <button
                      onClick={() => handleEdit(qrcode)}
                      className="text-blue-500 hover:text-blue-700 transition"
                    >
                      <MdEdit className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(qrcode._id)}
                      className={`text-red-500 hover:text-red-700 transition ${
                        loadingDelete === qrcode._id
                          ? 'opacity-50 cursor-not-allowed'
                          : ''
                      }`}
                      disabled={loadingDelete === qrcode._id}
                    >
                      {loadingDelete === qrcode._id ? (
                        <span className="loader" />
                      ) : (
                        <MdDelete className="h-5 w-5" />
                      )}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-md text-gray-600">
          Showing {(currentPage - 1) * entriesPerPage + 1} to{' '}
          {Math.min(currentPage * entriesPerPage, filteredData.length)} of{' '}
          {filteredData.length} entries
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
            className="p-2 text-gray-500 hover:text-gray-700"
          >
            <MdChevronLeft />
          </button>
          <span className="text-sm font-semibold">{currentPage}</span>
          <button
            onClick={() =>
              setCurrentPage(Math.min(currentPage + 1, totalPages))
            }
            className="p-2 text-gray-500 hover:text-gray-700"
          >
            <MdChevronRight />
          </button>
        </div>
      </div>

      {/* Modal untuk QR Code besar */}
      {showModal && selectedQRCode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-xl mb-4">QR Code</h2>
            <QRCodeCanvas
              value={selectedQRCode.token}
              size={256} // Ukuran besar
            />
            <button
              onClick={closeModal}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg"
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      {editingQRCode && (
        <QRCodeForm
          qrcode={editingQRCode}
          onClose={handleCloseForm}
          onSubmit={handleUpdateQRCode}
        />
      )}
    </div>
  );
}
