import Admin from './services.js';

const admin = new Admin();
export const getAdmin = async (req, res) => {
  const { id } = req.params;
  const user = await admin.findOne(id);
  if (user.rowCount !== 0) {
    res.status(200).json(user.rows);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};
