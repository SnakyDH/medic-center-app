import Router from 'express';
import {
  getMedic,
  createMedics,
  updateMedic,
  deleteMedic,
} from './controller.js';

const router = Router();

router.get('/medic/:id', getMedic);
router.post('/medics', createMedics);
router.patch('/medic/:id', updateMedic);
router.delete('/medic/:id', deleteMedic);

export default router;
