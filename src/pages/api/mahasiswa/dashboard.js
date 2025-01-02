import { withRole } from '@/middleware/authMiddleware';

const handler = async (req, res) => {
  res.status(200).json({ message: 'Selamat datang di dashboard Mahasiswa!' });
};

export default withRole('mahasiswa')(handler);
