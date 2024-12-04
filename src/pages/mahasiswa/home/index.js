import { useEffect } from 'react';
import { useRouter } from 'next/router';

const MahasiswaPage = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/login');
    }
  }, [router]);

  return (
    <div>
      <h1>Selamat datang, Mahasiswa!</h1>
      {/* Konten halaman mahasiswa */}
    </div>
  );
};

export default MahasiswaPage;
