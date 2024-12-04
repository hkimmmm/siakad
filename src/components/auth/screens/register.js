import { useState } from 'react';
import axios from 'axios';
import InputField from '../elements/InputField';
import MainLayout from '../layouts/MainLayout';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/register', { username, password, role });
      // Redirect atau pemberitahuan sukses setelah registrasi
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  return (
    <MainLayout>
      <div className="flex justify-center items-center h-full">
        <form
          onSubmit={handleRegister}
          className="max-w-md w-full p-4 shadow-md rounded-md bg-white"
        >
          <h2 className="text-2xl font-semibold mb-4 text-center">Register</h2>
          <InputField
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <InputField
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="mb-4">
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Role
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="border px-2 py-1 rounded w-full"
            >
              <option value="user">User</option>
              <option value="mahasiswa">Mahasiswa</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 mt-4 rounded hover:bg-blue-600"
          >
            Register
          </button>
        </form>
      </div>
    </MainLayout>
  );
};

export default RegisterPage;
