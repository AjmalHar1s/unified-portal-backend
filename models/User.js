import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['student', 'employer', 'admin'], default: 'student' }
}, { timestamps: true });

export default mongoose.model('User', userSchema);
