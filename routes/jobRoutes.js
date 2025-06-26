import express from 'express';
import { createJob, getAllJobs, getJobsByEmployer, updateJobStatus } from '../controllers/jobController.js';

const router = express.Router();

router.post('/', createJob);
router.get('/', getAllJobs);
router.get('/employer/:id', getJobsByEmployer);
router.patch('/:id', updateJobStatus); 


export default router;
