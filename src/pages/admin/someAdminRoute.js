import { withRole } from '@/middleware/authMiddleware';

const handler = async (req, res) => {
  // Logika khusus untuk admin
  res.status(200).json({ message: 'Selamat datang, admin!' });
};

export default withRole('admin')(handler);
