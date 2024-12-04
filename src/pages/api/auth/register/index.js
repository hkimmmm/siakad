import bcrypt from 'bcrypt';
import connectToDatabase from '@/lib/dbConnect';
import User from '@/models/User';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password, role } = req.body;

    // Validasi role
    if (!['admin', 'user', 'mahasiswa'].includes(role)) {
      return res.status(400).json({ message: 'Role tidak valid' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      await connectToDatabase(); // Hubungkan ke database

      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: 'Username sudah digunakan' });
      }

      const newUser = new User({
        username,
        password: hashedPassword,
        role
      });
      await newUser.save();

      res.status(201).json({ message: 'Pengguna berhasil didaftarkan' });
    } catch (error) {
      console.error('Error saat menyimpan pengguna:', error);
      res.status(500).json({ message: 'Gagal mendaftarkan pengguna' });
    }
  } else {
    res.status(405).json({ message: 'Method tidak diizinkan' });
  }
}
