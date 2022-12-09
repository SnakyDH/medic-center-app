import Router from 'express';
import patientsRoutes from '../api/patients/routes.js';
import adminRoutes from '../api/admin/routes.js';
import docRoutes from '../api/medics/routes.js';
import authRoutes from '../api/auth/routes.js';
import recoveryRoutes from '../api/recovery/routes.js';
import userRoutes from '../api/users/routes.js';
const router = Router();

router.use(
  '/api/',
  patientsRoutes,
  adminRoutes,
  docRoutes,
  recoveryRoutes,
  userRoutes
);
router.use('/auth/', authRoutes);
export default router;
