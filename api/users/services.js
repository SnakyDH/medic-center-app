import { pool } from '../../utils/dbConnection.js';

class User {
  async findOne(cc) {
    return await pool.query(`
    SELECT cc, name, password, role
    FROM Users as u
    JOIN user_role as r
    ON (u.id_user_role=r.id)
    WHERE u.cc=${cc};
    `);
  }
  async updatePassword(cc, password) {
    await pool.query(`
    UPDATE users
    SET password=${password}
    WHERE cc=${cc};
    `);
  }
}
export default User;
