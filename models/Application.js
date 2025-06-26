import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
  studentId: String,
  jobId: String,
  status: { type: String, enum: ['applied', 'accepted', 'rejected'], default: 'applied' },
  appliedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Application', applicationSchema);
