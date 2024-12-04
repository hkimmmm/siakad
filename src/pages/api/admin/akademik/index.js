import dbConnect from '@/lib/dbConnect';
import Akademik from '@/models/admin/akademik';

export default async function handler(req, res) {
  await dbConnect();

  const { method } = req;

  switch (method) {
    case 'POST':
      try {
        const { th_akademik, semester, status } = req.body;
        const newakademik = new Akademik({ th_akademik, semester, status });
        await newakademik.save();
        res.status(201).json({ success: true, data: newakademik });
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
      break;

    case 'GET':
      try {
        const akademikList = await Akademik.find({});
        res.status(200).json({ success: true, data: akademikList });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    default:
      res.status(405).json({ success: false, message: 'Method Not Allowed' });
      break;
  }
}
