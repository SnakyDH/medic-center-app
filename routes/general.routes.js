import Router from 'express';
import patientsRoutes from '../api/patients/routes.js';
import adminRoutes from '../api/admin/routes.js';
import docRoutes from '../api/medics/routes.js';
import authRoutes from '../api/auth/routes.js';
import recoveryRoutes from '../api/recovery/routes.js';
import appointmentRoutes from '../api/appointments/routes.js';
const router = Router();

router.use(
  '/api/',
  patientsRoutes,
  adminRoutes,
  docRoutes,
  recoveryRoutes,
  appointmentRoutes
);
router.use('/auth/', authRoutes);
export default router;
