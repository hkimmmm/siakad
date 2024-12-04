import React, { useState } from 'react';
import {
  MdChevronLeft,
  MdChevronRight,
  MdEdit,
  MdDelete
} from 'react-icons/md';
import Button from '../elements/Button';

export default function KurikulumTable() {
  // State untuk input pencarian
  const [search, setSearch] = useState('');

  // State untuk paginasi
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 10;

  // Data kurikulum yang sudah diubah sesuai permintaan
  const data = [
    {
      id: 1,
      kodeKurikulum: 'KUR001',
      kodeMataKuliah: 'MK101',
      semester: 1,
      kodeProdi: 'TI'
    },
    {
      id: 2,
      kodeKurikulum: 'KUR002',
      kodeMataKuliah: 'MK102',
      semester: 1,
      kodeProdi: 'TI'
    },
    {
      id: 3,
      kodeKurikulum: 'KUR003',
      kodeMataKuliah: 'MK103',
      semester: 2,
      kodeProdi: 'TI'
    },
    {
      id: 4,
      kodeKurikulum: 'KUR004',
      kodeMataKuliah: 'MK104',
      semester: 2,
      kodeProdi: 'TI'
    },
    {
      id: 5,
      kodeKurikulum: 'KUR005',
      kodeMataKuliah: 'MK105',
      semester: 3,
      kodeProdi: 'TI'
    },
    {
      id: 6,
      kodeKurikulum: 'KUR006',
      kodeMataKuliah: 'MK106',
      semester: 3,
      kodeProdi: 'TI'
    },
    {
      id: 7,
      kodeKurikulum: 'KUR007',
      kodeMataKuliah: 'MK201',
      semester: 1,
      kodeProdi: 'TM'
    },
    {
      id: 8,
      kodeKurikulum: 'KUR008',
      kodeMataKuliah: 'MK202',
      semester: 1,
      kodeProdi: 'TM'
    },
    {
      id: 9,
      kodeKurikulum: 'KUR009',
      kodeMataKuliah: 'MK203',
      semester: 2,
      kodeProdi: 'TM'
    },
    {
      id: 10,
      kodeKurikulum: 'KUR010',
      kodeMataKuliah: 'MK204',
      semester: 2,
      kodeProdi: 'TM'
    },
    {
      id: 11,
      kodeKurikulum: 'KUR011',
      kodeMataKuliah: 'MK205',
      semester: 3,
      kodeProdi: 'TM'
    },
    {
      id: 12,
      kodeKurikulum: 'KUR012',
      kodeMataKuliah: 'MK206',
      semester: 3,
      kodeProdi: 'TM'
    }
  ];

  // Filter data berdasarkan input pencarian
  const filteredData = data.filter(
    (item) =>
      item.kodeKurikulum.toLowerCase().includes(search.toLowerCase()) ||
      item.kodeMataKuliah.toLowerCase().includes(search.toLowerCase()) ||
      item.kodeProdi.toLowerCase().includes(search.toLowerCase())
  );

  // Hitung total halaman
  const totalPages = Math.ceil(filteredData.length / entriesPerPage);

  // Ambil data untuk halaman saat ini
  const currentData = filteredData.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 h-[32rem]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Kurikulum Management</h2>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

      <div className="overflow-y-auto max-h-72">
        <table className="min-w-full bg-white text-sm">
          <thead className="sticky top-0 bg-white">
            <tr className="border-b border-t border-r border-l border-gray-300">
              <th className="py-3 px-4 font-semibold text-center">No</th>
              <th className="py-3 px-4 font-semibold text-center">
                Kode Kurikulum
              </th>
              <th className="py-3 px-4 font-semibold text-center">
                Kode Mata Kuliah
              </th>
              <th className="py-3 px-4 font-semibold text-center">Semester</th>
              <th className="py-3 px-4 font-semibold text-center">
                Kode Prodi
              </th>
              <th className="py-3 px-4 font-semibold text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((kurikulum, index) => (
              <tr key={kurikulum.id} className="border-b border-gray-300">
                <td className="py-3 px-4 text-center">
                  {(currentPage - 1) * entriesPerPage + index + 1}
                </td>
                <td className="py-3 px-4 text-center">
                  {kurikulum.kodeKurikulum}
                </td>
                <td className="py-3 px-4 text-center">
                  {kurikulum.kodeMataKuliah}
                </td>
                <td className="py-3 px-4 text-center">{kurikulum.semester}</td>
                <td className="py-3 px-4 text-center">{kurikulum.kodeProdi}</td>
                <td className="py-3 px-4 flex justify-center space-x-2">
                  <button
                    onClick={() =>
                      console.log(`Edit kurikulum: ${kurikulum.id}`)
                    }
                    className="text-blue-500 hover:text-blue-700 transition"
                  >
                    <MdEdit className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() =>
                      console.log(`Delete kurikulum: ${kurikulum.id}`)
                    }
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

      <div className="mt-10 flex justify-between items-center">
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
    </div>
  );
}
