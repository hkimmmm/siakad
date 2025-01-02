import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import MainLayout from '../../layouts/MainLayout';
import Button from '../../elements/Button';
import FormField from '../../fragments/FormField';
import axios from 'axios';

const MahasiswaTambah = () => {
  // State management
  const [nim, setNIM] = useState('');
  const [namaMahasiswa, setNamaMahasiswa] = useState('');
  const [prodi, setProdi] = useState('');
  const [kelas, setKelas] = useState('');
  const [akademik, setAkademik] = useState('');
  const [gambar, setGambar] = useState(null);
  const [email, setEmail] = useState('');
  const [noTelepon, setNoTelepon] = useState('');
  const [alamat, setAlamat] = useState('');
  const [status, setStatus] = useState('Aktif');
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);

  const [prodiOptions, setProdiOptions] = useState([]);
  const [kelasOptions, setKelasOptions] = useState([]);
  const [akademikOptions, setAkademikOptions] = useState([]);
  const [loadingDropdown, setLoadingDropdown] = useState(true);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [prodiRes, kelasRes, akademikRes] = await Promise.all([
          axios.get('/api/admin/prodi'),
          axios.get('/api/admin/kelas'),
          axios.get('/api/admin/akademik')
        ]);

        setProdiOptions(prodiRes.data.data || []);
        setKelasOptions(kelasRes.data.data || []);
        setAkademikOptions(akademikRes.data.data || []);
      } catch (error) {
        console.error('Error fetching options:', error);
        alert('Gagal memuat data dropdown. Silakan coba lagi nanti.');
      } finally {
        setLoadingDropdown(false);
      }
    };

    fetchOptions();

    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));

      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'my-upload-preset');
      formData.append('cloud_name', 'dald47hpx');

      try {
        const response = await axios.post(
          'https://api.cloudinary.com/v1_1/dald47hpx/image/upload',
          formData
        );
        setGambar(response.data.secure_url);
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Gagal mengunggah gambar!');
      }
    }
  };

  const validateForm = () => {
    const validationErrors = {};
    if (!nim) validationErrors.nim = 'NIM wajib diisi.';
    if (!namaMahasiswa)
      validationErrors.namaMahasiswa = 'Nama mahasiswa wajib diisi.';
    if (!prodi) validationErrors.prodi = 'Program studi wajib dipilih.';
    if (!kelas) validationErrors.kelas = 'Kelas wajib dipilih.';
    if (!akademik) validationErrors.akademik = 'Semester wajib dipilih.';
    if (!email) validationErrors.email = 'Email wajib diisi.';
    if (!noTelepon) validationErrors.noTelepon = 'Nomor telepon wajib diisi.';
    if (!alamat) validationErrors.alamat = 'Alamat wajib diisi.';
    if (!status) validationErrors.status = 'Status wajib dipilih.';
    if (!gambar) validationErrors.gambar = 'Gambar wajib diunggah.';
    return validationErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    const formData = {
      nim,
      nama_mahasiswa: namaMahasiswa,
      prodi,
      kelas,
      akademik,
      email,
      no_telepon: noTelepon,
      alamat,
      status,
      gambar
    };

    try {
      await axios.post('/api/admin/mahasiswa', formData);
      alert('Data mahasiswa berhasil disimpan!');

      // Reset state setelah berhasil menyimpan
      setNIM('');
      setNamaMahasiswa('');
      setProdi('');
      setKelas('');
      setAkademik('');
      setEmail('');
      setNoTelepon('');
      setAlamat('');
      setStatus('Aktif');
      setGambar(null);
      setImagePreview(null);
      setErrors({});
    } catch (error) {
      console.error('Error saving mahasiswa:', error);
      alert('Terjadi kesalahan saat menyimpan data.');
    }
  };

  return (
    <MainLayout>
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-6xl mx-auto mt-8">
        <h2 className="text-xl font-semibold mb-4">Tambah Mahasiswa</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Gambar */}
            <div className="col-span-1 bg-white rounded-lg p-4 shadow text-center">
              <h3 className="font-semibold mb-4">Gambar</h3>
              <div className="flex flex-col items-center">
                {imagePreview ? (
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    className="rounded shadow mb-4"
                    width={128}
                    height={128}
                  />
                ) : (
                  <div className="w-32 h-32 bg-gray-200 rounded shadow mb-4 flex items-center justify-center">
                    <span className="text-gray-500">Pratinjau</span>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="text-sm text-gray-600 mt-2"
                  onChange={handleFileChange}
                />
                {errors.gambar && (
                  <p className="text-red-500 text-sm mt-2">{errors.gambar}</p>
                )}
              </div>
            </div>

            {/* Informasi Kontak */}
            <div className="col-span-2 bg-white rounded-lg p-4 shadow">
              <h3 className="font-semibold mb-4">Informasi Kontak</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  label="Nama Mahasiswa"
                  type="text"
                  placeholder="Masukkan Nama Mahasiswa"
                  value={namaMahasiswa}
                  onChange={(e) => setNamaMahasiswa(e.target.value)}
                  error={errors.namaMahasiswa}
                />
                <FormField
                  label="NIM"
                  type="number"
                  placeholder="Masukkan NIM"
                  value={nim}
                  onChange={(e) => setNIM(e.target.value)}
                  error={errors.nim}
                />
                <FormField
                  label="Email"
                  type="email"
                  placeholder="Masukkan Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={errors.email}
                />
                <FormField
                  label="Nomor Telepon"
                  type="text"
                  placeholder="Masukkan Nomor Telepon"
                  value={noTelepon}
                  onChange={(e) => setNoTelepon(e.target.value)}
                  error={errors.noTelepon}
                />
                <FormField
                  label="Alamat"
                  type="textarea"
                  placeholder="Masukkan Alamat"
                  value={alamat}
                  onChange={(e) => setAlamat(e.target.value)}
                  error={errors.alamat}
                />
              </div>
            </div>

            {/* Informasi Akademik */}
            <div className="col-span-3 bg-white rounded-lg p-4 shadow">
              <h3 className="font-semibold mb-4">Informasi Akademik</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  label="Kelas"
                  type="select"
                  placeholder="Pilih Kelas"
                  value={kelas}
                  onChange={(e) => setKelas(e.target.value)}
                  error={errors.kelas}
                  disabled={loadingDropdown}
                >
                  {kelasOptions.map((kelasItem) => (
                    <option key={kelasItem._id} value={kelasItem._id}>
                      {kelasItem.nama_kelas}
                    </option>
                  ))}
                </FormField>
                <FormField
                  label="Program Studi"
                  type="select"
                  placeholder="Pilih Program Studi"
                  value={prodi}
                  onChange={(e) => setProdi(e.target.value)}
                  error={errors.prodi}
                  disabled={loadingDropdown}
                >
                  {prodiOptions.map((prodiItem) => (
                    <option key={prodiItem._id} value={prodiItem._id}>
                      {prodiItem.nama_prodi}
                    </option>
                  ))}
                </FormField>
                <FormField
                  label="Semester"
                  type="select"
                  placeholder="Pilih Semester"
                  value={akademik}
                  onChange={(e) => setAkademik(e.target.value)}
                  error={errors.akademik}
                  disabled={loadingDropdown}
                >
                  {akademikOptions.map((akademikItem) => (
                    <option key={akademikItem._id} value={akademikItem._id}>
                      {akademikItem.tahun_akademik} {akademikItem.semester}
                    </option>
                  ))}
                </FormField>
                <FormField
                  label="Status"
                  type="select"
                  placeholder="Pilih Status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="Aktif">Aktif</option>
                  <option value="Cuti">Cuti</option>
                </FormField>
              </div>
            </div>
          </div>

          <Button type="submit" className="mt-4" label="Simpan Mahasiswa" />
        </form>
      </div>
    </MainLayout>
  );
};

export default MahasiswaTambah;
