import mongoose from 'mongoose';

const MahasiswaSchema = new mongoose.Schema(
  {
    nim: {
      type: Number, // Gunakan `Number`, bukan `Int`
      required: true,
      unique: true,
      trim: true
    },
    nama_mahasiswa: {
      type: String,
      required: true,
      trim: true
    },
    prodi: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Prodi', // Referensi ke model `Prodi`
      required: true
    },
    kelas: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Kelas', // Referensi ke model `Kelas`
      required: true
    },
    akademik: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Akademik', // Referensi ke model `Akademik`
      required: true
    },
    gambar: {
      type: String, // URL gambar atau path file
      required: false // Tidak wajib
    },
    email: {
      type: String,
      required: false, // Tidak wajib
      trim: true
    },
    no_telepon: {
      type: String, // Nomor telepon disimpan sebagai `String`
      required: true,
      trim: true
    },
    alamat: {
      type: String, // Alamat disimpan sebagai `String`
      required: false,
      trim: true
    },
    status: {
      type: String,
      enum: ['Aktif', 'Tidak Aktif'], // Status hanya bisa "Aktif" atau "Tidak Aktif"
      default: 'Aktif' // Default status adalah "Aktif"
    }
  },
  { timestamps: true }
);

export default mongoose.models.Mahasiswa ||
  mongoose.model('Mahasiswa', MahasiswaSchema);
