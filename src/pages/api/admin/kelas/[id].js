import dbConnect from '@/lib/dbConnect';
import Kelas from '@/models/admin/kelas';

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
        const kelas = await Kelas.findById(id)
          .populate('prodi')
          .populate('akademik');
        if (!kelas) {
          return res
            .status(404)
            .json({ success: false, message: 'Kelas not found' });
        }
        res.status(200).json({ success: true, data: kelas });
      } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    case 'PUT':
      try {
        if (!req.body.nama_kelas || !req.body.jumlah_mahasiswa) {
          return res.status(400).json({
            success: false,
            message: 'Nama kelas dan jumlah mahasiswa wajib diisi'
          });
        }

        const updatedKelas = await Kelas.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true
        });
        if (!updatedKelas) {
          return res
            .status(404)
            .json({ success: false, message: 'Kelas not found' });
        }
        res.status(200).json({ success: true, data: updatedKelas });
      } catch (error) {
        console.error(error);
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    case 'DELETE':
      try {
        const deletedKelas = await Kelas.findByIdAndDelete(id);
        if (!deletedKelas) {
          return res
            .status(404)
            .json({ success: false, message: 'Kelas not found' });
        }
        res
          .status(200)
          .json({ success: true, message: 'Kelas deleted successfully' });
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
