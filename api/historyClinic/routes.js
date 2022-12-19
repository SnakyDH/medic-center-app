import Router from 'express';
import { getMedicalHistory } from './controller.js';

const router = Router();

router.get('/medicalHistory/:id', getMedicalHistory);
export default router;
