import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';
import Dosen from '@/models/admin/dosen';
import Mahasiswa from '@/models/admin/mahasiswa';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { username, email, password, role, profileId } = req.body;

  // Validasi input
  if (!username || !email || !password || !role || !profileId) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const validRoles = ['admin', 'dosen', 'mahasiswa'];
  if (!validRoles.includes(role)) {
    return res.status(400).json({ message: 'Invalid role provided.' });
  }

  await dbConnect();

  try {
    // Periksa apakah email sudah ada
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists.' });
    }

    // Validasi profil ID berdasarkan role
    let profile;
    if (role === 'dosen') {
      profile = await Dosen.findById(profileId);
      if (!profile) {
        return res.status(400).json({ message: 'Dosen profile not found.' });
      }
    } else if (role === 'mahasiswa') {
      profile = await Mahasiswa.findById(profileId);
      if (!profile) {
        return res
          .status(400)
          .json({ message: 'Mahasiswa profile not found.' });
      }
    }

    // Persiapkan data untuk pengguna baru
    const userData = {
      username,
      email,
      password,
      role
    };

    if (role === 'mahasiswa') {
      userData.mahasiswa = profileId; // Isi field mahasiswa
    } else if (role === 'dosen') {
      userData.dosen = profileId; // Isi field dosen
    }

    // Buat pengguna baru
    const user = new User(userData);
    await user.save();

    res.status(201).json({
      message: 'User registered successfully.',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Error creating user:', error.message);
    res
      .status(500)
      .json({ message: 'Something went wrong. Please try again later.' });
  }
}
