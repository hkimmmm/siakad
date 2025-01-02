import axios from 'axios';
import Button from '../elements/Button';
import JadwalForm from '../screens/jadwal/JadwalForm';
import React, { useState, useEffect } from 'react';
import {
  MdChevronLeft,
  MdChevronRight,
  MdEdit,
  MdDelete
} from 'react-icons/md';

export default function JadwalTable() {
  const [jadwalList, setJadwalList] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage] = useState(10);
  const [editingJadwal, setEditingJadwal] = useState(null);
  const [loadingDelete, setLoadingDelete] = useState(false);

  useEffect(() => {
    const fetchJadwalList = async () => {
      try {
        const response = await axios.get('/api/admin/jadwal');
        setJadwalList(response.data.data);
      } catch (error) {
        console.error('Error fetching Jadwal list:', error);
      }
    };
    fetchJadwalList();
  }, []);

  const filteredData = jadwalList.filter((jadwal) =>
    [jadwal.hari, jadwal.matkul?.nama_matkul, jadwal.kelas?.nama_kelas].some(
      (field) => field?.toLowerCase().includes(search.trim().toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredData.length / entriesPerPage);
  const currentData = filteredData.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const handleEdit = (jadwal) => {
    setEditingJadwal(jadwal);
  };

  const handleDelete = async (_id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      try {
        setLoadingDelete(true);
        await axios.delete(`/api/admin/jadwal/${_id}`);
        setJadwalList((prevList) =>
          prevList.filter((jadwal) => jadwal._id !== _id)
        );
        alert('Jadwal berhasil dihapus');
      } catch (error) {
        console.error('Error deleting Jadwal:', error);
        alert('Gagal menghapus Jadwal');
      } finally {
        setLoadingDelete(false);
      }
    }
  };

  const handleUpdateJadwal = async (updatedJadwal) => {
    try {
      await axios.put(`/api/admin/jadwal/${updatedJadwal._id}`, updatedJadwal);
      setJadwalList((prevList) =>
        prevList.map((jadwal) =>
          jadwal._id === updatedJadwal._id ? updatedJadwal : jadwal
        )
      );
      setEditingJadwal(null);
    } catch (error) {
      console.error('Error updating Jadwal:', error);
    }
  };

  const handleCloseForm = () => {
    setEditingJadwal(null);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2>Jadwal Kuliah</h2>
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
                Mata Kuliah
              </th>
              <th className="py-3 px-4 font-semibold text-center">Kelas</th>
              <th className="py-3 px-4 font-semibold text-center">Dosen</th>
              <th className="py-3 px-4 font-semibold text-center">Hari</th>
              <th className="py-3 px-4 font-semibold text-center">Jam Mulai</th>
              <th className="py-3 px-4 font-semibold text-center">
                Jam Selesai
              </th>
              <th className="py-3 px-4 font-semibold text-center">Ruangan</th>
              <th className="py-3 px-4 font-semibold text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((jadwal, index) => (
              <tr key={jadwal._id} className="border-gray-300">
                <td className="py-3 px-4 text-center">
                  {(currentPage - 1) * entriesPerPage + index + 1}
                </td>
                <td className="py-3 px-4 text-center">
                  {jadwal.matkul?.nama_matkul || 'Tidak Diketahui'}
                </td>
                <td className="py-3 px-4 text-center">
                  {jadwal.kelas?.nama_kelas || 'Tidak Diketahui'}
                </td>
                <td className="py-3 px-4 text-center">
                  {jadwal.dosen?.nama_dosen || 'Tidak Diketahui'}
                </td>
                <td className="py-3 px-4 text-center">{jadwal.hari}</td>
                <td className="py-3 px-4 text-center">
                  {new Date(jadwal.jam_mulai).toLocaleTimeString()}
                </td>
                <td className="py-3 px-4 text-center">
                  {new Date(jadwal.jam_selesai).toLocaleTimeString()}
                </td>
                <td className="py-3 px-4 text-center">
                  {jadwal.ruangan?.kd_ruangan || 'Tidak Diketahui'}
                </td>
                <td className="py-3 px-4 flex justify-center space-x-2">
                  <button
                    onClick={() => handleEdit(jadwal)}
                    className="text-blue-500 hover:text-blue-700 transition"
                  >
                    <MdEdit className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(jadwal._id)}
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

      {editingJadwal && (
        <JadwalForm
          onClose={handleCloseForm}
          existingJadwal={editingJadwal}
          onSubmit={handleUpdateJadwal}
        />
      )}
    </div>
  );
}
