import Router from 'express';
import { getPatients } from './controller.js';

const router = Router();

router.get('/patients', getPatients);
router.get('/patient/:id' /*  getPatient */);
router.post('/patients' /* createPatients */);
router.put('/patients' /* updatePatients */);
router.patch('/patient/:id' /* updatePatient */);
router.delete('/patient/:id' /* deletePatient */);

export default router;
