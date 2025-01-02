import axios from 'axios';
import Button from '../elements/Button';
import LokasiForm from '../screens/lokasi/LokasiForm';
import React, { useState, useEffect } from 'react';
import {
  MdChevronLeft,
  MdChevronRight,
  MdEdit,
  MdDelete
} from 'react-icons/md';

export default function LokasiTable() {
  const [lokasiList, setLokasiList] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage] = useState(10);
  const [editingLokasi, setEditingLokasi] = useState(null);
  const [loadingDelete, setLoadingDelete] = useState(false);

  useEffect(() => {
    const fetchLokasiList = async () => {
      try {
        const response = await axios.get('/api/admin/lokasi');
        setLokasiList(response.data.data);
      } catch (error) {
        console.error('Error fetching Lokasi list:', error);
      }
    };
    fetchLokasiList();
  }, []);

  const filteredData = lokasiList.filter((lokasi) =>
    [lokasi.nama_lokasi].some((field) =>
      field?.toLowerCase().includes(search.trim().toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredData.length / entriesPerPage);
  const currentData = filteredData.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const handleEdit = (lokasi) => {
    setEditingLokasi(lokasi);
  };

  const handleDelete = async (_id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus Lokasi ini?')) {
      try {
        setLoadingDelete(true);
        await axios.delete(`/api/admin/lokasi/${_id}`);
        setLokasiList((prevList) =>
          prevList.filter((lokasi) => lokasi._id !== _id)
        );
        alert('Lokasi berhasil dihapus');
      } catch (error) {
        console.error('Error deleting Lokasi:', error);
        alert('Gagal menghapus Lokasi');
      } finally {
        setLoadingDelete(false);
      }
    }
  };

  const handleUpdateLokasi = async (updateLokasi) => {
    try {
      await axios.put(`/api/admin/lokasi/${updateLokasi._id}`, updateLokasi);
      setLokasiList((prevList) =>
        prevList.map((lokasi) =>
          lokasi._id === updateLokasi._id ? updateLokasi : lokasi
        )
      );
      setEditingLokasi(null);
    } catch (error) {
      console.error('Error updating Lokasi:', error);
    }
  };

  const handleCloseForm = () => {
    setEditingLokasi(null);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-lg font-semibold">Lokasi</h2>
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
              <th className="py-3 px-4 font-semibold text-center">
                Nama Lokasi
              </th>
              <th className="py-3 px-4 font-semibold text-center">IP WiFi</th>
              <th className="py-3 px-4 font-semibold text-center">Deskripsi</th>
              <th className="py-3 px-4 font-semibold text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((lokasi, index) => (
              <tr key={lokasi._id} className="border-gray-300">
                <td className="py-3 px-4 text-center">
                  {(currentPage - 1) * entriesPerPage + index + 1}
                </td>
                <td className="py-3 px-4 text-center">{lokasi.nama_lokasi}</td>
                <td className="py-3 px-4 text-center">{lokasi.ipWifi}</td>
                <td className="py-3 px-4 text-center">{lokasi.deskripsi}</td>

                <td className="py-3 px-4 flex justify-center space-x-2">
                  <button
                    onClick={() => handleEdit(lokasi)}
                    className="text-blue-500 hover:text-blue-700 transition"
                  >
                    <MdEdit className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(lokasi._id)}
                    className={`text-red-500 hover:text-red-700 transition ${
                      loadingDelete ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                    disabled={loadingDelete}
                  >
                    <MdDelete className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-md text-gray-600">
          Showing {(currentPage - 1) * entriesPerPage + 1} to{' '}
          {Math.min(currentPage * entriesPerPage, filteredData.length)} of{' '}
          {filteredData.length} entries
        </p>
        <div className="flex items-center">
          <Button
            label={<MdChevronLeft className="h-5 w-5" />}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            variant="secondary"
            disabled={currentPage === 1}
          />
          <span className="mx-2 text-md text-gray-600">{currentPage}</span>
          <Button
            label={<MdChevronRight className="h-5 w-5" />}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            variant="secondary"
            disabled={currentPage === totalPages}
          />
        </div>
      </div>

      {editingLokasi && (
        <LokasiForm
          onClose={handleCloseForm}
          existingLokasi={editingLokasi}
          onSubmit={handleUpdateLokasi}
        />
      )}
    </div>
  );
}