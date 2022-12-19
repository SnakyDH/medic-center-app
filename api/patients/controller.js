import Patient from './services.js';
import { encrypt } from '../../utils/password.js';
import History from '../historyClinic/services.js';
const patient = new Patient();
const history = new History();
export const getPatients = async (req, res) => {
  const allPatients = await patient.findAll();
  res.status(200).json(allPatients.rows);
};
export const getPatient = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await patient.findOne(id);
    if (data.rowCount !== 0) {
      let user = {
        cc: data.rows[0].cc,
        name: data.rows[0].name,
        age: data.rows[0].age,
        phone: data.rows[0].phone,
        email: data.rows[0].email,
        height: data.rows[0].height,
        weight: data.rows[0].weight,
        birth: data.rows[0].birth,
        role: data.rows[0].role,
      };
      res.status(200).json(user);
    }
    res.status(404).json({ message: 'Patient not found' });
  } catch (error) {
    console.error(error.message);
  }
};
export const createPatients = async (req, res) => {
  const { cc } = req.body;
  let pass = await encrypt(req.body.password);
  let ans = await encrypt(req.body.answer);
  const user = req.body;
  user.password = pass;
  user.answer = ans;
  await patient.insertOne(user);
  await history.insertOne(cc);
  res.status(201).json({ message: 'Patient created successfully' });
};
export const updatePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const newUser = req.body;
    const user = await patient.findOne(id);
    if (user.rowCount !== 0) {
      await patient.updateOne(id, newUser);
      res.status(200).json({ message: 'Patient updated successfully' });
    }
    res.status(404).json({ message: 'Patient not found' });
  } catch (error) {
    console.error(error.message);
  }
};
export const deletePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await patient.findOne(id);
    if (user.rowCount !== 0) {
      await patient.updateActivity(id);
      res.status(200).json({ message: 'Patient deleted successfully' });
    }
    res.status(404).json({ message: 'Patient not found' });
  } catch (error) {
    console.error(error.message);
  }
};
export const updatePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;
    let pass = await encrypt(password);
    await patient.updatePassword(id, pass);
    res.status(200).json({ message: 'Password updated' });
  } catch (error) {
    console.error(error);
  }
};
