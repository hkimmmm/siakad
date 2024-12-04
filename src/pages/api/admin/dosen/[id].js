import dbConnect from '@/lib/dbConnect';
import Dosen from '@/models/admin/dosen';
import mongoose from 'mongoose';

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
        const dosen = await Dosen.findById(id);
        if (!dosen) {
          return res
            .status(404)
            .json({ success: false, message: 'Dosen not found' });
        }
        res.status(200).json({ success: true, data: dosen });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: 'Server error occurred',
          error: error.message
        });
      }
      break;

    case 'PUT':
      try {
        console.log('Request Body:', req.body);
        const {
          kode_dosen,
          nama_dosen,
          nip,
          email,
          no_telepon,
          alamat,
          gelar
        } = req.body;
        if (
          !kode_dosen ||
          !nama_dosen ||
          !nip ||
          !email ||
          !no_telepon ||
          !alamat ||
          !gelar
        ) {
          return res
            .status(400)
            .json({ success: false, message: 'All fields are required' });
        }
        const updatedDosen = await Dosen.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true
        });
        if (!updatedDosen) {
          return res
            .status(404)
            .json({ success: false, message: 'Dosen not found' });
        }

        res.status(200).json({
          success: true,
          message: 'Dosen updated successfully',
          data: updatedDosen
        });
      } catch (error) {
        console.error('Error updating Dosen:', error.message);
        res.status(400).json({
          success: false,
          message: 'Failed to update Dosen',
          error: error.message
        });
      }
      break;

    case 'DELETE':
      try {
        const deletedDosen = await Dosen.findByIdAndDelete(id);
        if (!deletedDosen) {
          return res
            .status(404)
            .json({ success: false, message: 'Dosen not found' });
        }
        res
          .status(200)
          .json({ success: true, message: 'Dosen deleted successfully' });
      } catch (error) {
        res.status(500).json({
          success: false,
          message: 'Failed to delete Dosen',
          error: error.message
        });
      }
      break;

    default:
      res
        .status(405)
        .json({ success: false, message: `Method ${method} not allowed` });
      break;
  }
}
