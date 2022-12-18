import Appointment from './services.js';

const appointment = new Appointment();

export const createAppointment = async (req, res) => {
  try {
    const { hour, date, cc_patients, cc_doctors } = req.body;
    await appointment.insertOne(hour, date, cc_patients, cc_doctors);
    res.status(201).json({ message: 'Appointment Created successfully' });
  } catch (error) {
    console.error(error.message);
  }
};

export const getAppointmentsMedics = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await appointment.findAllAppointmentsM(id);
    if (data.rowCount !== 0) {
      res.status(200).json(data.rows);
    }
    res.status(404).json({ message: 'Appointments not found' });
  } catch (error) {
    console.error(error.message);
  }
};

export const getAppointmentsPatients = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await appointment.findAllAppointmentsP(id);
    if (data.rowCount !== 0) {
      res.status(200).json(data.rows);
    }
    res.status(404).json({ message: 'Appointments not found' });
  } catch (error) {
    console.error(error.message);
  }
};
