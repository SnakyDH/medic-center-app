import Patient from './services.js';

const patient = new Patient();

export const getPatients = async (req, res) => {
  const allPatients = await patient.findAll();
  res.status(200).json(allPatients.rows);
};
