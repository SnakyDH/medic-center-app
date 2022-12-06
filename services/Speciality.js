import { pool } from '../utils/dbConnection.js';
class Speciality {
  async getSpecialityT(title) {
    return await pool.query(`
    SELECT id FROM specialties WHERE '${title}'= speciality;
    `);
  }
  async getSpecialityId(id) {
    return await pool.query(`
    SELECT speciality FROM specialties WHERE '${id}'= id;
    `);
  }
}
export default Speciality;
