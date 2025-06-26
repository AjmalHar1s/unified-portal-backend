import Application from '../models/Application.js';
import User from '../models/User.js'; // for student info

// Student applies to a job
export const applyToJob = async (req, res) => {
  try {
    const { studentId, jobId } = req.body;

    // Check if already applied
    const exists = await Application.findOne({ studentId, jobId });
    if (exists) return res.status(400).json({ message: 'Already applied to this job' });

    const application = await Application.create({ studentId, jobId });
    res.status(201).json(application);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all applications by a student
export const getApplicationsByStudent = async (req, res) => {
  try {
    const studentId = req.params.id;
    const applications = await Application.find({ studentId });
    res.status(200).json(applications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all applicants for a job (with student info)
export const getApplicantsByJob = async (req, res) => {
  try {
    const applications = await Application.find({ jobId: req.params.id });

    const detailed = await Promise.all(
      applications.map(async (app) => {
        const student = await User.findById(app.studentId).lean();
        return {
          ...app.toObject(),
          student: {
            name: student?.name || 'Unknown',
            email: student?.email || 'N/A',
          }
        };
      })
    );

    res.status(200).json(detailed);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update application status
export const updateApplicationStatus = async (req, res) => {
  try {
    const applicationId = req.params.id;
    const { status } = req.body;

    const updated = await Application.findByIdAndUpdate(
      applicationId,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Application not found' });
    }

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
