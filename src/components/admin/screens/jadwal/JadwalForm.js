import Button from '../../elements/Button';
import FormField from '../../fragments/FormField';
import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

export default function JadwalForm({
  existingJadwal,
  onSubmit,
  onClose,
  matkulOptions,
  kelasOptions,
  dosenOptions,
  ruanganOptions
}) {
  const [matkul, setMatkul] = useState('');
  const [kelas, setKelas] = useState('');
  const [dosen, setDosen] = useState('');
  const [hari, setHari] = useState('');
  const [jamMulai, setJamMulai] = useState('');
  const [jamSelesai, setJamSelesai] = useState('');
  const [ruangan, setRuangan] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (existingJadwal) {
      setMatkul(existingJadwal.matkul?.id || '');
      setKelas(existingJadwal.kelas?.id || '');
      setDosen(existingJadwal.dosen?.id || '');
      setHari(existingJadwal.hari || '');
      setJamMulai(existingJadwal.jam_mulai || '');
      setJamSelesai(existingJadwal.jam_selesai || '');
      setRuangan(existingJadwal.ruangan?.id || '');
    } else {
      resetForm();
    }
    setErrors({});
  }, [existingJadwal]);

  const resetForm = () => {
    setMatkul('');
    setKelas('');
    setDosen('');
    setHari('');
    setJamMulai('');
    setJamSelesai('');
    setRuangan('');
    setErrors({});
  };

  const validateForm = () => {
    const validationErrors = {};

    if (!matkul) validationErrors.matkul = 'Matakuliah is required';
    if (!kelas) validationErrors.kelas = 'Kelas is required';
    if (!dosen) validationErrors.dosen = 'Dosen is required';
    if (!hari) validationErrors.hari = 'Hari is required';
    if (!jamMulai) validationErrors.jamMulai = 'Jam Mulai is required';
    if (!jamSelesai) validationErrors.jamSelesai = 'Jam Selesai is required';
    if (!ruangan) validationErrors.ruangan = 'Ruangan is required';

    return validationErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const currentDate = new Date().toISOString().split('T')[0];

    const formattedJamMulai = `${currentDate}T${jamMulai}:00`;
    const formattedJamSelesai = `${currentDate}T${jamSelesai}:00`;

    const parsedJamMulai = new Date(formattedJamMulai);
    const parsedJamSelesai = new Date(formattedJamSelesai);

    if (isNaN(parsedJamMulai) || isNaN(parsedJamSelesai)) {
      setErrors({
        ...validationErrors,
        jamMulai: 'Jam Mulai tidak valid',
        jamSelesai: 'Jam Selesai tidak valid'
      });
      return;
    }

    const formData = {
      matkul,
      kelas,
      dosen,
      hari,
      jam_mulai: parsedJamMulai.toISOString(),
      jam_selesai: parsedJamSelesai.toISOString(),
      ruangan,
      ...(existingJadwal && { _id: existingJadwal._id })
    };

    if (onSubmit && typeof onSubmit === 'function') {
      try {
        await onSubmit(formData);
        alert('Data berhasil disimpan!');
      } catch (error) {
        console.error('Error saat mengirim data:', error);
        alert(`Terjadi kesalahan: ${error.message}`);
      }
    } else {
      console.error('onSubmit is not defined or is not a function.');
      alert('Terjadi kesalahan: Fungsi submit tidak ditemukan');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-3xl">
        <h2 className="text-xl font-semibold mb-6">
          {existingJadwal ? 'Edit Jadwal' : 'Tambah Jadwal'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <FormField
              label="Matakuliah"
              type="select"
              placeholder="Pilih Matakuliah"
              value={matkul}
              onChange={(e) => setMatkul(e.target.value)}
              error={errors.matkul}
            >
              {matkulOptions?.map((jadwalItem) => (
                <option key={jadwalItem._id} value={jadwalItem._id}>
                  {jadwalItem.nama_matkul}
                </option>
              ))}
            </FormField>

            <FormField
              label="Kelas"
              type="select"
              placeholder="Pilih Kelas"
              value={kelas}
              onChange={(e) => setKelas(e.target.value)}
              error={errors.kelas}
            >
              {kelasOptions?.map((kelasItem) => (
                <option key={kelasItem._id} value={kelasItem._id}>
                  {kelasItem.nama_kelas}
                </option>
              ))}
            </FormField>

            <FormField
              label="Dosen"
              type="select"
              placeholder="Pilih Dosen Pengajar"
              value={dosen}
              onChange={(e) => setDosen(e.target.value)}
              error={errors.dosen}
            >
              {dosenOptions?.map((dosenItem) => (
                <option key={dosenItem._id} value={dosenItem._id}>
                  {dosenItem.nama_dosen}
                </option>
              ))}
            </FormField>

            <FormField
              label="Hari"
              type="select"
              placeholder="Pilih Hari"
              value={hari}
              onChange={(e) => setHari(e.target.value)}
              error={errors.hari}
            >
              <option value="Senin">Senin</option>
              <option value="Selasa">Selasa</option>
              <option value="Rabu">Rabu</option>
              <option value="Kamis">Kamis</option>
              <option value="Jumat">Jumat</option>
              <option value="Sabtu">Sabtu</option>
              <option value="Minggu">Minggu</option>
            </FormField>

            <FormField
              label="Jam Mulai"
              type="time"
              placeholder="Pilih Jam Mulai"
              value={jamMulai}
              onChange={(e) => setJamMulai(e.target.value)}
              error={errors.jamMulai}
            />

            <FormField
              label="Jam Selesai"
              type="time"
              placeholder="Pilih Jam Selesai"
              value={jamSelesai}
              onChange={(e) => setJamSelesai(e.target.value)}
              error={errors.jamSelesai}
            />

            <FormField
              label="Ruangan"
              type="select"
              placeholder="Pilih Ruangan"
              value={ruangan}
              onChange={(e) => setRuangan(e.target.value)}
              error={errors.ruangan}
            >
              {ruanganOptions?.map((ruanganItem) => (
                <option key={ruanganItem._id} value={ruanganItem._id}>
                  {ruanganItem.nama_ruangan}
                </option>
              ))}
            </FormField>
          </div>
          <div className="flex justify-end space-x-2 mt-6">
            <Button label="Batal" variant="secondary" onClick={onClose} />
            <Button label="Simpan" variant="primary" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
}
