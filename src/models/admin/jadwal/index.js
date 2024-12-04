import mongoose from 'mongoose';

const JadwalSchema = new mongoose.Schema(
  {
    kelas: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Kelas',
      required: true
    },
    matkul: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Matkul',
      required: true
    },
    hari: {
      type: String,
      required: true,
      trim: true
    },
    waktu_mulai: {
      type: Timestamp,
      required: true,
      trim: true
    },
    waktu_selesai: {
      type: Timestamp,
      required: true,
      trim: true
    },
    ruangan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ruangan',
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Jadwal = mongoose.models.Jadwal || mongoose.model('Jadwal', JadwalSchema);

export default Jadwal;
