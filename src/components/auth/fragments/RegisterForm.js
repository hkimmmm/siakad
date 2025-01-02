import React, { useState } from 'react';
import AuthForm from './AuthForm';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [dosenId, setDosenId] = useState(''); // Untuk role dosen
  const [mahasiswaId, setMahasiswaId] = useState(''); // Untuk role mahasiswa
  const [error, setError] = useState(null);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);

    // Validasi dasar
    if (!role) {
      setError('Silakan pilih peran.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Kata sandi tidak cocok.');
      return;
    }

    if (!username) {
      setError('Username diperlukan.');
      return;
    }

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError('Harap masukkan alamat email yang valid.');
      return;
    }

    // Persiapkan data untuk dikirim
    const requestBody = {
      username,
      email,
      password,
      role
    };

    if (role === 'dosen' && dosenId) {
      requestBody.dosen = dosenId;
    }

    if (role === 'mahasiswa' && mahasiswaId) {
      requestBody.mahasiswa = mahasiswaId;
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      const data = await response.json();

      if (response.ok) {
        alert('Pendaftaran berhasil!');
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setRole('');
        setDosenId('');
        setMahasiswaId('');
      } else {
        setError(data.message || 'Pendaftaran gagal.');
      }
    } catch (err) {
      setError('Terjadi kesalahan. Silakan coba lagi.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br to-gray-200">
      <div className="w-full max-w-5xl bg-white p-8 rounded-lg shadow-lg flex flex-col md:flex-row h-auto md:h-[500px]">
        {/* Konten Kiri */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-6 rounded-l-lg">
          <h2 className="text-4xl font-bold text-green-500 text-center mb-4">
            Selamat Datang!
          </h2>
          <p className="text-lg text-gray-500 text-center mb-4">
            Silakan isi formulir di bawah ini untuk mendaftar.
          </p>
        </div>

        {/* Formulir Kanan */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-center items-center">
          <AuthForm
            title="Daftar"
            fields={[
              {
                label: 'Username',
                type: 'text',
                value: username,
                onChange: (e) => setUsername(e.target.value),
                placeholder: 'Masukkan username Anda'
              },
              {
                label: 'Email',
                type: 'email',
                value: email,
                onChange: (e) => setEmail(e.target.value),
                placeholder: 'Masukkan email Anda'
              },
              {
                label: 'Kata Sandi',
                type: 'password',
                value: password,
                onChange: (e) => setPassword(e.target.value),
                placeholder: 'Masukkan kata sandi Anda'
              },
              {
                label: 'Konfirmasi Kata Sandi',
                type: 'password',
                value: confirmPassword,
                onChange: (e) => setConfirmPassword(e.target.value),
                placeholder: 'Konfirmasi kata sandi Anda'
              },
              {
                label: 'Peran',
                type: 'select',
                value: role,
                onChange: (e) => setRole(e.target.value),
                options: ['admin', 'dosen', 'mahasiswa']
              },
              role === 'dosen' && {
                label: 'ID Dosen',
                type: 'text',
                value: dosenId,
                onChange: (e) => setDosenId(e.target.value),
                placeholder: 'Masukkan ID dosen'
              },
              role === 'mahasiswa' && {
                label: 'ID Mahasiswa',
                type: 'text',
                value: mahasiswaId,
                onChange: (e) => setMahasiswaId(e.target.value),
                placeholder: 'Masukkan ID mahasiswa'
              }
            ].filter(Boolean)} // Menghapus field yang undefined
            onSubmit={handleRegister}
            buttonText="Daftar"
            buttonVariant="primary"
          >
            {error && (
              <p className="text-red-500 text-sm text-center mt-4">{error}</p>
            )}
          </AuthForm>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
