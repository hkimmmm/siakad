import mongoose from 'mongoose';

const LokasiSchema = new mongoose.Schema(
  {
    nama_lokasi: {
      type: String,
      required: true
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        required: true
      },
      coordinates: {
        type: [Number],
        required: true
      }
    },
    radius_meter: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

LokasiSchema.index({ location: '2dsphere' });

const Lokasi = mongoose.models.Lokasi || mongoose.model('Lokasi', lokasiSchema);

module.exports = Lokasi;
