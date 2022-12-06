import Router from 'express';
import {
  getMedics,
  getMedic,
  createMedics,
  updateMedic,
  deleteMedic,
} from './controller.js';

const router = Router();

router.get('/medics', getMedics);
router.get('/medic/:id', getMedic);
router.post('/medics', createMedics);
router.put('/medic/:id', updateMedic);
router.delete('/medic/:id', deleteMedic);

export default router;
