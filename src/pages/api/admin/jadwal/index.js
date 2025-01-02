import dbConnect from '@/lib/dbConnect';
import Jadwal from '@/models/admin/jadwal';
import Matkul from '@/models/admin/matkul';
import Kelas from '@/models/admin/kelas';
import Dosen from '@/models/admin/dosen';
import Ruangan from '@/models/admin/ruangan';

export default async function handler(req, res) {
  await dbConnect();

  const { method } = req;

  try {
    switch (method) {
      case 'GET':
        const jadwalData = await Jadwal.find()
          .populate('matkul')
          .populate('kelas')
          .populate('dosen')
          .populate('ruangan');
        return res.status(200).json({ success: true, data: jadwalData });

      case 'POST':
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
            message: 'Semua field wajib diisi dengan benar.'
          });
        }

        if (new Date(jam_selesai) <= new Date(jam_mulai)) {
          return res.status(400).json({
            success: false,
            message: 'Jam selesai harus lebih besar dari jam mulai.'
          });
        }

        const newJadwal = new Jadwal({
          matkul,
          kelas,
          dosen,
          hari,
          jam_mulai,
          jam_selesai,
          ruangan
        });

        await newJadwal.save();

        return res.status(201).json({ success: true, data: newJadwal });

      default:
        return res
          .status(405)
          .json({ success: false, message: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error('Error in API handler:', error);
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan pada server.'
    });
  }
}
