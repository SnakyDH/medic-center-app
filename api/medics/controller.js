import Medic from './services.js';
import { encrypt } from '../../utils/password.js';

const medic = new Medic();

export const getMedics = async (req, res) => {
  try {
    const data = await medic.findAll();
    if (data.rowCount !== 0) {
      res.status(200).json(data.rows);
    }
    res.status(404).json({ message: 'Medics not found' });
  } catch (error) {
    console.error(error.message);
  }
};
export const getMedic = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await medic.findOne(id);
    if (data.rowCount !== 0) {
      let user = {
        cc: data.rows[0].cc,
        name: data.rows[0].name,
        phone: data.rows[0].phone,
        email: data.rows[0].email,
        speciality: data.rows[0].speciality,
        role: data.rows[0].role,
      };
      res.status(200).json(user);
    }
    res.status(404).json({ message: 'User not found' });
  } catch (error) {
    console.error(error.message);
  }
};

export const createMedics = async (req, res) => {
  const numMed = await medic.findAll();
  if (numMed.rowCount >= medic.max_medics) {
    res
      .status(304)
      .json({ message: 'Max medics created, please delete one for continue' });
  }
  let pass = await encrypt(req.body.password);
  let ans = await encrypt(req.body.answer);
  const user = req.body;
  user.password = pass;
  user.answer = ans;
  console.log(user);
  await medic.insertOne(user);
  res.status(201).json({ message: 'Doctor Created successfully' });
};
export const updateMedic = async (req, res) => {
  try {
    const { id } = req.params;
    const newUser = req.body;
    const user = await medic.findOne(id);
    if (user.rowCount !== 0) {
      await medic.updateOne(id, newUser);
      res.status(200).json({ message: 'Doctor updated successfully' });
    }
    res.status(404).json({ message: 'Doctor not found' });
  } catch (error) {
    console.error(error.message);
  }
};
export const deleteMedic = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await medic.findOne(id);
    if (user.rowCount !== 0) {
      await medic.updateActivity(id);
      res.status(200).json({ message: 'Doctor deleted successfully' });
    }
    res.status(404).json({ message: 'Doctor not found' });
  } catch (error) {
    console.error(error.message);
  }
};
export const updatePassword = async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;
    let pass = await encrypt(password);
    await medic.updatePassword(id, pass);
    res.status(200).json({ message: 'Password updated' });
  } catch (error) {
    console.error(error);
  }
};
