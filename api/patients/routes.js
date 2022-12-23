import Router from 'express';
import {
  getPatients,
  getPatient,
  createPatients,
  updatePatient,
  updatePassword,
  deletePatient,
} from './controller.js';

const router = Router();

router.get('/patients', getPatients);
router.get('/patient/:id', getPatient);
router.post('/patients', createPatients);
router.put('/patient/:id', updatePatient);
router.put('/patient/:id/password', updatePassword);
router.delete('/patient/:id', deletePatient);

export default router;
