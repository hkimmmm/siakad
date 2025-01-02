import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import Button from '../../elements/Button';
import MainLayout from '../../layouts/MainLayout';
import MahasiswaTable from '../../fragments/MahasiswaTable';

const DaftarMahasiswa = () => {
  const [mahasiswaList, setMahasiswaList] = useState([]); // Menyimpan daftar mahasiswa
  const [akademikOptions, setAkademikOptions] = useState([]); // Menyimpan pilihan akademik
  const [kelasOptions, setKelasOptions] = useState([]); // Menyimpan pilihan kelas
  const [prodiOptions, setProdiOptions] = useState([]); // Menyimpan pilihan program studi
  const [loading, setLoading] = useState(false); // Menyimpan status loading
  const router = useRouter(); // Untuk navigasi

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Menandai data sedang dimuat
      try {
        // Mengambil data dari API secara bersamaan
        const [
          mahasiswaResponse,
          kelasResponse,
          prodiResponse,
          akademikResponse
        ] = await Promise.all([
          axios.get('/api/admin/mahasiswa'),
          axios.get('/api/admin/kelas'),
          axios.get('/api/admin/prodi'),
          axios.get('/api/admin/akademik')
        ]);

        setMahasiswaList(mahasiswaResponse.data.data || []); // Menyimpan daftar mahasiswa
        setKelasOptions(kelasResponse.data.data || []); // Menyimpan daftar kelas
        setProdiOptions(prodiResponse.data.data || []); // Menyimpan daftar program studi
        setAkademikOptions(akademikResponse.data.data || []); // Menyimpan daftar akademik
      } catch (error) {
        console.error('Terjadi kesalahan saat mengambil data:', error);
      } finally {
        setLoading(false); // Mengubah status loading menjadi selesai
      }
    };

    fetchData();
  }, []); // Hanya dijalankan sekali saat komponen pertama kali dimuat

  // Fungsi untuk menghapus mahasiswa
  const handleDelete = async (_id) => {
    try {
      if (window.confirm('Apakah Anda yakin ingin menghapus Mahasiswa ini?')) {
        await axios.delete(`/api/admin/mahasiswa/${_id}`);

        // Optimistic Update: Menghapus mahasiswa dari daftar tanpa memanggil API lagi
        setMahasiswaList((prevList) =>
          prevList.filter((item) => item._id !== _id)
        );

        alert('Mahasiswa berhasil dihapus');
      }
    } catch (error) {
      console.error('Terjadi kesalahan saat menghapus Mahasiswa:', error);
      alert('Gagal menghapus Mahasiswa');
    }
  };

  // Fungsi untuk menambah data mahasiswa
  const handleAddData = () => {
    router.push('/admin/mahasiswa/tambah'); // Navigasi ke halaman tambah mahasiswa
  };

  // Fungsi untuk mengedit data mahasiswa
  const handleEdit = (mahasiswa) => {
    const editUrl = `/admin/mahasiswa/edit?id=${mahasiswa._id}`; // URL untuk halaman edit
    router.push(editUrl); // Navigasi ke halaman edit mahasiswa
  };

  return (
    <MainLayout>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Daftar Mahasiswa</h1>
        <Button
          label="Tambah Data"
          icon="edit"
          onClick={handleAddData}
          variant="primary"
        />
      </div>
      <div className="mt-5">
        {/* Menampilkan indikator loading jika data sedang dimuat */}
        {loading ? (
          <div>Loading...</div>
        ) : (
          <MahasiswaTable
            mahasiswaList={mahasiswaList}
            onEdit={handleEdit} // Melempar fungsi onEdit
            onDelete={handleDelete} // Melempar fungsi onDelete
          />
        )}
      </div>
    </MainLayout>
  );
};

export default DaftarMahasiswa;
