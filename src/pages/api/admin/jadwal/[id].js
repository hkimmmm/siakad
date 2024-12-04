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

  switch (method) {
    case 'GET':
      try {
        const jadwal = await Jadwal.findById(id)
          .populate('kelas')
          .populate('matkul')
          .populate('ruangan');
        if (!jadwal) {
          return res
            .status(404)
            .json({ success: false, message: 'Kelas not found' });
        }
        res.status(200).json({ success: true, data: jadwal });
      } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    case 'PUT':
      try {
        const updatedJadwal = await Jadwal.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true
        });
        if (!updatedJadwal) {
          return res
            .status(404)
            .json({ success: false, message: 'Jadwal not found' });
        }
        res.status(200).json({ success: true, data: updatedJadwal });
      } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    case 'DELETE':
      try {
        const deletedJadwal = await Jadwal.findByIdAndDelete(id);
        if (!deletedJadwal) {
          return res
            .status(404)
            .json({ success: false, message: 'Jadwal not found' });
        }
        res
          .status(200)
          .json({ success: true, message: 'Jadwal deleted successfully' });
      } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, message: error.message });
      }
      break;
  }
}
