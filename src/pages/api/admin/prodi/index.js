import dbConnect from '@/lib/dbConnect';
import Prodi from '@/models/admin/prodi';

export default async function handler(req, res) {
  await dbConnect();

  const { method } = req;

  switch (method) {
    case 'POST':
      try {
        const { kd_prodi, nama_prodi, jenjang } = req.body;
        const newProdi = new Prodi({ kd_prodi, nama_prodi, jenjang });
        await newProdi.save();
        res.status(201).json({ success: true, data: newProdi });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    case 'GET':
      try {
        const prodiList = await Prodi.find({});
        res.status(200).json({ success: true, data: prodiList });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    default:
      res.status(405).json({ success: false, message: 'Method Not Allowed' });
      break;
  }
}
