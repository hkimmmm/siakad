import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema({
  role: { type: String, required: true, unique: true },
  description: { type: String, default: '' },
  permissions: { type: [String], default: [] }
});

const Role = mongoose.models.Role || mongoose.model('Role', roleSchema);
export default Role;
