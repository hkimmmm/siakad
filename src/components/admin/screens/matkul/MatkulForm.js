import React, { useState, useEffect } from 'react';
import Button from '../../elements/Button';
import FormField from '../../fragments/FormField';

export default function MatkulForm({
  existingMatkul,
  onSubmit,
  onClose,
  prodiOptions,
  dosenOptions
}) {
  const [kodeMatkul, setKodeMatkul] = useState('');
  const [namaMatkul, setNamaMatkul] = useState('');
  const [prodi, setProdi] = useState('');
  const [semester, setSemester] = useState('');
  const [sks, setSks] = useState('');
  const [dosen, setDosen] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (existingMatkul) {
      setKodeMatkul(existingMatkul.kode_matkul || '');
      setNamaMatkul(existingMatkul.nama_matkul || '');
      setProdi(existingMatkul.prodi?._id || '');
      setSemester(existingMatkul.semester?.toString() || '');
      setSks(existingMatkul.sks?.toString() || '');
      setDosen(existingMatkul.dosen?._id || '');
    } else {
      resetForm();
    }
    setErrors({});
  }, [existingMatkul]);

  const resetForm = () => {
    setKodeMatkul('');
    setNamaMatkul('');
    setProdi('');
    setSemester('');
    setSks('');
    setDosen('');
    setErrors({});
  };

  const validateForm = () => {
    const validationErrors = {};
    if (!kodeMatkul.trim())
      validationErrors.kodeMatkul = 'Kode Matkul harus diisi.';
    if (!namaMatkul.trim())
      validationErrors.namaMatkul = 'Nama Matkul harus diisi.';
    if (!prodi.trim()) validationErrors.prodi = 'Prodi harus dipilih.';
    if (!semester.trim()) validationErrors.semester = 'Semester harus diisi.';
    if (!sks.trim()) validationErrors.sks = 'SKS harus diisi.';
    if (!dosen.trim()) validationErrors.dosen = 'Dosen harus dipilih.';

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
      kode_matkul: kodeMatkul,
      nama_matkul: namaMatkul,
      prodi,
      semester: parseInt(semester, 10),
      sks: parseInt(sks, 10),
      dosen,
      ...(existingMatkul && { _id: existingMatkul._id })
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
          {existingMatkul ? 'Edit Mata Kuliah' : 'Tambah Mata Kuliah'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              label="Kode Matkul"
              type="text"
              placeholder="Masukkan Kode Matkul"
              value={kodeMatkul}
              disabled={!!existingMatkul}
              onChange={(e) => setKodeMatkul(e.target.value)}
              error={errors.kodeMatkul}
            />
            <FormField
              label="Nama Matkul"
              type="text"
              placeholder="Masukkan Nama Mata Kuliah"
              value={namaMatkul}
              onChange={(e) => setNamaMatkul(e.target.value)}
              error={errors.namaMatkul}
            />
          </div>

          <div className="mt-4">
            <FormField
              label="Program Studi"
              type="select"
              placeholder="Pilih Program Studi"
              value={prodi}
              onChange={(e) => setProdi(e.target.value)}
              error={errors.prodi}
            >
              {prodiOptions?.map((prodiItem) => (
                <option key={prodiItem._id} value={prodiItem._id}>
                  {prodiItem.nama_prodi}
                </option>
              ))}
            </FormField>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <FormField
              label="Semester"
              type="number"
              placeholder="Masukkan Semester (contoh: 1)"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              error={errors.semester}
            />
            <FormField
              label="SKS"
              type="number"
              placeholder="Masukkan SKS (contoh: 3)"
              value={sks}
              onChange={(e) => setSks(e.target.value)}
              error={errors.sks}
            />
          </div>

          <div className="mt-4">
            <FormField
              label="Dosen"
              type="select"
              placeholder="Pilih Dosen Pengampu"
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
          </div>

          <div className="flex justify-end space-x-2 mt-6">
            <Button label="Batal" onClick={onClose} variant="secondary" />
            <Button label="Simpan" type="submit" variant="primary" />
          </div>
        </form>
      </div>
    </div>
  );
}
