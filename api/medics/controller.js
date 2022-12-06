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
        age: data.rows[0].age,
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
  const user = req.body;
  user.password = pass;
  await medic.insertOne(user);
  res.status(201).json({ message: 'User Created successfully' });
};
export const updateMedic = async (req, res) => {
  try {
    const { id } = req.params;
    const newUser = req.body;
    const user = await medic.findOne(id);
    if (user.rowCount !== 0) {
      await medic.updateOne(id, newUser);
      res.status(200).json({ message: 'User updated successfully' });
    }
    res.status(404).json({ message: 'User not found' });
  } catch (error) {
    console.error(error.message);
  }
};
export const deleteMedic = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await medic.findOne(id);
    if (user.rowCount !== 0) {
      await medic.deleteOne(id);
      res.status(200).json({ message: 'User deleted successfully' });
    }
    res.status(404).json({ message: 'User not found' });
  } catch (error) {
    console.error(error.message);
  }
};
