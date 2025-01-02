import mongoose from 'mongoose';

const AkademikSchema = new mongoose.Schema(
  {
    th_akademik: { type: Number, required: true, unique: true },
    semester: { type: Number, required: true, min: 1 },
    status: { type: Boolean, default: true }
  },
  { timestamps: true }
);

const Akademik =
  mongoose.models.Akademik || mongoose.model('Akademik', AkademikSchema);

export default Akademik;
