import React, { useState, useEffect } from 'react';
import {
  MdChevronLeft,
  MdChevronRight,
  MdEdit,
  MdDelete
} from 'react-icons/md';
import Button from '../elements/Button';
import RuanganForm from '../screens/ruangan/RuangForm';
import axios from 'axios';

export default function RuanganTable() {
  const [ruanganList, setRuanganList] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage] = useState(10);
  const [editingRuangan, setEditingRuangan] = useState(null);
  const [loadingDelete, setLoadingDelete] = useState(false);

  useEffect(() => {
    const fetchRuanganList = async () => {
      try {
        const response = await axios.get('/api/admin/ruangan');
        setRuanganList(response.data.data);
      } catch (error) {
        console.error('Error fetching Ruangan List:', error);
      }
    };
    fetchRuanganList();
  }, []);

  const filteredData = ruanganList.filter(
    (ruangan) =>
      ruangan.kd_ruangan.toLowerCase().includes(search.toLowerCase()) ||
      ruangan.nama_ruangan.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / entriesPerPage);
  const currentData = filteredData.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const handleEdit = (ruangan) => {
    setEditingRuangan(ruangan);
  };

  const handleDelete = async (kd_ruangan) => {
    if (window.confirm('Are you sure you wannt to delete this Data?')) {
      try {
        setLoadingDelete(true);
        await axios.delete(`/api/admin/ruangan/${kd_ruangan}`);
        setRuanganList((prevlist) =>
          prevlist.filter((ruangan) => ruangan.kd_ruangan !== kd_ruangan)
        );
      } catch (error) {
        console.error('Error deleting Data:', error);
      } finally {
        setLoadingDelete(false);
      }
    }
  };

  const handleUpdateRuangan = async (updatedRuangan) => {
    try {
      await axios.put(
        `/api/admin/ruangan/${updatedRuangan.kd_ruangan}`,
        updatedRuangan
      );
      setRuanganList((prevList) =>
        prevList.map((ruangan) =>
          ruangan.kd_ruangan === updatedRuangan.kd_ruangan
            ? updatedRuangan
            : ruangan
        )
      );
      setEditingRuangan(null);
    } catch (error) {
      console.error('Error updating Data:', error);
    }
  };

  const handleCloseForm = () => {
    setEditingRuangan(null);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
        <h2 className="text-lg font-semibold">Ruangan</h2>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/3 border border-gray-300 px-3 py-2 text-sm rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

      <div className="overflow-x-auto overflow-y-auto max-h-72">
        <table className="min-w-full bg-white text-sm">
          <thead className="sticky top-0 bg-white">
            <tr className="border border-gray-300">
              <th className="py-3 px-4 font-semibold text-center">No</th>
              <th className="py-3 px-4 font-semibold text-center">
                Kode Ruangan
              </th>
              <th className="py-3 px-4 font-semibold text-center">
                Nama Ruangan
              </th>
              <th className="py-3 px-4 font-semibold text-center">Kapasitas</th>
              <th className="py-3 px-4 font-semibold text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((ruangan, index) => (
              <tr key={ruangan.kd_ruangan} className="border-gray-300">
                <td className="py-3 px-4 text-center">
                  {(currentPage - 1) * entriesPerPage + index + 1}
                </td>
                <td className="py-3 px-4 text-center">{ruangan.kd_ruangan}</td>
                <td className="py-3 px-4 text-center">
                  {ruangan.nama_ruangan}
                </td>
                <td className="py-3 px-4 text-center">{ruangan.kapasitas}</td>
                <td className="py-3 px-4 flex justify-center gap-2">
                  <button
                    onClick={() => handleEdit(ruangan)}
                    className="text-blue-500 hover:text-blue-700 transition"
                  >
                    <MdEdit className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(ruangan.kd_ruangan)}
                    className="text-red-500 hover:text-red-700 transition"
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
        <p className="text-sm text-gray-600">
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
          <span className="mx-2 text-sm text-gray-600">{currentPage}</span>
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

      {editingRuangan && (
        <RuanganForm
          onClose={handleCloseForm}
          existingRuangan={editingRuangan}
          onSubmit={handleUpdateRuangan}
        />
      )}
    </div>
  );
}
