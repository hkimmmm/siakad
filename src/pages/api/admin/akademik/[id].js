import dbConnect from '@/lib/dbConnect';
import Akademik from '@/models/admin/akademik';

export default async function handler(req, res) {
  await dbConnect();

  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case 'GET':
      try {
        const akademik = await Akademik.findById(id);
        if (!akademik) {
          return res
            .status(404)
            .json({ success: false, message: 'Akademik not Found' });
        }
        res.status(200).json({ success: true, data: akademik });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    case 'PUT':
      try {
        const updatedAkademik = await Akademik.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true
        });
        if (!updatedAkademik) {
          return res
            .status(404)
            .json({ success: false, message: 'Akademik not found' });
        }
        res.status(200).json({ success: true, data: updatedAkademik });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    case 'DELETE':
      try {
        const deleteAkademik = await Akademik.findByIdAndDelete(id);
        if (!deleteAkademik) {
          return res
            .status(404)
            .json({ success: false, message: 'Akademik not found' });
        }
        res
          .status(200)
          .json({ success: true, message: 'Akademik deleted successfully' });
      } catch (error) {
        res.status(400).json({ success: false, message: error.message });
      }
      break;

    default:
      res.status(405).json({ success: false, message: 'Method Not Allowewd ' });
      break;
  }
}
