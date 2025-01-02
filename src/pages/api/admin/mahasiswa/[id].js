import mongoose from 'mongoose';
import dbConnect from '@/lib/dbConnect';
import Mahasiswa from '@/models/admin/mahasiswa';
import cloudinary from '@/utils/cloudinary';
import Joi from 'joi';

// Middleware untuk validasi ObjectId
function validateObjectId(req, res, next) {
  const { id } = req.query;
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ success: false, message: 'Invalid ID format' });
  }
  next();
}

// Skema validasi untuk data Mahasiswa
const mahasiswaUpdateSchema = Joi.object({
  nama_mahasiswa: Joi.string().trim().min(3).max(100),
  email: Joi.string().email().optional(),
  no_telepon: Joi.string()
    .trim()
    .pattern(/^[0-9]+$/)
    .optional(),
  prodi: Joi.string().optional(),
  kelas: Joi.string().optional(),
  akademik: Joi.string().optional(),
  status: Joi.string().valid('Aktif', 'Tidak Aktif').optional(),
  gambar: Joi.string().optional()
});

export default async function handler(req, res) {
  await dbConnect();
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case 'GET':
      validateObjectId(req, res, async () => {
        try {
          const mahasiswa = await Mahasiswa.findById(id)
            .populate('prodi')
            .populate('kelas')
            .populate('akademik');

          if (!mahasiswa) {
            return res
              .status(404)
              .json({ success: false, message: 'Mahasiswa not found' });
          }

          res.status(200).json({ success: true, data: mahasiswa });
        } catch (error) {
          res.status(400).json({
            success: false,
            message: 'Failed to fetch Mahasiswa data',
            errorDetails: error.message
          });
        }
      });
      break;

    case 'PUT':
      validateObjectId(req, res, async () => {
        try {
          const { gambar, ...data } = req.body;

          // Validasi data mahasiswa
          const { error } = mahasiswaUpdateSchema.validate(data);
          if (error) {
            return res.status(400).json({
              success: false,
              message: 'Validation failed',
              errorDetails: error.details[0].message
            });
          }

          // Upload gambar ke Cloudinary jika ada
          let imageUrl = null;
          if (gambar) {
            const uploadResponse = await cloudinary.uploader.upload(gambar, {
              folder: 'mahasiswa',
              public_id: `mahasiswa_${id}`,
              overwrite: true
            });
            imageUrl = uploadResponse.secure_url;
          }

          // Update data mahasiswa
          const updatedMahasiswa = await Mahasiswa.findByIdAndUpdate(
            id,
            { ...data, ...(imageUrl && { gambar: imageUrl }) },
            { new: true, runValidators: true }
          );

          if (!updatedMahasiswa) {
            return res
              .status(404)
              .json({ success: false, message: 'Mahasiswa not found' });
          }

          res.status(200).json({
            success: true,
            message: 'Mahasiswa updated successfully',
            data: updatedMahasiswa
          });
        } catch (error) {
          res.status(400).json({
            success: false,
            message: 'Failed to update Mahasiswa data',
            errorDetails: error.message
          });
        }
      });
      break;

    case 'DELETE':
      validateObjectId(req, res, async () => {
        try {
          // Hapus data mahasiswa
          const deletedMahasiswa = await Mahasiswa.findByIdAndDelete(id);
          if (!deletedMahasiswa) {
            return res
              .status(404)
              .json({ success: false, message: 'Mahasiswa not found' });
          }

          // Hapus gambar dari Cloudinary
          if (deletedMahasiswa.gambar) {
            const publicId = `mahasiswa/mahasiswa_${id}`;
            await cloudinary.uploader.destroy(publicId).catch((err) => {
              console.error(
                'Failed to delete image from Cloudinary:',
                err.message
              );
            });
          }

          res.status(200).json({
            success: true,
            message: 'Mahasiswa deleted successfully'
          });
        } catch (error) {
          res.status(400).json({
            success: false,
            message: 'Failed to delete Mahasiswa',
            errorDetails: error.message
          });
        }
      });
      break;

    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).json({
        success: false,
        message: `Method ${method} not allowed`
      });
  }
}
