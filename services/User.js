import { pool } from '../utils/dbConnection.js';

class User {
  constructor(role) {
    this.role = role; // type user
  }
  async insertOne({ cc, name, password, phone, email }) {
    await pool.query(
      `INSERT INTO users (cc, name, password, phone, email, id_user_role)
      VALUES (${cc},'${name}','${password}','${phone}','${email}',${this.role});`
    );
  }
  async findOne(cc) {
    return await pool.query(`
    SELECT u.cc, u.name, u.phone, u.email, r.role,u.password
    FROM Users as u
    JOIN user_role as r
    ON (u.id_user_role=r.id)
    WHERE u.cc=${cc};
    `);
  }
  async updateOne(cc, newUser) {
    const { name, phone, email } = newUser;
    await pool.query(
      `UPDATE users	SET name='${name}', phone='${phone}', email='${email}' WHERE cc=${cc};`
    );
  }
  async updatePassword(cc, password) {
    await pool.query(`
    UPDATE users
    SET password='${password}'
    WHERE cc=${cc};
    `);
  }
  async updateActivity(cc) {
    await pool.query(`
    UPDATE users
    SET activity=${false}
    WHERE cc=${cc};
    `);
  }
}
export default User;
