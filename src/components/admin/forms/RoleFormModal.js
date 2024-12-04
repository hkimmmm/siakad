import Button from '../elements/Button';
import FormField from '../fragments/FormField';
import { useState } from 'react';

export default function RoleFormModal({ onClose, existingRole }) {
  const [name, setName] = useState(existingRole ? existingRole.name : '');
  const [description, setDescription] = useState(
    existingRole ? existingRole.description : ''
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const roleData = { name, description };

    const method = existingRole ? 'PUT' : 'POST';
    const url = existingRole
      ? `/api/admin/roles/${existingRole.id}`
      : '/api/admin/roles';

    const response = await fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(roleData)
    });

    if (response.ok) {
      onClose();
    } else {
      console.error('Failed to save role');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">
          {existingRole ? 'Edit Role' : 'Tambah Role'}
        </h2>
        <form onSubmit={handleSubmit}>
          <FormField
            label="Nama Role"
            type="text"
            placeholder="Nama role"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <FormField
            label="Deskripsi"
            type="text"
            placeholder="Deskripsi role"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
