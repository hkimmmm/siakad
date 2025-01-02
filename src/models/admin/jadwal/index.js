import mongoose from 'mongoose';

const JadwalSchema = new mongoose.Schema(
  {
    matkul: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Matkul',
      required: true
    },
    kelas: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Kelas',
      required: true
    },
    dosen: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Dosen',
      required: true
    },
    hari: {
      type: String,
      required: true,
      trim: true
    },
    jam_mulai: {
      type: Date,
      required: true
    },
    jam_selesai: {
      type: Date,
      required: true,
      validate: {
        validator: function (value) {
          return value > this.jam_mulai;
        },
        message: 'Jam selesai harus lebih besar dari jam mulai.'
      }
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
