import Admin from './services.js';

const admin = new Admin();
export const getAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await admin.findOne(id);
    if (data.rowCount !== 0) {
      let user = {
        cc: data.rows[0].cc,
        name: data.rows[0].name,
        age: data.rows[0].age,
        phone: data.rows[0].phone,
        email: data.rows[0].email,
        role: data.rows[0].role,
      };
      res.status(200).json(user);
    }
    res.status(404).json({ message: 'User not found' });
  } catch (error) {
    console.error(error.message);
  }
};
