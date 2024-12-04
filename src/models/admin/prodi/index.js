import mongoose from 'mongoose';

const ProdiSchema = new mongoose.Schema({
  kd_prodi: { type: String, required: true, unique: true },
  nama_prodi: { type: String, required: true },
  jenjang: { type: String, required: true, default: 'D3' }
});

const Prodi = mongoose.models.Prodi || mongoose.model('Prodi', ProdiSchema);

export default Prodi;
