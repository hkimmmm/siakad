import mongoose from 'mongoose';
import dbConnect from '@/lib/dbConnect';
import QRCode from '@/models/admin/QRCode';

export default async function handler(req, res) {
  await dbConnect();

  const { method } = req;
  const { id } = req.query;

  // Validasi ID
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: 'Format ID tidak valid'
    });
  }

  if (!['GET', 'PUT', 'DELETE'].includes(method)) {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    return res.status(405).json({
      success: false,
      message: 'Method tidak diizinkan'
    });
  }

  try {
    switch (method) {
      case 'GET': {
        const qrCode = await QRCode.findById(id).populate('jadwal');
        if (!qrCode) {
          return res.status(404).json({
            success: false,
            message: 'QR Code tidak ditemukan'
          });
        }

        if (qrCode.expired_at < new Date() && qrCode.status === 'Aktif') {
          qrCode.status = 'Kadaluarsa';
          await qrCode.save();
        }

        return res.status(200).json({
          success: true,
          data: qrCode
        });
      }

      case 'PUT': {
        if (Object.keys(req.body).length === 0) {
          return res.status(400).json({
            success: false,
            message: 'Body request tidak boleh kosong'
          });
        }

        const { jadwal, status } = req.body;

        const qrCode = await QRCode.findById(id);
        if (!qrCode) {
          return res.status(404).json({
            success: false,
            message: 'QR Code tidak ditemukan'
          });
        }

        qrCode.jadwal = jadwal;

        qrCode.status = status;

        await qrCode.save();

        return res.status(200).json({
          success: true,
          data: qrCode
        });
      }

      case 'DELETE': {
        const qrCodeToDelete = await QRCode.findByIdAndDelete(id);
        if (!qrCodeToDelete) {
          return res.status(404).json({
            success: false,
            message: `QR Code dengan ID ${id} tidak ditemukan`
          });
        }

        return res.status(200).json({
          success: true,
          message: 'QR Code berhasil dihapus'
        });
      }

      default:
        return res.status(405).json({
          success: false,
          message: 'Method tidak diizinkan'
        });
    }
  } catch (error) {
    console.error('Error: ', error);
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan pada server',
      error: error.message
    });
  }
}
