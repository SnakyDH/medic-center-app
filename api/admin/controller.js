import { encrypt } from '../../utils/password.js';
import Admin from './services.js';

const admin = new Admin();
export const getAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await admin.findOne(id);
    console.log(data.rowCount);
    if (data.rowCount !== 0) {
      console.log(data.rows.name);
      let user = {
        cc: data.rows[0].cc,
        name: data.rows[0].name,
        phone: data.rows[0].phone,
        email: data.rows[0].email,
        role: data.rows[0].role,
      };
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'Admin not found' });
    }
  } catch (error) {
    console.error(error.message);
  }
};
export const createAdmin = async (req, res) => {
  try {
    let pass = await encrypt(req.body.password);
    const user = req.body;
    user.password = pass;
    await admin.insertOne(user);
    res.status(201).json({ message: 'Admin created successfully' });
  } catch (error) {
    console.error(error.message);
  }
};
export const updateAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.body;
    await admin.updateOne(id, user);
    res.status(201).json({ message: 'Admin Updated' });
  } catch (error) {
    console.log(error);
  }
};
