import { pool } from '../../utils/dbConnection.js';
import Recovery from '../recovery/services.js';
import User from '../../services/User.js';
const recovery = new Recovery();
class Patient extends User {
  constructor() {
    super(3);
  }
  async insertOne({
    cc,
    name,
    password,
    phone,
    email,
    age,
    weight,
    height,
    birth,
    question,
    answer,
  }) {
    await super.insertOne({ cc, name, password, phone, email });
    await pool.query(
      `INSERT INTO patients (cc_user, age, weight, height, birth)
    VALUES (${cc},${age},${weight},${height},'${birth}');`
    );
    await recovery.insertOne({ cc, question, answer });
  }
  async findOne(cc) {
    return await pool.query(
      `SELECT
      *
      FROM Patients as p
      JOIN users as u
      ON(u.cc=p.cc_user)
      JOIN user_role as r
      ON (u.id_user_role=r.id)
      where ${cc}=u.cc`
    );
  }
  async findAll() {
    return await pool.query(
      'SELECT u.cc, u.name, u.phone, u.email, p.age, p.weight, p.height, p.birth FROM patients as p join users as u on(u.cc=p.cc_user)'
    );
  }
  async updateOne(id, newUser) {
    const { weight, height } = newUser;
    await pool.query(
      `UPDATE patients
	    SET weight=${weight}, height=${height} WHERE cc_user=${id};`
    );
    await super.updateOne(id, newUser);
  }
}

export default Patient;
