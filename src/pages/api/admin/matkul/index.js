import dbConnect from '@/lib/dbConnect';
import Matkul from '@/models/admin/matkul';
import Prodi from '@/models/admin/prodi';
import Dosen from '@/models/admin/dosen';

export default async function handler(req, res) {
  await dbConnect();

  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const matkulList = await Matkul.find()
          .populate('prodi')
          .populate('dosen');
        res.status(200).json({ success: true, data: matkulList });
      } catch (error) {
        console.error('Error fetching Matkul:', error);
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    case 'POST':
      try {
        const { kode_matkul, nama_matkul, prodi, semester, sks, dosen } =
          req.body;

        if (
          !kode_matkul ||
          !nama_matkul ||
          !prodi ||
          !semester ||
          !sks ||
          !dosen
        ) {
          return res.status(400).json({
            success: false,
            message:
              'All fields (kode_matkul, nama_matkul, prodi, semester, sks, dosen) are required.'
          });
        }

        const newMatkul = new Matkul(req.body);
        await newMatkul.save();
        res.status(201).json({ success: true, data: newMatkul });
      } catch (error) {
        console.error('Error creating Matkul:', error);
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    default:
      res.status(405).json({ success: false, message: 'Method Not Allowed' });
      break;
  }
}
