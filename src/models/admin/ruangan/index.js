import mongoose from 'mongoose';

const RuanganSchema = new mongoose.Schema(
  {
    kd_ruangan: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    nama_ruangan: {
      type: String,
      required: true,
      trim: true
    },
    kapasitas: {
      type: Number,
      required: true,
      min: 1
    }
  },
  {
    timestamps: true
  }
);

const Ruangan =
  mongoose.models.Ruangan || mongoose.model('Ruangan', RuanganSchema);

export default Ruangan;
