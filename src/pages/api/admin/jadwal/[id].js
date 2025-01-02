import mongoose from 'mongoose';
import dbConnect from '@/lib/dbConnect';
import Jadwal from '@/models/admin/jadwal';

export default async function handler(req, res) {
  await dbConnect();

  const { method } = req;
  const { id } = req.query;

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, message: 'Invalid ID format' });
  }

  try {
    switch (method) {
      case 'GET':
        const jadwalData = await Jadwal.findById(id)
          .populate('matkul')
          .populate('kelas')
          .populate('dosen')
          .populate('ruangan');

        if (!jadwalData) {
          return res
            .status(404)
            .json({ success: false, message: 'Jadwal Tidak Ditemukan' });
        }

        return res.status(200).json({ success: true, data: jadwalData });

      case 'PUT':
        const { matkul, kelas, dosen, hari, jam_mulai, jam_selesai, ruangan } =
          req.body;

        if (
          !matkul ||
          !kelas ||
          !dosen ||
          !hari ||
          !jam_mulai ||
          !jam_selesai ||
          !ruangan
        ) {
          return res.status(400).json({
            success: false,
            message: 'All fields are required and valid'
          });
        }

        if (new Date(jam_selesai) <= new Date(jam_mulai)) {
          return res.status(400).json({
            success: false,
            message: 'Jam selesai harus lebih besar dari jam mulai'
          });
        }

        const existingJadwal = await Jadwal.findById(id);
        if (!existingJadwal) {
          return res
            .status(404)
            .json({ success: false, message: 'Jadwal not found' });
        }

        existingJadwal.matkul = matkul;
        existingJadwal.kelas = kelas;
        existingJadwal.dosen = dosen;
        existingJadwal.hari = hari;
        existingJadwal.jam_mulai = jam_mulai;
        existingJadwal.jam_selesai = jam_selesai;
        existingJadwal.ruangan = ruangan;

        await existingJadwal.save();

        return res.status(200).json({ success: true, data: existingJadwal });

      case 'DELETE':
        const jadwalToDelete = await Jadwal.findByIdAndDelete(id);

        if (!jadwalToDelete) {
          return res
            .status(404)
            .json({ success: false, message: 'Jadwal Tidak Ditemukan' });
        }

        return res
          .status(200)
          .json({ success: true, message: 'Jadwal Berhasil Dihapus' });

      default:
        return res
          .status(405)
          .json({ success: false, message: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error('Error: ', error);
    return res.status(500).json({ success: false, message: error.message });
  }
}
