import mongoose from 'mongoose';
import dbConnect from '@/lib/dbConnect';
import Mahasiswa from '@/models/admin/mahasiswa';
import cloudinary from '@/utils/cloudinary';
import User from '@/models/User';

export default async function handler(req, res) {
  await dbConnect();
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const mahasiswa = await Mahasiswa.find()
          .populate('prodi')
          .populate('kelas')
          .populate('akademik');

        res.status(200).json({ success: true, data: mahasiswa });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    case 'POST':
      try {
        console.log('Request Body:', req.body);
        const { gambar, email, nim, nama_mahasiswa, no_telepon, ...data } =
          req.body;

        // Validasi email
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
          console.log('Validation failed: Email is missing or invalid');
          return res.status(400).json({
            success: false,
            message: 'Email is required and must be in a valid format.'
          });
        }

        // Validasi NIM
        if (!nim || typeof nim !== 'string' || nim.length < 5) {
          console.log('Validation failed: NIM is invalid');
          return res.status(400).json({
            success: false,
            message: 'NIM is required and must be a valid string.'
          });
        }

        // Upload gambar ke Cloudinary
        let imageUrl = null;
        if (gambar && gambar.startsWith('data:image/')) {
          console.log('Uploading image to Cloudinary...');
          const uploadResponse = await cloudinary.uploader.upload(gambar, {
            folder: 'mahasiswa'
          });
          imageUrl = uploadResponse.secure_url;
          console.log('Image uploaded:', imageUrl);
        }

        // Buat data Mahasiswa
        console.log('Creating Mahasiswa...');
        const newMahasiswa = await Mahasiswa.create({
          ...data,
          email,
          nim,
          nama_mahasiswa,
          no_telepon,
          gambar: imageUrl
        });
        console.log('Mahasiswa created:', newMahasiswa);

        // Cek apakah user dengan email yang sama sudah ada
        console.log('Checking for existing User...');
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          console.log('Validation failed: Email already exists');
          return res.status(400).json({
            success: false,
            message: 'User account with this email already exists.'
          });
        }

        // Buat akun User baru
        console.log('Creating User...');
        const user = new User({
          username: nama_mahasiswa,
          email,
          password: nim,
          role: 'mahasiswa',
          mahasiswa: newMahasiswa._id
        });
        await user.save();
        console.log('User created:', user);

        res.status(201).json({
          success: true,
          data: {
            mahasiswa: newMahasiswa,
            user: {
              id: user._id,
              username: user.username,
              email: user.email,
              role: user.role
            }
          }
        });
      } catch (error) {
        if (error.name === 'ValidationError') {
          console.error('Validation Error:', error.message);
          return res
            .status(400)
            .json({ success: false, message: error.message });
        }

        console.error('Unexpected Error:', error.message);
        res
          .status(500)
          .json({ success: false, message: 'Internal Server Error' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res
        .status(405)
        .json({ success: false, message: `Method ${method} not allowed` });
  }
}
