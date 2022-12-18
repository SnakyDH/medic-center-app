import Router from 'express';
import {
  createAppointment,
  getAppointmentsMedics,
  getAppointmentsPatients,
} from './controller.js';

const router = Router();

router.post('/appointments', createAppointment);
router.get('/appointments/medics/:id', getAppointmentsMedics);
router.get('/appointments/patients/:id', getAppointmentsPatients);

export default router;
