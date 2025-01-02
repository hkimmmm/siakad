import dbConnect from '@/lib/dbConnect';
import Absen from '@/models/admin/absen';
import Lokasi from '@/models/admin/lokasi';
import QRCode from '@/models/admin/QRCode';

export default async function handler(req, res) {
  await dbConnect();

  const { method } = req;

  switch (method) {
    case 'POST': {
      try {
        const { mahasiswaId, qrcodeId, lokasiId, ipMahasiswa } = req.body;

        // Validasi Lokasi
        const lokasi = await Lokasi.findById(lokasiId);
        if (!lokasi) {
          return res.status(400).json({ message: 'Lokasi tidak ditemukan.' });
        }

        // Validasi IP WiFi
        if (lokasi.ipWifi !== ipMahasiswa) {
          return res
            .status(403)
            .json({ message: 'IP WiFi tidak sesuai dengan lokasi.' });
        }

        // Simpan Absensi
        const absensi = await Absen.create({
          mahasiswa: mahasiswaId,
          qrcode: qrcodeId,
          lokasi: lokasiId
        });

        res.status(201).json({ message: 'Absensi berhasil.', data: absensi });
      } catch (error) {
        console.error('Error Absensi:', error);
        res.status(500).json({ message: 'Terjadi kesalahan.', error });
      }
      break;
    }

    case 'GET': {
      try {
        // Mengambil data absensi beserta detail mahasiswa, qrcode, dan lokasi
        const absensi = await Absen.find()
          .populate('mahasiswa', 'nama nim email') // Mengambil nama, nim, dan email mahasiswa
          .populate('qrcode', 'jadwal expired_at') // Mengambil jadwal dan expired_at QR Code
          .populate('lokasi', 'nama_lokasi ipWifi deskripsi'); // Mengambil nama lokasi, ipWifi, dan deskripsi lokasi

        res.status(200).json(absensi);
      } catch (error) {
        console.error('Error Get Absensi:', error);
        res.status(500).json({ message: 'Terjadi kesalahan.', error });
      }
      break;
    }

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Metode ${method} tidak diperbolehkan.`);
  }
}
