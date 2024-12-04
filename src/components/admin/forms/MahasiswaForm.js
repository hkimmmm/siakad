import { useState } from 'react';
import FormField from '../fragments/FormField';
import Button from '../elements/Button';

export default function MahasiswaForm() {
  const [nama, setNama] = useState('');
  const [nim, setNim] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Mahasiswa Ditambahkan:', { nama, nim });
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormField
        label="Nama"
        type="text"
        value={nama}
        onChange={(e) => setNama(e.target.value)}
      />
      <FormField
        label="NIM"
        type="text"
        value={nim}
        onChange={(e) => setNim(e.target.value)}
      />
      <Button>Tambah Mahasiswa</Button>
    </form>
  );
}
