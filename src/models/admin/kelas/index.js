import mongoose from 'mongoose';

const KelasSchema = new mongoose.Schema({
  nama_kelas: { type: String, required: true },
  prodi: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Prodi',
    required: true
  },
  akademik: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Akademik',
    required: true
  },
  jumlah_mahasiswa: { type: Number, required: true }
});

const Kelas = mongoose.models.Kelas || mongoose.model('Kelas', KelasSchema);

export default Kelas;
