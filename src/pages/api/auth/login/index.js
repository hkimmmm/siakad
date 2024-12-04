import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import connectToDatabase from '@/lib/dbConnect';
import User from '@/models/User';

const JWT_SECRET = process.env.JWT_SECRET;

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    try {
      // Hubungkan ke database
      await connectToDatabase();

      // Temukan pengguna berdasarkan username
      const user = await User.findOne({ username });
      if (user && bcrypt.compareSync(password, user.password)) {
        // Jika password cocok, buat token JWT
        const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
          expiresIn: '1h'
        });
        res.status(200).json({ token });
      } else {
        res.status(401).json({ message: 'Username atau password salah' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Login gagal' });
    }
  } else {
    res.status(405).json({ message: 'Method tidak diizinkan' });
  }
}
