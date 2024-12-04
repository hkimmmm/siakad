// models/Role.js
import mongoose from 'mongoose';

const RoleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  permissions: {
    type: [String],
    default: []
  }
});

export default mongoose.models.Role || mongoose.model('Role', RoleSchema);
