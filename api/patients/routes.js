import Router from 'express';
import {
  getPatients,
  getPatient,
  createPatients,
  updatePatient,
  deletePatient,
} from './controller.js';

const router = Router();

router.get('/patients', getPatients);
router.get('/patient/:id', getPatient);
router.post('/patients', createPatients);
router.put('/patient/:id', updatePatient);
router.delete('/patient/:id', deletePatient);

export default router;
