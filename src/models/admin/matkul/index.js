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
    semester: {
      type: String,
      required: true,
      trim: true
    },
    sks: {
      type: Number,
      required: true
    },
    dosen: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Dosen',
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Matkul = mongoose.models.Matkul || mongoose.model('Matkul', MatkulSchema);

export default Matkul;
