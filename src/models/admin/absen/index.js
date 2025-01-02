import mongoose from 'mongoose';
import QRCode from '../QRCode';
import Lokasi from '../lokasi';

const AbsenSchema = new mongoose.Schema(
  {
    mahasiswa: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Mahasiswa',
      required: true
    },
    qrcode: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'QRCode',
      required: true
    },
    waktu_absen: {
      type: Date,
      required: true,
      default: Date.now
    },
    lokasi: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Lokasi',
      required: true
    },
    status: {
      type: String,
      enum: ['Hadir', 'Terlambat', 'Tidak Hadir'],
      default: 'Hadir'
    }
  },
  {
    timestamps: true
  }
);

AbsenSchema.pre('save', async function (next) {
  try {
    // Cari QR Code untuk mendapatkan jadwal dan waktu expired
    const qrCode = await QRCode.findById(this.qrcode).populate('jadwal');
    if (!qrCode) {
      throw new Error('QR Code tidak ditemukan.');
    }

    // Validasi waktu absensi
    const waktuAbsenDate = new Date(this.waktu_absen);
    const { expired_at } = qrCode;

    if (waktuAbsenDate > expired_at) {
      this.status = 'Terlambat';
    } else {
      this.status = 'Hadir';
    }

    // Validasi lokasi berdasarkan IP WiFi
    const lokasiDB = await Lokasi.findById(this.lokasi);
    if (!lokasiDB) {
      throw new Error('Lokasi tidak ditemukan.');
    }

    // Asumsikan IP WiFi mahasiswa diterima sebagai input
    const ipMahasiswa = this.ipMahasiswa; // Tambahkan ipMahasiswa di input absensi
    if (lokasiDB.ipWifi !== ipMahasiswa) {
      throw new Error('IP WiFi mahasiswa tidak sesuai dengan lokasi absensi.');
    }

    next();
  } catch (error) {
    console.error('Error pada logika absensi:', error);
    next(error);
  }
});

const Absen = mongoose.models.Absen || mongoose.model('Absen', AbsenSchema);

export default Absen;
