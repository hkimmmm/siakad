const mongoose = require('mongoose');

const LokasiSchema = new mongoose.Schema({
  nama_lokasi: {
    type: String,
    required: [true, 'Nama lokasi wajib diisi'],
    trim: true
  },
  ipWifi: {
    type: String,
    required: [true, 'IP WiFi wajib diisi'],
    unique: true,
    validate: {
      validator: function (v) {
        return /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
          v
        );
      },
      message: (props) => `${props.value} bukan IP Address yang valid!`
    }
  },
  deskripsi: {
    type: String,
    trim: true,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports =
  mongoose.models.Lokasi || mongoose.model('Lokasi', LokasiSchema);
