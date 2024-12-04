import axios from 'axios';
import Button from '../elements/Button';
import ProdiForm from '../screens/prodi/ProdiForm';
import React, { useState, useEffect } from 'react';
import {
  MdChevronLeft,
  MdChevronRight,
  MdEdit,
  MdDelete
} from 'react-icons/md';

export default function ProdiTable() {
  const [prodiList, setProdiList] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage] = useState(10);
  const [editingProdi, setEditingProdi] = useState(null);
  const [loadingDelete, setLoadingDelete] = useState(false);

  useEffect(() => {
    const fetchProdiList = async () => {
      try {
        const response = await axios.get('/api/admin/prodi');
        setProdiList(response.data.data);
      } catch (error) {
        console.error('Error fetching Prodi list:', error);
      }
    };
    fetchProdiList();
  }, []);

  const filteredData = prodiList.filter(
    (prodi) =>
      prodi.kd_prodi.toLowerCase().includes(search.toLowerCase()) ||
      prodi.nama_prodi.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / entriesPerPage);
  const currentData = filteredData.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const handleEdit = (prodi) => {
    setEditingProdi(prodi);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this Prodi?')) {
      try {
        setLoadingDelete(true);
        await axios.delete(`/api/admin/prodi/${id}`);
        setProdiList((prevList) => prevList.filter((prodi) => prodi.id !== id));
      } catch (error) {
        console.error('Error deleting Prodi:', error);
      } finally {
        setLoadingDelete(false);
      }
    }
  };

  const handleUpdateProdi = async (updatedProdi) => {
    try {
      await axios.put(`/api/admin/prodi/${updatedProdi._id}`, updatedProdi);
      setProdiList((prevList) =>
        prevList.map((prodi) =>
          prodi._id === updatedProdi._id ? updatedProdi : prodi
        )
      );
      setEditingProdi(null);
    } catch (error) {
      console.error('Error updating Prodi:', error);
    }
  };

  const handleCloseForm = () => {
    setEditingProdi(null);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
        <h2 className="text-lg font-semibold">Program Studi</h2>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/3 border border-gray-300 px-3 py-2 text-sm rounded focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

      {/* Table */}
      <div className="overflow-y-auto max-h-80">
        <table className="min-w-full bg-white text-sm">
          <thead className="sticky top-0 bg-white">
            <tr className="border border-gray-300">
              <th className="py-2 px-3 font-semibold text-center">No</th>
              <th className="py-2 px-3 font-semibold text-center">
                Kode Prodi
              </th>
              <th className="py-2 px-3 font-semibold text-center">
                Nama Prodi
              </th>
              <th className="py-2 px-3 font-semibold text-center">Jenjang</th>
              <th className="py-2 px-3 font-semibold text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((prodi, index) => (
              <tr key={prodi._id} className="border-gray-200">
                <td className="py-2 px-3 text-center">
                  {(currentPage - 1) * entriesPerPage + index + 1}
                </td>
                <td className="py-2 px-3 text-center">{prodi.kd_prodi}</td>
                <td className="py-2 px-3 text-center">{prodi.nama_prodi}</td>
                <td className="py-2 px-3 text-center">{prodi.jenjang}</td>
                <td className="py-2 px-3 flex justify-center gap-2">
                  <button
                    onClick={() => handleEdit(prodi)}
                    className="text-blue-500 hover:text-blue-700 transition"
                  >
                    <MdEdit className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(prodi._id)}
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

      {/* Footer */}
      <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-sm text-gray-600">
          Showing {(currentPage - 1) * entriesPerPage + 1} to{' '}
          {Math.min(currentPage * entriesPerPage, filteredData.length)} of{' '}
          {filteredData.length} entries
        </p>
        <div className="flex items-center gap-2">
          <Button
            label={<MdChevronLeft className="h-5 w-5" />}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            variant="secondary"
            disabled={currentPage === 1}
          />
          <span className="text-sm text-gray-600">{currentPage}</span>
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

      {/* Edit Form */}
      {editingProdi && (
        <ProdiForm
          onClose={handleCloseForm}
          existingProdi={editingProdi}
          onSubmit={handleUpdateProdi}
        />
      )}
    </div>
  );
}
