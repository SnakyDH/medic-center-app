import Router from 'express';
import patientsRoutes from '../api/patients/routes.js';
import adminRoutes from '../api/admin/routes.js';
import docRoutes from '../api/medics/routes.js';
import authRoutes from '../api/auth/routes.js';

const router = Router();

router.use('/api/', patientsRoutes, adminRoutes, docRoutes);
router.use('/auth/', authRoutes);
export default router;
