import dbConnect from '@/lib/dbConnect';
import Ruangan from '@/models/admin/ruangan';

export default async function handler(req, res) {
  await dbConnect();

  const { method } = req;

  switch (method) {
    case 'POST':
      try {
        const { kd_ruangan, nama_ruangan, kapasitas } = req.body;
        const newRuangan = new Ruangan({ kd_ruangan, nama_ruangan, kapasitas });

        await newRuangan.save();
        res.status(201).json({ success: true, data: newRuangan });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    case 'GET':
      try {
        const ruanganList = await Ruangan.find({});
        res.status(200).json({ succes: true, data: ruanganList });
      } catch (error) {
        res.status(400).json({ succes: false, message: error.message });
      }
      break;

    default:
      res.status(405).json({ success: false, message: 'Method Not Allowed' });
      break;
  }
}
