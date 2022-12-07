import { checkPass } from '../../utils/password.js';
import User from '../../Services/User.js';

const user = new User();

export const verifyLogin = async (req, res, next) => {
  try {
    const aUser = req.user;
    if (!aUser) {
      res.status(401).json({ message: 'Incorrect Credentials' });
    } else {
      res.status(200).json({
        id: aUser.cc,
        name: aUser.name,
        role: aUser.role,
      });
    }
  } catch (error) {
    console.log('ESTOY EN EL ERRROR :C');
    next(error);
  }
    /*
  const { cc, password } = req.body;
  const aUser = await user.findOne(cc);
  const userDB = aUser.rows[0];
  const isMatch = await checkPass(password, userDB.password);
  if (!isMatch) {
  } else {
    res.status(200).json({
      id: userDB.cc,
      name: userDB.name,
      role: userDB.role,
    });
  } */
};
