import mongoose from 'mongoose';
import dbConnect from '@/lib/dbConnect';
import Lokasi from '@/models/admin/lokasi';

export default async function handler(req, res) {
  await dbConnect();

  const { method } = req;
  const { id } = req.query;

  // Validasi ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, message: 'ID Lokasi tidak valid' });
  }

  switch (method) {
    case 'GET':
      try {
        const lokasi = await Lokasi.findById(id);
        if (!lokasi) {
          return res
            .status(404)
            .json({ success: false, message: 'Lokasi Tidak Ditemukan' });
        }
        res.status(200).json({ success: true, data: lokasi });
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
      break;

    case 'PUT':
      try {
        const updateLokasi = await Lokasi.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true
        });
        if (!updateLokasi) {
          return res
            .status(404)
            .json({ success: false, message: 'Lokasi Tidak Ditemukan' });
        }
        res.status(200).json({ success: true, data: updateLokasi });
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
      break;

    case 'DELETE':
      try {
        const deleteLokasi = await Lokasi.findByIdAndDelete(id);
        if (!deleteLokasi) {
          return res
            .status(404)
            .json({ success: false, message: 'Lokasi Tidak Ditemukan' });
        }
        res
          .status(200)
          .json({ success: true, message: 'Lokasi Berhasil Dihapus' });
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
      break;

    default:
      res.status(405).json({ success: false, message: 'Method Not Allowed' });
      break;
  }
}
