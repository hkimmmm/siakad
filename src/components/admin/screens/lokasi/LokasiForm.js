import Button from '../../elements/Button';
import FormField from '../../fragments/FormField';
import React, { useState, useEffect } from 'react';

export default function LokasiForm({ existingLokasi, onSubmit, onClose }) {
  const [namaLokasi, setNamaLokasi] = useState('');
  const [ipWifi, setIpWifi] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (existingLokasi) {
      setNamaLokasi(existingLokasi.nama_lokasi || '');
      setIpWifi(existingLokasi.ipWifi || '');
      setDeskripsi(existingLokasi.deskripsi || '');
    } else {
      resetForm();
    }
    setErrors({});
  }, [existingLokasi]);

  const resetForm = () => {
    setNamaLokasi('');
    setIpWifi('');
    setDeskripsi('');
    setErrors({});
  };

  const validateForm = () => {
    const validationErrors = {};
    if (!namaLokasi.trim())
      validationErrors.namaLokasi = 'Nama lokasi harus diisi.';
    if (!ipWifi.trim()) validationErrors.ipWifi = 'IP WiFi harus diisi.';
    if (!/^(\d{1,3}\.){3}\d{1,3}$/.test(ipWifi)) {
      validationErrors.ipWifi =
        'IP WiFi harus berupa format IP yang valid (contoh: 192.168.0.1).';
    }
    if (!deskripsi.trim())
      validationErrors.deskripsi = 'Deskripsi harus diisi.';
    return validationErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const formData = {
      nama_lokasi: namaLokasi,
      ipWifi,
      deskripsi,
      ...(existingLokasi && { _id: existingLokasi._id })
    };

    if (onSubmit) {
      await onSubmit(formData);
      resetForm(); // Reset form setelah berhasil submit
    } else {
      console.error('onSubmit is not defined or is not a function');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">
          {existingLokasi ? 'Edit Titik Lokasi' : 'Tambah Titik Lokasi'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              label="Nama Lokasi"
              type="text"
              placeholder="Masukkan Nama Lokasi"
              value={namaLokasi}
              disabled={!!existingLokasi}
              onChange={(e) => setNamaLokasi(e.target.value)}
              error={errors.namaLokasi}
            />
            <FormField
              label="IP WiFi"
              type="text"
              placeholder="Masukkan IP WiFi"
              value={ipWifi}
              onChange={(e) => setIpWifi(e.target.value)}
              error={errors.ipWifi}
            />
          </div>

          <FormField
            label="Deskripsi"
            type="text"
            placeholder="Isi Deskripsi"
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
            error={errors.deskripsi}
          />

          <div className="flex justify-end space-x-2 mt-6">
            <Button label="Batal" onClick={onClose} variant="secondary" />
            <Button label="Simpan" type="submit" variant="primary" />
          </div>
        </form>
      </div>
    </div>
  );
}
