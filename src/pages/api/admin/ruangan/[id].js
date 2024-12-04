import dbConnect from '@/lib/dbConnect';
import Ruangan from '@/models/admin/ruangan';

export default async function handler(req, res) {
  await dbConnect;

  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case 'GET':
      try {
        const ruangan = await Ruangan.findOne({ kd_ruangan: id });
        if (!ruangan) {
          return res
            .status(404)
            .json({ success: false, message: 'Ruangan not found' });
        }
        res.status(200).json({ succes: true, data: ruangan });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    case 'PUT':
      try {
        const updateRuangan = await Ruangan.findOneAndUpdate(
          { kd_ruangan: id },
          req.body,
          { new: true, runValidators: true }
        );
        if (!updateRuangan) {
          return res
            .status(400)
            .json({ succes: false, message: 'Ruangan not found' });
        }
        res.status(200).json({ succes: true, data: updateRuangan });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    case 'DELETE':
      try {
        const deletedRuangan = await Ruangan.findOneAndDelete({
          kd_ruangan: id
        });
        if (!deletedRuangan) {
          return res
            .status(400)
            .json({ succes: false, message: 'Ruangan not found' });
        }
        res
          .status(200)
          .json({ succes: false, message: 'Prodi deleted successfully' });
      } catch (error) {
        res.status(400).json({ succes: false, message: error.message });
      }
      break;

    default:
      res.status(405).json({ succes: false, message: 'Method Not Allowed' });
      break;
  }
}
