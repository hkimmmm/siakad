import dbConnect from '@/lib/dbConnect';
import Kelas from '@/models/admin/kelas';
import Prodi from '@/models/admin/prodi';
import Akademik from '@/models/admin/akademik';

export default async function handler(req, res) {
  await dbConnect();

  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const kelasList = await Kelas.find()
          .populate('prodi')
          .populate('akademik');
        res.status(200).json({ success: true, data: kelasList });
      } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    case 'POST':
      try {
        const { nama_kelas, prodi, akademik, jumlah_mahasiswa } = req.body;

        if (!nama_kelas || !prodi || !akademik || !jumlah_mahasiswa) {
          return res.status(400).json({
            success: false,
            message:
              'All fields (nama_kelas, prodi, akademik, jumlah_mahasiswa) are required'
          });
        }

        const newKelas = new Kelas(req.body);
        await newKelas.save();
        res.status(201).json({ success: true, data: newKelas });
      } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    default:
      res.status(405).json({ success: false, message: 'Method Not Allowed' });
      break;
  }
}
