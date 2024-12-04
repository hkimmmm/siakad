import { withRole } from '@/middleware/withRole';

const handler = async (req, res) => {
  // Logika khusus untuk admin
  res.status(200).json({ message: 'Selamat datang, admin!' });
};

export default withRole('admin')(handler);
