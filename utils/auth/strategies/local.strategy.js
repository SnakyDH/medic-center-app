import { Strategy } from 'passport-local';
import boom from '@hapi/boom';
import User from '../../../services/User.js';
import { checkPass } from '../../password.js';
const user = new User();
export const localStrategy = new Strategy(async (username, password, done) => {
  // * default the space call username, password but with a param with options
  try {
    const userDB = await user.findOne(username);
    if (!userDB.rows[0]) {
      done(boom.unauthorized, false);
    }
    const isMatch = await checkPass(password, userDB.rows[0].password);
    if (!isMatch) {
      done(boom.unauthorized, false);
    }
    done(null, userDB.rows[0]);
  } catch (error) {
    done(error, false);
  }
});
