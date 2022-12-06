import { pool } from '../../utils/dbConnection.js';
class Patient {
  constructor() {
    this.role = 3;
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
  }) {
    await pool.query(
      `INSERT INTO users (cc, name, password, phone, email, id_user_role)
      VALUES (${cc},'${name}','${password}','${phone}','${email}',${this.role});`
    );
    await pool.query(
      `INSERT INTO patients (cc_user, age, weight, height, birth)
    VALUES (${cc},${age},${weight},${height},'${birth}');`
    );
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
    const { name, phone, email, weight, height } = newUser;
    await pool.query(
      `UPDATE patients
	    SET weight=${weight}, height=${height} WHERE cc_user=${id};`
    );
    await pool.query(
      `UPDATE users	SET name='${name}', phone='${phone}', email='${email}' WHERE cc=${id};`
    );
  }
  async deleteOne(cc) {
    await pool.query(`
    DELETE FROM patients WHERE cc_user=${cc}
    `);
    await pool.query(`
    DELETE FROM users WHERE cc=${cc};
    `);
  }
}

export default Patient;
