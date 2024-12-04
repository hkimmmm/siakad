import Button from '../../elements/Button';
import FormField from '../../fragments/FormField';
import React, { useState, useEffect } from 'react';

export default function DosenForm({ existingDosen, onSubmit, onClose }) {
  const [kdDosen, setKdDosen] = useState('');
  const [namaDosen, setNamaDosen] = useState('');
  const [nip, setNIP] = useState('');
  const [email, setEmail] = useState('');
  const [noTelepon, setNoTelepon] = useState('');
  const [alamat, setAlamat] = useState('');
  const [gelar, setGelar] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (existingDosen) {
      setKdDosen(existingDosen.kode_dosen || '');
      setNamaDosen(existingDosen.nama_dosen || '');
      setNIP(existingDosen.nip || '');
      setEmail(existingDosen.email || '');
      setNoTelepon(existingDosen.no_telepon || '');
      setAlamat(existingDosen.alamat || '');
      setGelar(existingDosen.gelar || '');
    } else {
      resetForm();
    }
  }, [existingDosen]);

  const resetForm = () => {
    setKdDosen('');
    setNamaDosen('');
    setNIP('');
    setEmail('');
    setNoTelepon('');
    setAlamat('');
    setGelar('');
    setErrors({});
  };

  const validateForm = () => {
    const validationErrors = {};
    if (!kdDosen) validationErrors.kdDosen = 'Kode Dosen harus diisi';
    if (!namaDosen) validationErrors.namaDosen = 'Nama Dosen harus diisi';
    if (!nip) validationErrors.nip = 'NIP harus diisi';
    if (!email) validationErrors.email = 'Email harus diisi';
    if (!noTelepon) validationErrors.noTelepon = 'No Telepon harus diisi';
    if (!alamat) validationErrors.alamat = 'Alamat harus diisi';
    if (!gelar) validationErrors.gelar = 'Gelar harus diisi';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) {
      validationErrors.email = 'Email tidak valid';
    }

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
      kode_dosen: kdDosen,
      nama_dosen: namaDosen,
      nip,
      email,
      no_telepon: noTelepon,
      alamat,
      gelar,
      ...(existingDosen && { _id: existingDosen._id })
    };

    if (onSubmit) {
      console.log('Submitting form data:', formData);
      onSubmit(formData);
    } else {
      console.error('onSubmit is not a function or is undefined.');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-3xl">
        <h2 className="text-xl font-semibold mb-4">
          {existingDosen ? 'Edit Dosen' : 'Tambah Dosen'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              label="Kode Dosen"
              type="text"
              placeholder="Kode Dosen"
              id="kode_dosen"
              value={kdDosen}
              disabled={!!existingDosen}
              onChange={(e) => setKdDosen(e.target.value)}
              error={errors.kdDosen}
            />
            <FormField
              label="Nama Dosen"
              type="text"
              placeholder="Nama Dosen"
              id="nama_dosen"
              value={namaDosen}
              onChange={(e) => setNamaDosen(e.target.value)}
              error={errors.namaDosen}
            />
            <FormField
              label="NIP"
              type="number"
              placeholder="NIP"
              id="nip"
              value={nip}
              onChange={(e) => setNIP(e.target.value)}
              error={errors.nip}
            />
            <FormField
              label="Email"
              type="email"
              placeholder="Masukkan Email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              error={errors.email}
            />
            <FormField
              label="No Telepon"
              type="number"
              placeholder="Masukkan No Telepon"
              id="no_telepon"
              value={noTelepon}
              onChange={(e) => setNoTelepon(e.target.value)}
              error={errors.noTelepon}
            />
            <FormField
              label="Alamat"
              type="text"
              placeholder="Masukkan Alamat"
              id="alamat"
              value={alamat}
              onChange={(e) => setAlamat(e.target.value)}
              error={errors.alamat}
            />
            <FormField
              label="Gelar"
              type="text"
              placeholder="Masukkan Gelar"
              id="gelar"
              value={gelar}
              onChange={(e) => setGelar(e.target.value)}
              error={errors.gelar}
            />
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <Button label="Batal" onClick={onClose} variant="secondary" />
            <Button label="Simpan" type="submit" variant="primary" />
          </div>
        </form>
      </div>
    </div>
  );
}
