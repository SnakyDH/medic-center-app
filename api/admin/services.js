import { pool } from '../../utils/dbConnection.js';
class Admin {
  constructor() {
    this.role = 1;
  }
  async findOne(cc) {
    return await pool.query(`
    SELECT u.cc, u.name, u.phone, u.email, r.role FROM users as u join user_role as r on(u.id_user_role=r.id)
      WHERE ${cc}=u.cc`);
  }
}
export default Admin;
