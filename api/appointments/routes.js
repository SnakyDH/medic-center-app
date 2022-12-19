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
  getAppointmentsCanceled,
  getAppointmentsCanceledWeekly,
  getAppointmentsCanceledBiweekly,
  getAppointmentsCanceledMonthly,
  getAppointmentsCanceledBiannual,
} from './controller.js';

const router = Router();

router.post('/appointments', createAppointment);
router.get('/appointments/medics/:id', getAppointmentsMedics);
router.get('/appointments/patients/:id', getAppointmentsPatients);
router.get('/appointments/medics/:id/prev', getPreviouslyAppointmentsMedic);
router.get('/appointments/patients/:id/prev', getPreviouslyAppointmentsPatient);
router.get('/appointments/:id', getAppointment);
router.get('/appointments', getAppointments);
router.get('/appointments/filters/Realizedall', getAppointmentsRealized);
router.get(
  '/appointments/filters/Realizedweekly',
  getAppointmentsRealizedWeekly
);
router.get(
  '/appointments/filters/Realizedbiweekly',
  getAppointmentsRealizedBiweekly
);
router.get(
  '/appointments/filters/Realizedmonthly',
  getAppointmentsRealizedMonthly
);
router.get(
  '/appointments/filters/Realizedbiannual',
  getAppointmentsRealizedBiannual
);
router.get('/appointments/filters/Canceledall', getAppointmentsCanceled);
router.get(
  '/appointments/filters/Canceledweekly',
  getAppointmentsCanceledWeekly
);
router.get(
  '/appointments/filters/Canceledbiweekly',
  getAppointmentsCanceledBiweekly
);
router.get(
  '/appointments/filters/Canceledmonthly',
  getAppointmentsCanceledMonthly
);
router.get(
  '/appointments/filters/Canceledbiannual',
  getAppointmentsCanceledBiannual
);
export default router;
