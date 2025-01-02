import Button from '../../elements/Button';
import FormField from '../../fragments/FormField';
import React, { useState, useEffect } from 'react';

export default function KelasForm({
  existingKelas,
  onSubmit,
  onClose,
  prodiOptions,
  akademikOptions
}) {
  const [namaKelas, setNamaKelas] = useState('');
  const [prodi, setProdi] = useState('');
  const [akademik, setAkademik] = useState('');
  const [jumlahMahasiswa, setJumlahMahasiswa] = useState('');

  useEffect(() => {
    if (existingKelas) {
      setNamaKelas(existingKelas.nama_kelas);
      setProdi(existingKelas.prodi._id);
      setAkademik(existingKelas.akademik._id);
      setJumlahMahasiswa(existingKelas.jumlah_mahasiswa);
    } else {
      setNamaKelas('');
      setProdi('');
      setAkademik('');
      setJumlahMahasiswa('');
    }
  }, [existingKelas]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!namaKelas || !prodi || !akademik || !jumlahMahasiswa) {
      alert('Semua field harus diisi!');
      return;
    }

    const formData = {
      nama_kelas: namaKelas,
      prodi,
      akademik,
      jumlah_mahasiswa: jumlahMahasiswa
    };

    if (onSubmit) {
      console.log('Calling onSubmit with:', formData);
      onSubmit(formData);
    } else {
      console.error('onSubmit is not a function or is undefined.');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">
          {existingKelas ? 'Edit Kelas' : 'Tambah Kelas'}
        </h2>
        <form onSubmit={handleSubmit}>
          <FormField
            label="Nama Kelas"
            type="text"
            placeholder="Nama kelas"
            value={namaKelas}
            onChange={(e) => setNamaKelas(e.target.value)}
          />
          <FormField
            label="Program Studi"
            type="select"
            placeholder="Pilih Program Studi"
            value={prodi}
            onChange={(e) => setProdi(e.target.value)}
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
          >
            {akademikOptions.map((akademikItem) => (
              <option key={akademikItem._id} value={akademikItem._id}>
                {akademikItem.th_akademik} ({akademikItem.semester})
              </option>
            ))}
          </FormField>
          <FormField
            label="Jumlah Mahasiswa"
            type="number"
            placeholder="Jumlah mahasiswa"
            value={jumlahMahasiswa}
            onChange={(e) => setJumlahMahasiswa(e.target.value)}
          />

          <div className="mt-4 flex justify-between">
            <Button label="Batal" variant="secondary" onClick={onClose} />
            <Button label="Simpan" variant="primary" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
}
