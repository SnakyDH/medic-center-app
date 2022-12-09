import User from './services.js';
import { encrypt } from '../../utils/password.js';
const user = new User();

export const updatePassword = async (req, res) => {
  try {
    const { cc } = req.params;
    const { password } = req.body;
    let pass = await encrypt(password);
    await user.updatePassword(cc, pass);
    res.status(200).json({ message: 'Password updated' });
  } catch (error) {
    console.error(error);
  }
};
