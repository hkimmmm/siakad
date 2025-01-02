import { useState } from 'react';
import { useRouter } from 'next/router';
import MainLayout from '../layouts/MainLayout';
import InputField from '../elements/InputField';
import Button from '../elements/Button';
import Image from 'next/image';
import Link from 'next/link'; // Import Link dari next/link

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      console.log('Backend Response:', data);

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.user.role);

        const dashboardPath = `/${data.user.role}/dashboard`;
        router.push(dashboardPath);
      } else {
        // Tampilkan pesan error dari backend
        setError(data.message || 'Invalid email or password.');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="flex flex-col md:flex-row items-center justify-center bg-gradient-to-br bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-[900px] mx-auto mt-2 h-[500px]">
        {/* Bagian Kiri */}
        <div className="text-white p-8 flex flex-col justify-center items-center md:w-1/2 h-full">
          <Image
            src="/images/politeknik_purbaya.jpg"
            alt="Logo Politeknik Purbaya"
            width={150}
            height={150}
            className="mb-5"
          />
          <h2 className="text-4xl font-bold mb-4 text-green-500 text-center">
            Politeknik Purbaya
          </h2>
          <p className="text-lg mb-4 text-gray-500 text-center">
            Selamat Datang di Politekik Purbaya
          </p>
        </div>

        {/* Form Login */}
        <div className="bg-white p-8 flex flex-col justify-center items-center md:w-1/2 w-full h-full">
          <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
          <form onSubmit={handleLogin} className="w-full max-w-[400px]">
            <div className="mb-4">
              <InputField
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Email Address"
                required
              />
            </div>
            <div className="mb-6">
              <InputField
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-label="Password"
                required
              />
            </div>
            <div className="flex items-center justify-between mb-6">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Remember Me
              </label>
              <a href="#" className="text-purple-600 text-sm">
                Forgot Password?
              </a>
            </div>
            <div className="text-center">
              <Button
                label={loading ? 'Logging in...' : 'Login'}
                type="submit"
                variant="green"
                className="text-white rounded w-full"
                disabled={loading}
              />
            </div>
          </form>

          <p className="mt-6 text-center text-sm">
            New User?{' '}
            <Link href="/auth/register">
              <span className="text-purple-600 cursor-pointer">Signup</span>
            </Link>
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default LoginPage;
