import dbConnect from '@/lib/dbConnect';
import Lokasi from '@/models/admin/lokasi';

export default async function handler(req, res) {
  await dbConnect();

  const { method } = req;

  switch (method) {
    case 'POST':
      try {
        const { nama_lokasi, ipWifi, deskripsi } = req.body;

        if (!nama_lokasi || !ipWifi || !deskripsi) {
          return res
            .status(400)
            .json({ success: false, message: 'Semua data wajib diisi.' });
        }

        const newLokasi = new Lokasi({ nama_lokasi, ipWifi, deskripsi });
        await newLokasi.save();

        res.status(201).json({ success: true, data: newLokasi });
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
      break;

    case 'GET':
      try {
        const lokasiList = await Lokasi.find({});
        res.status(200).json({ success: true, data: lokasiList });
      } catch (error) {
        res.status(500).json({ success: false, message: error.message });
      }
      break;

    default:
      res.status(405).json({ success: false, message: 'Method Not Allowed' });
      break;
  }
}
