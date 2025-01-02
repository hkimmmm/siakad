import axios from 'axios';
import Button from '../elements/Button';
import KelasForm from '../screens/kelas/KelasForm';
import React, { useState, useEffect } from 'react';
import {
  MdChevronLeft,
  MdChevronRight,
  MdEdit,
  MdDelete
} from 'react-icons/md';

export default function KelasTable() {
  const [kelasList, setKelasList] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage] = useState(10);
  const [editingKelas, setEditingKelas] = useState(null);
  const [loadingDelete, setLoadingDelete] = useState(false);

  useEffect(() => {
    const fetchKelasList = async () => {
      try {
        const response = await axios.get('/api/admin/kelas');
        setKelasList(response.data.data);
      } catch (error) {
        console.error('Error fetching Kelas list:', error);
      }
    };
    fetchKelasList();
  }, []);

  const filteredData = kelasList.filter((kelas) =>
    kelas.nama_kelas.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / entriesPerPage);
  const currentData = filteredData.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const handleEdit = (kelas) => {
    setEditingKelas(kelas);
  };

  const handleDelete = async (nama_kelas) => {
    if (window.confirm('Are you sure you want to delete this Kelas?')) {
      try {
        setLoadingDelete(true);
        await axios.delete(`/api/admin/kelas/${nama_kelas}`);
        setKelasList((prevList) =>
          prevList.filter((kelas) => kelas.nama_kelas !== nama_kelas)
        );
      } catch (error) {
        console.error('Error deleting Kelas:', error);
      } finally {
        setLoadingDelete(false);
      }
    }
  };

  const handleUpdateKelas = async (updatedKelas) => {
    try {
      await axios.put(
        `/api/admin/kelas/${updatedKelas.nama_kelas}`,
        updatedKelas
      );
      setKelasList((prevList) =>
        prevList.map((kelas) =>
          kelas.nama_kelas === updatedKelas.nama_kelas ? updatedKelas : kelas
        )
      );
      setEditingKelas(null);
    } catch (error) {
      console.error('Error updating Kelas:', error);
    }
  };

  const handleCloseForm = () => {
    setEditingKelas(null);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-lg font-semibold">Kelas</h2>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-1/3 border border-gray-300 px-3 py-2 text-sm rounded-md focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full bg-white text-sm">
          <thead className="sticky top-0 bg-white">
            <tr className="border border-gray-300">
              <th className="py-3 px-4 font-semibold text-center">No</th>
              <th className="py-3 px-4 font-semibold text-center">
                Nama Kelas
              </th>
              <th className="py-3 px-4 font-semibold text-center">Prodi</th>
              <th className="py-3 px-4 font-semibold text-center">Semester</th>
              <th className="py-3 px-4 font-semibold text-center">
                Jumlah Mahasiswa
              </th>
              <th className="py-3 px-4 font-semibold text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((kelas, index) => (
              <tr key={kelas.nama_kelas} className=" border-gray-300">
                <td className="py-3 px-4 text-center">
                  {(currentPage - 1) * entriesPerPage + index + 1}
                </td>
                <td className="py-3 px-4 text-center">{kelas.nama_kelas}</td>
                <td className="py-3 px-4 text-center">
                  {kelas.prodi
                    ? kelas.prodi.nama_prodi
                    : 'Prodi Tidak Diketahui'}
                </td>
                <td className="py-3 px-4 text-center">
                  {kelas.akademik
                    ? kelas.akademik.semester
                    : 'Tahun Akademik Tidak Diketahui'}
                </td>
                <td className="py-3 px-4 text-center">
                  {kelas.jumlah_mahasiswa}
                </td>
                <td className="py-3 px-4 flex justify-center gap-2">
                  <button
                    onClick={() => handleEdit(kelas)}
                    className="text-blue-500 hover:text-blue-700 transition"
                  >
                    <MdEdit className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(kelas.nama_kelas)}
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

      {/* Pagination */}
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

      {editingKelas && (
        <KelasForm
          onClose={handleCloseForm}
          existingKelas={editingKelas}
          onSubmit={handleUpdateKelas}
        />
      )}
    </div>
  );
}
