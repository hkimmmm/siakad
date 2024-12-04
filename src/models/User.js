import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user', 'mahasiswa'], default: 'user' }
});

// Export the schema only once
export default mongoose.models.User || mongoose.model('User', UserSchema);
