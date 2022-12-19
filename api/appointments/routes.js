import Router from 'express';
import {
  createAppointment,
  getAppointmentsMedics,
  getAppointmentsPatients,
  getPreviouslyAppointmentsMedic,
  getPreviouslyAppointmentsPatient,
  getAppointment,
  getAppointments,
  getAppointmentsRealized,
  getAppointmentsRealizedWeekly,
  getAppointmentsRealizedBiweekly,
  getAppointmentsRealizedMonthly,
  getAppointmentsRealizedBiannual,
} from './controller.js';

const router = Router();

router.post('/appointments', createAppointment);
router.get('/appointments/medics/:id', getAppointmentsMedics);
router.get('/appointments/patients/:id', getAppointmentsPatients);
router.get('/appointments/medics/:id/prev', getPreviouslyAppointmentsMedic);
router.get('/appointments/patients/:id/prev', getPreviouslyAppointmentsPatient);
router.get('/appointments/:id', getAppointment);
router.get('/appointments', getAppointments);
router.get('/appointments/filters/all', getAppointmentsRealized);
router.get('/appointments/filters/weekly', getAppointmentsRealizedWeekly);
router.get('/appointments/filters/biweekly', getAppointmentsRealizedBiweekly);
router.get('/appointments/filters/monthly', getAppointmentsRealizedMonthly);
router.get('/appointments/filters/biannual', getAppointmentsRealizedBiannual);
export default router;
