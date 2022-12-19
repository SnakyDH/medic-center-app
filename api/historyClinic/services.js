import { pool } from '../../utils/dbConnection.js';

class History {
  async findOne(id) {
    return await pool.query(`
    SELECT * FROM clinic_history WHERE id=${id};
    `);
  }
  async insertOne(cc) {
    await pool.query(`
    INSERT INTO clinic_history (cc_patients)
    VALUES (${cc});
    `);
  }
}
export default History;
