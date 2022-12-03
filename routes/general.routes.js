import Router from 'express';
import patientsRoutes from '../api/patients/routes.js';
import adminRoutes from '../api/admin/routes.js';
const router = Router();

router.use('/api/', patientsRoutes, adminRoutes);

export default router;
