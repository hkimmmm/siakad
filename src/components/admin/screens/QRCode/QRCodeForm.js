import Button from '../../elements/Button';
import FormField from '../../fragments/FormField';
import React, { useState, useEffect } from 'react';

export default function QRCodeForm({
  existingQRCode,
  onSubmit,
  onClose,
  jadwalOptions
}) {
  const [jadwal, setJadwal] = useState('');
  const [status, setStatus] = useState('Aktif');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (existingQRCode) {
      setJadwal(existingQRCode.jadwal || '');
      setStatus(existingQRCode.status || 'Aktif');
    } else {
      resetForm();
    }
    setErrors({});
  }, [existingQRCode]);

  const resetForm = () => {
    setJadwal('');
    setStatus('Aktif');
    setErrors({});
  };

  const validateForm = () => {
    const validationErrors = {};
    if (!jadwal) validationErrors.jadwal = 'Jadwal wajib dipilih.';
    if (!status) validationErrors.status = 'Status wajib dipilih.';
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
      jadwal,
      status,
      ...(existingQRCode && { _id: existingQRCode._id })
    };

    if (onSubmit) {
      await onSubmit(formData);
    } else {
      console.error('onSubmit is not defined or is not a function.');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">
          {existingQRCode ? 'Edit QR Code' : 'Tambah QR Code'}
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Dropdown Jadwal */}
          <FormField
            label="Jadwal"
            type="select"
            placeholder="Pilih Jadwal"
            value={jadwal}
            onChange={(e) => setJadwal(e.target.value)}
            error={errors.jadwal}
          >
            <option value="">-- Pilih Jadwal --</option>
            {jadwalOptions?.map((jadwalItem) => (
              <option key={jadwalItem._id} value={jadwalItem._id}>
                {jadwalItem.matkul?.nama_matkul}
              </option>
            ))}
          </FormField>

          {/* Dropdown Status */}
          <FormField
            label="Status"
            type="select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            error={errors.status}
          >
            <option value="Aktif">Aktif</option>
            <option value="Kadaluarsa">Kadaluarsa</option>
          </FormField>

          <div className="flex justify-end space-x-2 mt-6">
            <Button label="Batal" onClick={onClose} variant="secondary" />
            <Button label="Simpan" type="submit" variant="primary" />
          </div>
        </form>
      </div>
    </div>
  );
}
