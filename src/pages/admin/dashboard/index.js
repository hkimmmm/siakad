import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Dashboard from '@/components/admin/screens/dashboard/index';

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    if (!token || role !== 'admin') {
      router.push('/login'); // Redirect ke halaman login jika tidak ada token atau bukan admin
    }
  }, [router]);

  return (
    <>
      <Dashboard />
    </>
  );
};

export default Home;
