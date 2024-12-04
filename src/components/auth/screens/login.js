import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/router';
import jwt_decode from 'jwt-decode'; // Gunakan default import
import InputField from '../elements/InputField';
import MainLayout from '../layouts/MainLayout';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/login', {
        username,
        password
      });

      if (response && response.data) {
        localStorage.setItem('token', response.data.token);

        // Decode the token to get the user role
        const decodedToken = jwt_decode(response.data.token);
        console.log('Decoded Token:', decodedToken); // Debugging line
        const userRole = decodedToken.role;

        // Redirect based on user role
        if (userRole === 'mahasiswa') {
          router.push('/mahasiswa/home');
        } else if (userRole === 'admin') {
          router.push('/admin/dashboard');
        } else {
          console.error('Unknown role:', userRole); // Debugging line
          router.push('/');
        }
      } else {
        console.error('No data in the response');
      }
    } catch (error) {
      if (error.response) {
        console.error('Error:', error.response.data.message);
      } else if (error.request) {
        console.error('No response from server:', error.request);
      } else {
        console.error('Error:', error.message);
      }
    }
  };

  return (
    <MainLayout>
      <div className="flex justify-center items-center h-full">
        <form
          onSubmit={handleLogin}
          className="max-w-md w-full p-4 shadow-md rounded-md bg-white"
        >
          <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
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
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 mt-4 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </MainLayout>
  );
};

export default LoginPage;
