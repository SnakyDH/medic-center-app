import { pool } from '../../utils/dbConnection.js';
import Speciality from '../../services/Speciality.js';
import User from '../../services/User.js';
const user = new User();
const speciality = new Speciality();
class Medic {
  constructor() {
    this.role = 2;
    this.max_medics = 10;
  }
  async insertOne({ cc, name, password, phone, email, specialityTitle }) {
    await pool.query(
      `INSERT INTO users (cc, name, password, phone, email, id_user_role)
      VALUES (${cc},'${name}','${password}','${phone}','${email}',${this.role});`
    );
    const data = await speciality.getSpecialityT(specialityTitle);
    const id_especiality = data.rows[0].id;
    await pool.query(
      `INSERT INTO doctors (cc_user,id_specialties)
      VALUES (${cc},${id_especiality});`
    );
  }
  async findOne(cc) {
    return await pool.query(
      `
      SELECT *
      FROM doctors as d
      JOIN users as u
      ON(u.cc=d.cc_user)
      JOIN user_role as r
      ON (u.id_user_role=r.id)
      JOIN specialties as s
      ON (d.id_specialties=s.id)
      where ${cc}=u.cc;`
    );
  }
  async findAll() {
    return await pool.query(
      `SELECT u.cc, u.name, u.phone, u.email, s.speciality
      FROM users as u
      JOIN doctors as d
      ON (u.cc=d.cc_user)
      JOIN specialties as s
      ON (d.id_specialties=s.id);`
    );
  }
  async updateOne(cc, newUser) {
    const { name, phone, email } = newUser;
    await pool.query(
      `UPDATE users	SET name='${name}', phone='${phone}', email='${email}' WHERE cc=${cc};`
    );
  }
  async deleteOne(cc) {
    await pool.query(`
    DELETE FROM doctors WHERE cc_user=${cc};
    `);
    await pool.query(`
    DELETE FROM users WHERE cc=${cc};
    `);
  }
}

export default Medic;
