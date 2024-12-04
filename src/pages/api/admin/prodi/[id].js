import mongoose from 'mongoose';
import dbConnect from '@/lib/dbConnect';
import Prodi from '@/models/admin/prodi';

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
        const prodi = await Prodi.findOne(id);
        if (!prodi) {
          return res
            .status(404)
            .json({ success: false, message: 'Prodi not found' });
        }
        res.status(200).json({ success: true, data: prodi });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    case 'PUT':
      try {
        const updatedProdi = await Prodi.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true
        });
        if (!updatedProdi) {
          return res
            .status(404)
            .json({ success: false, message: 'Prodi not found' });
        }
        res.status(200).json({ success: true, data: updatedProdi });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    case 'DELETE':
      try {
        const deletedProdi = await Prodi.findOneAndDelete(id);
        if (!deletedProdi) {
          return res
            .status(404)
            .json({ success: false, message: 'Prodi not found' });
        }
        res
          .status(200)
          .json({ success: true, message: 'Prodi deleted successfully' });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    default:
      res.status(405).json({ success: false, message: 'Method Not Allowed' });
      break;
  }
}
