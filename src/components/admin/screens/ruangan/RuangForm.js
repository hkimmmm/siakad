import Button from '../../elements/Button';
import FormField from '../../fragments/FormField';
import { useState, useEffect } from 'react';

export default function RuanganForm({ existingRuangan, onSubmit, onClose }) {
  const [kdRuangan, setKdRuangan] = useState('');
  const [namaRuangan, setNamaRuangan] = useState('');
  const [kapasitas, setKapasitas] = useState('0');

  useEffect(() => {
    if (existingRuangan) {
      setKdRuangan(existingRuangan.kd_ruangan);
      setNamaRuangan(existingRuangan.nama_ruangan);
      setKapasitas(existingRuangan.kapasitas);
    } else {
      setKdRuangan('');
      setNamaRuangan('');
      setKapasitas('');
    }
  }, [existingRuangan]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!kdRuangan || !namaRuangan || !kapasitas) {
      alert('Semua field harus diiisi!');
      return;
    }

    const formData = {
      kd_ruangan: kdRuangan,
      nama_ruangan: namaRuangan,
      kapasitas: kapasitas
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
        <h2 className="text-xl font-semibold mb-4 ">
          {existingRuangan ? 'Edit Ruangan' : 'Tambah Ruangan'}
        </h2>
        <form onSubmit={handleSubmit}>
          <FormField
            label="Kode Ruangan"
            type="text"
            placeholder="Kode Prodi"
            value={kdRuangan}
            onChange={(e) => setKdRuangan(e.target.value)}
            disabled={!!existingRuangan}
          />
          <FormField
            label="Nama Ruangan"
            type="text"
            placeholder="Nama Ruangan"
            value={namaRuangan}
            onChange={(e) => setNamaRuangan(e.target.value)}
          />
          <FormField
            label="Kapasitas"
            type="number"
            placeholder="Masukkan Kapasitas"
            value={kapasitas}
            onChange={(e) => setKapasitas(Number(e.target.value))}
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
