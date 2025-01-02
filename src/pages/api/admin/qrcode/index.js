import mongoose from 'mongoose';
import dbConnect from '@/lib/dbConnect';
import QRCode from '@/models/admin/QRCode';
import Jadwal from '@/models/admin/jadwal';

export default async function handler(req, res) {
  await dbConnect(); // Pastikan terhubung ke database

  const { method } = req;

  try {
    switch (method) {
      case 'GET': {
        // Fetch semua QR Code dan populasi data jadwal
        const QRCodeData = await QRCode.find().populate('jadwal');

        return res.status(200).json({
          success: true,
          message: 'Data QR Code berhasil diambil.',
          data: QRCodeData
        });
      }

      case 'POST': {
        const { jadwal, status } = req.body;

        // Validasi input
        if (!jadwal || !status) {
          return res.status(400).json({
            success: false,
            message: 'Field "jadwal" dan "status" wajib diisi.'
          });
        }

        // Validasi ID jadwal
        if (!mongoose.Types.ObjectId.isValid(jadwal)) {
          return res.status(400).json({
            success: false,
            message: 'ID jadwal tidak valid.'
          });
        }

        // Validasi status
        if (!['Aktif', 'Kadaluarsa'].includes(status)) {
          return res.status(400).json({
            success: false,
            message: 'Status harus salah satu dari "Aktif" atau "Kadaluarsa".'
          });
        }

        // Cek apakah jadwal ada di database
        const existingJadwal = await Jadwal.findById(jadwal);
        if (!existingJadwal) {
          return res.status(404).json({
            success: false,
            message: 'Jadwal tidak ditemukan.'
          });
        }

        // Buat QR Code baru
        const newQRCode = await QRCode.create({ jadwal, status });

        return res.status(201).json({
          success: true,
          message: 'QR Code berhasil dibuat.',
          data: newQRCode
        });
      }

      // Handle Method selain GET dan POST
      default: {
        return res.status(405).json({
          success: false,
          message: `Method ${method} tidak diizinkan.`
        });
      }
    }
  } catch (error) {
    console.error('Error in API handler:', error);

    // Mengembalikan response error 500
    return res.status(500).json({
      success: false,
      message: 'Terjadi kesalahan pada server.',
      error: error.message
    });
  }
}
