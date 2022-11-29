import Router from 'express';
import patientsRoutes from '../api/patients/routes.js';

const router = Router();

router.use('/api/', patientsRoutes);

export default router;
