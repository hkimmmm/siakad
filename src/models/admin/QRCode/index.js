import mongoose from 'mongoose';
import crypto from 'crypto';
import Jadwal from '../jadwal';

const QRCodeSchema = new mongoose.Schema(
  {
    jadwal: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Jadwal',
      required: true
    },
    token: {
      type: String,
      required: false,
      trim: true
    },
    expired_at: {
      type: Date,
      required: true,
      default: () => {
        const now = new Date();
        now.setMinutes(now.getMinutes() + 15);
        return now;
      }
    },
    status: {
      type: String,
      enum: ['Aktif', 'Kadaluarsa'],
      default: 'Aktif'
    }
  },
  {
    timestamps: true
  }
);

QRCodeSchema.pre('save', function (next) {
  if (this.isNew) {
    const secret = process.env.SECRET_KEY; // Pastikan SECRET_KEY terdefinisi di .env
    const data = `${this.jadwal}${Date.now()}`;
    const hmac = crypto.createHmac('sha256', secret);
    hmac.update(data);
    this.token = hmac.digest('hex'); // Menghasilkan token unik

    Jadwal.findById(this.jadwal)
      .then((jadwal) => {
        if (jadwal) {
          const now = new Date();
          const hariIni = now.getDay();

          const hariJadwal = [
            'Minggu',
            'Senin',
            'Selasa',
            'Rabu',
            'Kamis',
            'Jumat',
            'Sabtu'
          ].indexOf(jadwal.hari);

          const jarakHari =
            hariJadwal >= hariIni
              ? hariJadwal - hariIni
              : 7 - (hariIni - hariJadwal);

          const tanggalJadwal = new Date();
          tanggalJadwal.setDate(now.getDate() + jarakHari);
          tanggalJadwal.setHours(jadwal.jam_mulai.getHours());
          tanggalJadwal.setMinutes(jadwal.jam_mulai.getMinutes());
          tanggalJadwal.setSeconds(0);

          this.expired_at = new Date(tanggalJadwal.getTime() + 15 * 60 * 1000);

          next();
        } else {
          next(new Error('Jadwal tidak ditemukan.'));
        }
      })
      .catch((err) => {
        console.error('Error mencari Jadwal:', err);
        next(err);
      });
  } else {
    next();
  }
});

const QRCode = mongoose.models.QRCode || mongoose.model('QRCode', QRCodeSchema);

export default QRCode;
