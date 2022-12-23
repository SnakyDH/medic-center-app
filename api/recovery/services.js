import { pool } from '../../utils/dbConnection.js';
class Recovery {
  async insertOne({ cc, question, answer }) {
    await pool.query(
      `INSERT INTO info_password (cc_user,question,answer)
      VALUES (${cc},'${question}','${answer}');`
    );
  }
  async findOne(cc) {
    return await pool.query(
      `
      	SELECT i.cc_user, i.question, i.answer, r.role
	      FROM info_password as i
	      JOIN users as u
	      ON (i.cc_user=u.cc)
	      JOIN user_role as r
	      ON (r.id=u.id_user_role)
        WHERE cc_user=${cc};`
    );
  }
}
export default Recovery;
