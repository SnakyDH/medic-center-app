import { pool } from '../utils/dbConnection.js';
class Speciality {
  async getSpeciality(title) {
    return await pool.query(`
    SELECT id FROM specialties WHERE '${title}'= speciality;
    `);
  }
}
export default Speciality;
