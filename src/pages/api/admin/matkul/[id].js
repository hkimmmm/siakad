import mongoose from 'mongoose';
import dbConnect from '@/lib/dbConnect';
import Matkul from '@/models/admin/matkul';

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
        const matkul = await Matkul.findById(id)
          .populate('akademik')
          .populate('prodi');
        if (!matkul) {
          return res
            .status(404)
            .json({ success: false, message: 'Kelas not found' });
        }
        res.status(200).json({ success: true, data: matkul });
      } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    case 'PUT':
      try {
        const updatedMatkul = await Matkul.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true
        });
        if (!updatedMatkul) {
          return res
            .status(404)
            .json({ success: false, message: 'Matkul not found' });
        }
        res.status(200).json({ success: true, data: updatedMatkul });
      } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    case 'DELETE':
      try {
        const deletedMatkul = await Matkul.findByIdAndDelete(id);
        if (!deletedMatkul) {
          return res
            .status(404)
            .json({ success: false, message: 'Matkul not found' });
        }
        res
          .status(200)
          .json({ success: true, message: 'Matkul deleted successfully' });
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
