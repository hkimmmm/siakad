import axios from 'axios';
import Button from '../elements/Button';
import DosenForm from '../screens/dosen/DosenForm';
import React, { useState, useEffect } from 'react';
import {
  MdChevronLeft,
  MdChevronRight,
  MdEdit,
  MdDelete
} from 'react-icons/md';

export default function DosenTable() {
  const [doseList, setDosenList] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage] = useState(5);
  const [editingDosen, setEditingDosen] = useState(null);
  const [loadingDelete, setLoadingDelete] = useState(false);

  useEffect(() => {
    const fetchDosenList = async () => {
      try {
        const response = await axios.get('/api/admin/dosen');
        setDosenList(response.data.data);
      } catch (error) {
        console.error('Error fetching Dosen list:', error);
      }
    };
    fetchDosenList();
  }, []);

  const filteredData = doseList.filter(
    (dosen) =>
      dosen.kode_dosen.toLowerCase().includes(search.toLowerCase()) ||
      dosen.nama_dosen.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / entriesPerPage);
  const currentData = filteredData.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const handleEdit = (dosen) => {
    setEditingDosen(dosen);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus Dosen ini?')) {
      try {
        setLoadingDelete(true);
        await axios.delete(`/api/admin/dosen/${id}`);
        setDosenList((prevList) =>
          prevList.filter((dosen) => dosen._id !== id)
        );
      } catch (error) {
        console.error('Error deleting Dosen:', error);
      } finally {
        setLoadingDelete(false);
      }
    }
  };

  const handleUpdateDosen = async (updatedDosen) => {
    try {
      await axios.put(`/api/admin/dosen/${updatedDosen._id}`, updatedDosen);
      setDosenList((prevList) =>
        prevList.map((dosen) =>
          dosen._id === updatedDosen._id ? updatedDosen : dosen
        )
      );
      setEditingDosen(null);
    } catch (error) {
      console.error('Error updating Dosen:', error);
    }
  };

  const handleCloseForm = () => {
    setEditingDosen(null);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-lg font-semibold">Daftar Dosen</h2>
        <input
          type="text"
          placeholder="Search by Name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

      <div className="overflow-y-auto" style={{ maxHeight: '300px' }}>
        <table className="min-w-full bg-white text-sm mt-5">
          <thead className="sticky top-0 bg-white">
            <tr className="border-b border-t border-r border-l border-gray-300">
              <th className="py-3 px-4 font-semibold text-center">No</th>
              <th className="py-3 px-4 font-semibold text-center">
                Kode Dosen
              </th>
              <th className="py-3 px-4 font-semibold text-center">Nama</th>
              <th className="py-3 px-4 font-semibold text-center">NIP</th>
              <th className="py-3 px-4 font-semibold text-center">Email</th>
              <th className="py-3 px-4 font-semibold text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((dosen, index) => (
              <tr key={dosen._id} className="border-gray-300">
                <td className="py-3 px-4 text-center">
                  {(currentPage - 1) * entriesPerPage + index + 1}
                </td>
                <td className="py-3 px-4 text-center">{dosen.kode_dosen}</td>
                <td className="py-3 px-4 text-center">{dosen.nama_dosen}</td>
                <td className="py-3 px-4 text-center">{dosen.nip}</td>
                <td className="py-3 px-4 text-center">{dosen.email}</td>
                <td className="py-3 px-4 flex justify-center space-x-2">
                  <button
                    onClick={() => handleEdit(dosen)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <MdEdit className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(dosen._id)}
                    className="text-red-500 hover:text-red-700"
                    disabled={loadingDelete}
                  >
                    {loadingDelete ? (
                      <span>Loading...</span>
                    ) : (
                      <MdDelete className="h-5 w-5" />
                    )}
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
            onClick={() => {
              if (currentPage > 1) {
                setCurrentPage(currentPage - 1);
              }
            }}
            variant="secondary"
            disabled={currentPage === 1}
          />
          <span className="mx-2 text-md text-gray-600">{currentPage}</span>
          <Button
            label={<MdChevronRight className="h-5 w-5" />}
            onClick={() => {
              if (currentPage < totalPages) {
                setCurrentPage(currentPage + 1);
              }
            }}
            variant="secondary"
            disabled={currentPage === totalPages}
          />
        </div>
      </div>

      {editingDosen && (
        <DosenForm
          onClose={handleCloseForm}
          existingDosen={editingDosen}
          onSubmit={handleUpdateDosen}
        />
      )}
    </div>
  );
}
