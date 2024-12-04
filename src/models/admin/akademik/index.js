import mongoose from 'mongoose';

const AkademikSchema = new mongoose.Schema({
  th_akademik: { type: Number, required: true, unique: true },
  semester: { type: String, enum: ['Ganjil', 'Genap'] },
  status: { type: Boolean, default: true }
});

const Akademik =
  mongoose.models.Akademik || mongoose.model('Akademik', AkademikSchema);

export default Akademik;
