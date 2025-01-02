import mongoose from 'mongoose';

const MatkulSchema = new mongoose.Schema(
  {
    kode_matkul: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    nama_matkul: {
      type: String,
      required: true,
      trim: true
    },
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
    sks: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Matkul = mongoose.models.Matkul || mongoose.model('Matkul', MatkulSchema);

export default Matkul;
