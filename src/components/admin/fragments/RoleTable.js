import Button from '../elements/Button';
import { useEffect, useState } from 'react';
import {
  MdChevronLeft,
  MdChevronRight,
  MdEdit,
  MdInfo,
  MdDelete
} from 'react-icons/md';

export default function RoleTable() {
  const [roles, setRoles] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 4;

  const loadRoles = async () => {
    const response = await fetch('/api/admin/role/');
    const data = await response.json();
    setRoles(data.roles);
  };

  useEffect(() => {
    loadRoles();
  }, []);

  const handleDelete = async (id) => {
    const response = await fetch(`/api/admin/role/${id}`, {
      method: 'DELETE'
    });

    if (response.ok) {
      setRoles((prevRoles) => prevRoles.filter((role) => role._id !== id));
    } else {
      console.error('Failed to delete role');
    }
  };

  const filteredRoles = roles.filter((role) =>
    role.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredRoles.length / entriesPerPage);
  const currentEntries = filteredRoles.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 h-[32rem]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Role Management</h2>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

      <div className="overflow-y-auto max-h-72">
        <table className="min-w-full bg-white text-sm">
          <thead className="sticky top-0 bg-white">
            <tr className="border-b border-t border-l border-r border-gray-300">
              <th className="py-3 px-4 font-semibold">No</th>
              <th className="py-3 px-4 font-semibold">Nama Role</th>
              <th className="py-3 px-4 font-semibold">Deskripsi</th>
              <th className="py-3 px-4 font-semibold">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {currentEntries.map((role, index) => (
              <tr key={role._id} className="text-center hover:bg-gray-100">
                <td className="py-3 px-4">
                  {index + 1 + (currentPage - 1) * entriesPerPage}
                </td>
                <td className="py-3 px-4">{role.name}</td>
                <td className="py-3 px-4">{role.description}</td>
                <td className="py-3 px-4 flex justify-center space-x-2">
                  {/* Detail Icon */}
                  <button
                    title="Detail"
                    className="text-blue-500 hover:text-blue-700 transition"
                    onClick={() => console.log(`Details for role: ${role._id}`)}
                  >
                    <MdInfo className="h-5 w-5" />
                  </button>

                  {/* Edit Icon */}
                  <button
                    title="Edit"
                    className="text-yellow-500 hover:text-yellow-700 transition"
                    onClick={() => console.log(`Edit role: ${role._id}`)}
                  >
                    <MdEdit className="h-5 w-5" />
                  </button>

                  {/* Delete Icon */}
                  <button
                    title="Hapus"
                    className="text-red-500 hover:text-red-700 transition"
                    onClick={() => handleDelete(role._id)}
                  >
                    <MdDelete className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-10 flex justify-between items-center">
        <p className="text-md text-gray-600">
          Showing {(currentPage - 1) * entriesPerPage + 1} to{' '}
          {Math.min(currentPage * entriesPerPage, filteredRoles.length)} of{' '}
          {filteredRoles.length} entries
        </p>
        <div className="flex items-center">
          <Button
            label={<MdChevronLeft className="h-5 w-5" />}
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            variant="secondary"
            disabled={currentPage === 1}
          />
          <span className="mx-2 text-md text-gray-600">{currentPage}</span>
          <Button
            label={<MdChevronRight className="h-5 w-5" />}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            variant="secondary"
            disabled={currentPage === totalPages}
          />
        </div>
      </div>
    </div>
  );
}
