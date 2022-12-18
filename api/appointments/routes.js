import Router from 'express';
import {
  createAppointment,
  getAppointmentsMedics,
  getAppointmentsPatients,
  getPreviouslyAppointmentsMedic,
  getPreviouslyAppointmentsPatient,
  getAppointment,
} from './controller.js';

const router = Router();

router.post('/appointments', createAppointment);
router.get('/appointments/medics/:id', getAppointmentsMedics);
router.get('/appointments/patients/:id', getAppointmentsPatients);
router.get('/appointments/medics/:id/prev', getPreviouslyAppointmentsMedic);
router.get('/appointments/patients/:id/prev', getPreviouslyAppointmentsPatient);
router.get('/appointments/:id', getAppointment);

export default router;
