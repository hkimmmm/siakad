import React, { useState } from 'react';
import {
  MdChevronLeft,
  MdChevronRight,
  MdEdit,
  MdDelete,
  MdInfo
} from 'react-icons/md';

const MahasiswaTable = ({ data }) => {
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 10;

  const filteredData = data.filter((mahasiswa) =>
    mahasiswa.nama_mahasiswa.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / entriesPerPage);

  const currentEntries = filteredData.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6">
      {/* Header with Search */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Data Mahasiswa</h2>
        <input
          type="text"
          placeholder="Search by Nama..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

      {/* Table with Scrollable Body */}
      <div className="overflow-x-auto max-h-72">
        <table className="min-w-full">
          <thead className="sticky top-0 bg-white">
            <tr className="border-t border-l border-b border-r border-gray-300">
              <th className="py-2 px-4 font-semibold text-xs">No</th>
              <th className="py-2 px-4 font-semibold text-xs">NIM</th>
              <th className="py-2 px-4 font-semibold text-xs">
                Nama Mahasiswa
              </th>
              <th className="py-2 px-4 font-semibold text-xs">Kode Prodi</th>
              <th className="py-2 px-4 font-semibold text-xs">Kelas</th>
              <th className="py-2 px-4 font-semibold text-xs">Tahun Masuk</th>
              <th className="py-2 px-4 font-semibold text-xs">Semester</th>
              <th className="py-2 px-4 font-semibold text-xs">Email</th>
              <th className="py-2 px-4 font-semibold text-xs">No telp</th>
              <th className="py-2 px-4 font-semibold text-xs">Alamat</th>
              <th className="py-2 px-4 font-semibold text-xs">Status</th>
              <th className="py-2 px-4 font-semibold text-xs">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {currentEntries.map((mahasiswa, index) => (
              <tr key={index} className="text-center hover:bg-gray-100">
                <td className="px-2 py-2 text-xs">
                  {(currentPage - 1) * entriesPerPage + index + 1}
                </td>
                <td className="px-2 py-2 text-xs">{mahasiswa.nim}</td>
                <td className="px-2 py-2 text-xs">
                  {mahasiswa.nama_mahasiswa}
                </td>
                <td className="px-2 py-2 text-xs">{mahasiswa.kode_prodi}</td>
                <td className="px-2 py-2 text-xs">{mahasiswa.id_kelas}</td>
                <td className="px-2 py-2 text-xs">{mahasiswa.tahun_masuk}</td>
                <td className="px-2 py-2 text-xs">{mahasiswa.semester}</td>
                <td className="px-2 py-2 text-xs">{mahasiswa.email}</td>
                <td className="px-2 py-2 text-xs">{mahasiswa.no_telepon}</td>
                <td className="px-2 py-2 text-xs">{mahasiswa.alamat}</td>
                <td className="px-2 py-2 text-xs">{mahasiswa.status}</td>
                <td className="px-2 py-2 text-xs flex justify-center space-x-2">
                  <button
                    title="Detail"
                    className="text-blue-500 hover:text-blue-700 transition"
                    onClick={() =>
                      console.log(`Details for ${mahasiswa.nama_mahasiswa}`)
                    }
                  >
                    <MdInfo size={20} />
                  </button>
                  <button
                    title="Edit"
                    className="text-yellow-500 hover:text-yellow-700 transition"
                    onClick={() =>
                      console.log(`Edit ${mahasiswa.nama_mahasiswa}`)
                    }
                  >
                    <MdEdit size={20} />
                  </button>
                  <button
                    title="Hapus"
                    className="text-red-500 hover:text-red-700 transition"
                    onClick={() =>
                      console.log(`Delete ${mahasiswa.nama_mahasiswa}`)
                    }
                  >
                    <MdDelete size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-10 flex justify-between items-center">
        <p className="text-md text-gray-600">
          Showing {currentEntries.length} to{' '}
          {Math.min(currentPage * entriesPerPage, filteredData.length)} of{' '}
          {filteredData.length} entries
        </p>
        <div className="flex items-center">
          <button
            className="flex items-center text-gray-500 hover:text-blue-500 transition"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <MdChevronLeft className="h-5 w-5" />
          </button>
          <span className="mx-2 text-md text-gray-600">{currentPage}</span>
          <button
            className="flex items-center text-gray-500 hover:text-blue-500 transition"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            <MdChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MahasiswaTable;
