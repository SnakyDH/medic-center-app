import { pool } from '../../utils/dbConnection.js';
import Speciality from '../../services/Speciality.js';
import Recovery from '../recovery/services.js';
import User from '../../services/User.js';
const speciality = new Speciality();
const recovery = new Recovery();
class Medic extends User {
  constructor() {
    super(2);
    this.max_medics = 10;
  }
  async insertOne({
    cc,
    name,
    password,
    phone,
    email,
    specialityTitle,
    question,
    answer,
  }) {
    await super.insertOne({ cc, name, password, phone, email });
    const data = await speciality.getSpecialityT(specialityTitle);
    const id_especiality = data.rows[0].id;
    await pool.query(
      `INSERT INTO doctors (cc_user,id_specialties)
      VALUES (${cc},${id_especiality});`
    );
    await recovery.insertOne({ cc, question, answer });
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
  async findBySpeciality(speciality) {
    return await pool.query(
      `
      SELECT u.cc, u.name, u.phone, u.email, s.speciality
      FROM users as u
      JOIN doctors as d
      ON (u.cc=d.cc_user)
      JOIN specialties as s
      ON (d.id_specialties=s.id)
      WHERE s.speciality='${speciality}';
      `
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
}

export default Medic;
