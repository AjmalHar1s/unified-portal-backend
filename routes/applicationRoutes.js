import express from 'express';
import {
  applyToJob,
  getApplicationsByStudent,
  getApplicantsByJob,
  updateApplicationStatus
} from '../controllers/applicationController.js';

const router = express.Router();

router.post('/', applyToJob);
router.get('/student/:id', getApplicationsByStudent);
router.get('/job/:id', getApplicantsByJob);
router.patch('/:id', updateApplicationStatus);

export default router;
