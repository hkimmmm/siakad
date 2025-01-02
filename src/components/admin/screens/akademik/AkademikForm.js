import Button from '../../elements/Button';
import FormField from '../../fragments/FormField';
import { useState, useEffect } from 'react';

export default function AkademikForm({ existingAkademik, onSubmit, onClose }) {
  const [thAkademik, setThAkademik] = useState('');
  const [semester, setSemester] = useState('');
  const [status, setStatus] = useState(false);

  useEffect(() => {
    if (existingAkademik) {
      setThAkademik(existingAkademik.th_akademik);
      setSemester(existingAkademik.semester);
      setStatus(existingAkademik.status);
    } else {
      setThAkademik('');
      setSemester('');
      setStatus(false);
    }
  }, [existingAkademik]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi form
    if (!thAkademik || !semester || semester < 1) {
      alert('Semua field harus diisi dengan benar!');
      return;
    }

    const formData = {
      th_akademik: thAkademik,
      semester: semester,
      status: status,
      ...(existingAkademik && { _id: existingAkademik._id })
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
          {existingAkademik ? 'Edit Tahun Akademik' : 'Tambah Tahun Akademik'}
        </h2>

        <form onSubmit={handleSubmit}>
          <FormField
            label="Tahun Akademik"
            type="text"
            inputMode="numeric"
            placeholder="Tahun akademik"
            value={thAkademik}
            onChange={(e) => {
              const input = e.target.value;
              if (/^\d{0,4}$/.test(input)) {
                setThAkademik(input);
              }
            }}
            disabled={!!existingAkademik}
          />

          <FormField
            label="Tambah Semester Baru"
            type="number"
            placeholder="Masukkan Semester Baru"
            value={semester}
            onChange={(e) => {
              const value = Number(e.target.value);
              if (value >= 1) setSemester(value);
            }}
          />

          <div className="flex items-center mb-4">
            <FormField
              label="Status"
              type="checkbox"
              value={status}
              onChange={(e) => setStatus(e.target.checked)}
            />
            <span className="ml-2 text-gray-700">
              {status ? 'Status: Aktif' : 'Status: Tidak Aktif'}
            </span>
          </div>

          <div className="flex justify-end space-x-2">
            <Button label="Batal" onClick={onClose} variant="secondary" />
            <Button label="Simpan" type="submit" variant="primary" />
          </div>
        </form>
      </div>
    </div>
  );
}
