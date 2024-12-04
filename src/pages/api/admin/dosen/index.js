import dbConnect from '@/lib/dbConnect';
import Dosen from '@/models/admin/dosen';

export default async function handler(req, res) {
  await dbConnect();

  const { method } = req;

  switch (method) {
    case 'POST':
      try {
        const {
          kode_dosen,
          nama_dosen,
          nip,
          email,
          no_telepon,
          alamat,
          gelar
        } = req.body;
        if (
          !kode_dosen ||
          !nama_dosen ||
          !nip ||
          !email ||
          !no_telepon ||
          !alamat ||
          !gelar
        ) {
          return res
            .status(400)
            .json({ success: false, message: 'Semua field wajib diisi' });
        }

        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(email)) {
          return res
            .status(400)
            .json({ success: false, message: 'Email tidak valid' });
        }
        const existingDosen = await Dosen.findOne({
          $or: [{ kode_dosen }, { nip }, { email }]
        });
        if (existingDosen) {
          return res.status(400).json({
            success: false,
            message: 'Dosen dengan kode_dosen, nip, atau email sudah ada'
          });
        }
        const newDosen = new Dosen(req.body);
        await newDosen.save();

        return res.status(201).json({
          success: true,
          message: 'Data dosen berhasil ditambahkan',
          data: newDosen
        });
      } catch (error) {
        console.error('Error adding Dosen:', error);
        return res.status(500).json({
          success: false,
          message: 'Terjadi kesalahan saat menambahkan dosen',
          error: error.message
        });
      }

    case 'GET':
      try {
        const dosenList = await Dosen.find({});

        return res.status(200).json({
          success: true,
          message: 'Daftar dosen berhasil diambil',
          data: dosenList
        });
      } catch (error) {
        console.error('Error fetching Dosen list:', error);
        return res.status(500).json({
          success: false,
          message: 'Terjadi kesalahan saat mengambil daftar dosen',
          error: error.message
        });
      }

    default:
      return res.status(405).json({
        success: false,
        message: `Method ${method} tidak diizinkan`
      });
  }
}
