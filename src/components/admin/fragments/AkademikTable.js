import axios from 'axios';
import Button from '../elements/Button';
import AkademikForm from '../screens/akademik/AkademikForm';
import React, { useState, useEffect } from 'react';
import {
  MdChevronLeft,
  MdChevronRight,
  MdEdit,
  MdDelete
} from 'react-icons/md';

export default function AkademikTable() {
  const [akademikList, setAkademikList] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage] = useState(10);
  const [editingAkadmik, setEditingAkademik] = useState(null);
  const [loadingDelete, setLoadingDelete] = useState(false);

  useEffect(() => {
    const fetchAkademikList = async () => {
      try {
        const response = await axios.get('/api/admin/akademik');
        setAkademikList(response.data.data);
      } catch (error) {
        console.error('Error fetching Akademik list:', error);
      }
    };
    fetchAkademikList();
  }, []);

  const filteredData = akademikList.filter(
    (akademik) =>
      akademik.th_akademik.toString().includes(search) ||
      akademik.semester.toString().includes(search)
  );

  const totalPages = Math.ceil(filteredData.length / entriesPerPage);
  const currentData = filteredData.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const handleEdit = (akademik) => {
    setEditingAkademik(akademik);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this Akademik?')) {
      try {
        setLoadingDelete(true);
        await axios.delete(`/api/admin/akademik/${id}`);
        setAkademikList((prevList) =>
          prevList.filter((akademik) => akademik._id !== id)
        );
      } catch (error) {
        console.error('Error deleting Akademik:', error);
      } finally {
        setLoadingDelete(false);
      }
    }
  };

  const handleUpdateAkademik = async (updatedAkademik) => {
    try {
      await axios.put(
        `/api/admin/akademik/${updatedAkademik._id}`,
        updatedAkademik
      );
      setAkademikList((prevList) =>
        prevList.map((akademik) =>
          akademik._id === updatedAkademik._id ? updatedAkademik : akademik
        )
      );
      setEditingAkademik(null);
    } catch (error) {
      console.error('Error updating Akademik:', error);
    }
  };

  const handleCloseForm = () => {
    setEditingAkademik(null);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
        <h2 className="text-lg font-semibold">Akademik Management</h2>
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
                Tahun Akademik
              </th>
              <th className="py-3 px-4 font-semibold text-center">Semester</th>
              <th className="py-3 px-4 font-semibold text-center">Status</th>
              <th className="py-3 px-4 font-semibold text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((akademik, index) => (
              <tr key={akademik._id} className="border-gray-300">
                <td className="py-3 px-4 text-center">
                  {(currentPage - 1) * entriesPerPage + index + 1}
                </td>
                <td className="py-3 px-4 text-center">
                  {akademik.th_akademik}
                </td>
                <td className="py-3 px-4 text-center">{akademik.semester}</td>
                <td className="py-3 px-4 text-center">
                  {akademik.status ? 'Aktif' : 'Tidak Aktif'}
                </td>
                <td className="py-3 px-4 flex justify-center gap-2">
                  <button
                    onClick={() => handleEdit(akademik)}
                    className="text-blue-500 hover:text-blue-700 transition"
                  >
                    <MdEdit className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(akademik._id)}
                    className="text-red-500 hover:text-red-700 transition"
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

      {editingAkadmik && (
        <AkademikForm
          onClose={handleCloseForm}
          existingAkademik={editingAkadmik}
          onSubmit={handleUpdateAkademik}
        />
      )}
    </div>
  );
}
