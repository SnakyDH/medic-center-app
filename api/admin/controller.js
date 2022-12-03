import Admin from './services.js';
const admin = new Admin();
export const getAdmin = async (req, res) => {
  const { id } = req.params;
  const user = await admin.findOne(id);
  res.status(200).json(user.rows);
};
