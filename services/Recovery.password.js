import { pool } from '../utils/dbConnection.js';
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
      SELECT cc_user, question, answer
	    FROM info_password
      WHERE cc_user=${cc};`
    );
  }
}
export default Recovery;
