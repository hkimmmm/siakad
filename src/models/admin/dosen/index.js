import mongoose from 'mongoose';

const DosenSchema = new mongoose.Schema(
  {
    kode_dosen: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    nama_dosen: {
      type: String,
      required: true,
      trim: true
    },
    nip: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, 'Email is invalid']
    },
    no_telepon: {
      type: String,
      required: true,
      trim: true
    },
    alamat: {
      type: String,
      required: true,
      trim: true
    },
    gelar: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.models.Dosen || mongoose.model('Dosen', DosenSchema);
