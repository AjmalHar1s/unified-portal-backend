import Job from '../models/Job.js';

export const createJob = async (req, res) => {
  try {
    const job = await Job.create(req.body);
    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getJobsByEmployer = async (req, res) => {
  try {
    const jobs = await Job.find({ employerId: req.params.id });
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Approve or Reject a Job
export const updateJobStatus = async (req, res) => {
  try {
    const jobId = req.params.id;
    const { status } = req.body;

    const updated = await Job.findByIdAndUpdate(
      jobId,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

