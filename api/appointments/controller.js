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

export const getPreviouslyAppointmentsMedic = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await appointment.findAllPreviouslyMedic(id);
    if (data.rowCount !== 0) {
      res.status(200).json(data.rows);
    }
    res.status(404).json({ message: 'Appointments not found' });
  } catch (error) {
    console.error(error.message);
  }
};

export const getPreviouslyAppointmentsPatient = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await appointment.findAllPreviouslyPatient(id);
    if (data.rowCount !== 0) {
      res.status(200).json(data.rows);
    }
    res.status(404).json({ message: 'Appointments not found' });
  } catch (error) {
    console.error(error.message);
  }
};

export const getAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await appointment.findOne(id);
    if (data.rowCount !== 0) {
      let user = {
        id: data.rows[0].id,
        hour: data.rows[0].hour,
        date: data.rows[0].date,
        name: data.rows[0].name,
        cc: data.rows[0].cc,
        description: data.rows[0].description,
        status: data.rows[0].status,
      };
      res.status(200).json(user);
    }
    res.status(404).json({ message: 'Appointment not found' });
  } catch (error) {
    console.error(error.message);
  }
};
