import axios from 'axios';
import Button from '../elements/Button';
import MatkulForm from '../screens/matkul/MatkulForm';
import React, { useState, useEffect } from 'react';
import {
  MdChevronLeft,
  MdChevronRight,
  MdEdit,
  MdDelete
} from 'react-icons/md';

export default function MatkulTable() {
  const [matkulList, setMatkulList] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage] = useState(10);
  const [editingMatkul, setEditingMatkul] = useState(null);
  const [loadingDelete, setLoadingDelete] = useState(false);

  useEffect(() => {
    const fetchMatkulList = async () => {
      try {
        const response = await axios.get('/api/admin/matkul');
        setMatkulList(response.data.data);
      } catch (error) {
        console.error('Error fetching Mata Kuliah list:', error);
      }
    };
    fetchMatkulList();
  }, []);

  const filteredData = matkulList.filter((matkul) =>
    [matkul.kode_matkul, matkul.nama_matkul].some((field) =>
      field?.toLowerCase().includes(search.trim().toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredData.length / entriesPerPage);
  const currentData = filteredData.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const handleEdit = (matkul) => {
    setEditingMatkul(matkul);
  };

  const handleDelete = async (_id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus Mata Kuliah ini?')) {
      try {
        setLoadingDelete(true);
        await axios.delete(`/api/admin/matkul/${_id}`);
        setMatkulList((prevList) =>
          prevList.filter((matkul) => matkul._id !== _id)
        );
        alert('Mata Kuliah berhasil dihapus');
      } catch (error) {
        console.error('Error deleting Mata Kuliah:', error);
        alert('Gagal menghapus Mata Kuliah');
      } finally {
        setLoadingDelete(false);
      }
    }
  };

  const handleUpdateMatkul = async (updatedMatkul) => {
    try {
      await axios.put(`/api/admin/matkul/${updatedMatkul._id}`, updatedMatkul);
      setMatkulList((prevList) =>
        prevList.map((matkul) =>
          matkul._id === updatedMatkul._id ? updatedMatkul : matkul
        )
      );
      setEditingMatkul(null);
    } catch (error) {
      console.error('Error updating Mata Kuliah:', error);
    }
  };

  const handleCloseForm = () => {
    setEditingMatkul(null);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-lg font-semibold">Mata Kuliah</h2>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-auto border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring focus:border-blue-300 rounded-md"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto mt-5">
        <table className="min-w-full bg-white text-sm">
          <thead className="sticky top-0 bg-white">
            <tr className="border border-gray-300">
              <th className="py-3 px-4 font-semibold text-center">No</th>
              <th className="py-3 px-4 font-semibold text-center">
                Kode Matkul
              </th>
              <th className="py-3 px-4 font-semibold text-center">
                Nama Matkul
              </th>
              <th className="py-3 px-4 font-semibold text-center">
                Kode Prodi
              </th>
              <th className="py-3 px-4 font-semibold text-center">Semester</th>
              <th className="py-3 px-4 font-semibold text-center">
                Jumlah SKS
              </th>
              <th className="py-3 px-4 font-semibold text-center">Dosen</th>
              <th className="py-3 px-4 font-semibold text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((matkul, index) => (
              <tr key={matkul._id} className="border-gray-300">
                <td className="py-3 px-4 text-center">
                  {(currentPage - 1) * entriesPerPage + index + 1}
                </td>
                <td className="py-3 px-4 text-center">{matkul.kode_matkul}</td>
                <td className="py-3 px-4 text-center">{matkul.nama_matkul}</td>
                <td className="py-3 px-4 text-center">
                  {matkul.prodi
                    ? matkul.prodi.kd_prodi
                    : 'Prodi Tidak Diketahui'}
                </td>
                <td className="py-3 px-4 text-center">{matkul.semester}</td>
                <td className="py-3 px-4 text-center">{matkul.sks}</td>
                <td className="py-3 px-4 text-center">
                  {matkul.dosen
                    ? matkul.dosen.nama_dosen
                    : 'Dosen Tidak Diketahui'}
                </td>
                <td className="py-3 px-4 flex justify-center space-x-2">
                  <button
                    onClick={() => handleEdit(matkul)}
                    className="text-blue-500 hover:text-blue-700 transition"
                  >
                    <MdEdit className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(matkul._id)}
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

      {/* Pagination */}
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

      {editingMatkul && (
        <MatkulForm
          onClose={handleCloseForm}
          existingMatkul={editingMatkul}
          onSubmit={handleUpdateMatkul}
        />
      )}
    </div>
  );
}
