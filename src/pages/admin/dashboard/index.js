import { useEffect } from 'react';
import { useRouter } from 'next/router'; // Import useRouter dari Next.js
import Dashboard from '@/components/admin/screens/dashboard/index';

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/auth/login'); // Redirect jika tidak ada token
    }
  }, [router]);

  return (
    <>
      <Dashboard />
    </>
  );
};

export default Home;
