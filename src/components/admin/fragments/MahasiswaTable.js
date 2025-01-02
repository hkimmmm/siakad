import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import Button from '../elements/Button';

const MahasiswaTable = ({ mahasiswaList, onEdit, onDelete }) => {
  const [search, setSearch] = useState(''); // Menyimpan nilai pencarian
  const [currentPage, setCurrentPage] = useState(1); // Menyimpan halaman saat ini
  const [loading, setLoading] = useState(false); // Menyimpan status loading
  const [filteredMahasiswa, setFilteredMahasiswa] = useState(mahasiswaList); // Menyimpan daftar mahasiswa yang difilter
  const entriesPerPage = 10; // Menentukan jumlah entri per halaman

  // Filter data berdasarkan pencarian nama mahasiswa
  useEffect(() => {
    setFilteredMahasiswa(
      mahasiswaList.filter((mahasiswa) =>
        mahasiswa.nama_mahasiswa?.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [mahasiswaList, search]); // Mengupdate hasil filter ketika mahasiswaList atau search berubah

  // Pagination
  const totalPages = Math.ceil(filteredMahasiswa.length / entriesPerPage); // Menghitung total halaman
  const currentEntries = filteredMahasiswa.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  // Konfirmasi sebelum menghapus mahasiswa
  const handleDeleteConfirmation = (id) => {
    const confirmDelete = window.confirm(
      'Apakah Anda yakin ingin menghapus mahasiswa ini?'
    );
    if (confirmDelete) {
      handleDelete(id);
    }
  };

  // Menghapus mahasiswa
  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`/api/admin/mahasiswa/${id}`);
      alert('Mahasiswa berhasil dihapus.');
      window.location.reload();
    } catch (error) {
      console.error('Error deleting mahasiswa:', error);
      alert('Gagal menghapus mahasiswa.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6">
      {/* Header dengan Pencarian */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Data Mahasiswa</h2>
        <input
          type="text"
          placeholder="Cari berdasarkan Nama..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

      {/* Tabel dengan body yang bisa digulir */}
      <div className="overflow-x-auto max-h-72">
        <table className="min-w-full">
          <thead className="sticky top-0 bg-white">
            <tr className="border border-gray-300">
              <th className="py-2 px-4 font-semibold text-xs">No</th>
              <th className="py-2 px-4 font-semibold text-xs">Foto</th>
              <th className="py-2 px-4 font-semibold text-xs">NIM</th>
              <th className="py-2 px-4 font-semibold text-xs">
                Nama Mahasiswa
              </th>
              <th className="py-2 px-4 font-semibold text-xs">Kode Prodi</th>
              <th className="py-2 px-4 font-semibold text-xs">Kelas</th>
              <th className="py-2 px-4 font-semibold text-xs">Tahun Masuk</th>
              <th className="py-2 px-4 font-semibold text-xs">Semester</th>
              <th className="py-2 px-4 font-semibold text-xs">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredMahasiswa.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center py-4">
                  Data tidak ditemukan
                </td>
              </tr>
            ) : (
              currentEntries.map((mahasiswa, index) => (
                <tr
                  key={mahasiswa._id}
                  className="text-center hover:bg-gray-100"
                >
                  <td className="px-2 py-2 text-xs">
                    {(currentPage - 1) * entriesPerPage + index + 1}
                  </td>
                  <td className="px-2 py-2 text-xs">
                    <div className="relative w-10 h-10 mx-auto">
                      <Image
                        src={mahasiswa.gambar || '/default-avatar.png'}
                        alt={`Foto ${mahasiswa.nama_mahasiswa}`}
                        layout="fill"
                        objectFit="cover"
                        className="rounded-full"
                      />
                    </div>
                  </td>
                  <td className="px-2 py-2 text-xs">{mahasiswa.nim}</td>
                  <td className="px-2 py-2 text-xs">
                    {mahasiswa.nama_mahasiswa}
                  </td>
                  <td className="px-2 py-2 text-xs">
                    {mahasiswa.prodi?.kd_prodi || 'Tidak Diketahui'}
                  </td>
                  <td className="px-2 py-2 text-xs">
                    {mahasiswa.kelas?.nama_kelas || '-'}
                  </td>
                  <td className="px-2 py-2 text-xs">
                    {mahasiswa.akademik?.th_akademik || 'tidak diketahui'}
                  </td>
                  <td className="px-2 py-2 text-xs">
                    {mahasiswa.akademik?.semester || 'tidak diketahui'}
                  </td>
                  <td className="px-2 py-2 text-xs flex justify-center space-x-2">
                    <Button
                      label="Detail"
                      variant="primary"
                      onClick={() =>
                        console.log(`Detail ${mahasiswa.nama_mahasiswa}`)
                      }
                      icon="detail"
                    />
                    <Button
                      label="Edit"
                      variant="secondary"
                      onClick={() => onEdit(mahasiswa)} // Mengirim fungsi onEdit
                      icon="edit"
                    />
                    <Button
                      label="Hapus"
                      variant="danger"
                      onClick={() => handleDeleteConfirmation(mahasiswa._id)} // Mengirim fungsi onDelete
                      icon="delete"
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          className="p-2 text-sm"
          onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
        >
          <MdChevronLeft />
        </button>
        <span className="text-sm">{`${currentPage} dari ${totalPages}`}</span>
        <button
          className="p-2 text-sm"
          onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
        >
          <MdChevronRight />
        </button>
      </div>
    </div>
  );
};

export default MahasiswaTable;
