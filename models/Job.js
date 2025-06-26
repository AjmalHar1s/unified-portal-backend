import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  title: String,
  company: String,
  type: { type: String, enum: ['Internship', 'Freelance'], default: 'Internship' },
  location: String,
  description: String,
  skills: [String],
  employerId: String,
  postedAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['pending', 'approved'], default: 'pending' }
});

export default mongoose.model('Job', jobSchema);
