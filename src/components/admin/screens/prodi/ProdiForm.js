import Button from '../../elements/Button';
import FormField from '../../fragments/FormField';
import React, { useState, useEffect } from 'react';

export default function ProdiForm({ existingProdi, onSubmit, onClose }) {
  const [kdProdi, setKdProdi] = useState('');
  const [namaProdi, setNamaProdi] = useState('');
  const [jenjang, setJenjang] = useState('');

  useEffect(() => {
    if (existingProdi) {
      setKdProdi(existingProdi.kd_prodi);
      setNamaProdi(existingProdi.nama_prodi);
      setJenjang(existingProdi.jenjang);
    } else {
      setKdProdi('');
      setNamaProdi('');
      setJenjang('');
    }
  }, [existingProdi]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!kdProdi || !namaProdi || !jenjang) {
      alert('Semua field harus diisi!');
      return;
    }

    const formData = {
      kd_prodi: kdProdi,
      nama_prodi: namaProdi,
      jenjang,
      ...(existingProdi && { _id: existingProdi._id })
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
          {existingProdi ? 'Edit Program Studi' : 'Tambah Program Studi'}
        </h2>
        <form onSubmit={handleSubmit}>
          <FormField
            label="Kode Prodi"
            type="text"
            placeholder="Kode prodi"
            value={kdProdi}
            onChange={(e) => setKdProdi(e.target.value)}
            disabled={!!existingProdi}
          />
          <FormField
            label="Nama Prodi"
            type="text"
            placeholder="Nama prodi"
            value={namaProdi}
            onChange={(e) => setNamaProdi(e.target.value)}
          />
          <FormField
            label="Jenjang"
            type="text"
            placeholder="Jenjang"
            value={jenjang}
            onChange={(e) => setJenjang(e.target.value)}
          />
          <div className="flex justify-end space-x-2">
            <Button label="Batal" onClick={onClose} variant="secondary" />
            <Button label="Simpan" type="submit" variant="primary" />
          </div>
        </form>
      </div>
    </div>
  );
}
