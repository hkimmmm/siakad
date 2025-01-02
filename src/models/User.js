import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 30
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/\S+@\S+\.\S+/, 'Email tidak valid']
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ['admin', 'dosen', 'mahasiswa'],
      required: true
    },
    dosen: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Dosen',
      required: function () {
        return this.role === 'dosen'; // Wajib hanya jika role adalah 'dosen'
      }
    },
    mahasiswa: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Mahasiswa',
      required: function () {
        return this.role === 'mahasiswa'; // Wajib hanya jika role adalah 'mahasiswa'
      }
    }
  },
  { timestamps: true }
);

// Hash password before saving user
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Compare password method
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;
