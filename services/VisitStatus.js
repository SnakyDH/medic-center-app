import { pool } from '../utils/dbConnection.js';
class VisitStatus {
  async getIdbyStatus(status) {
    return await pool.query(`
      SELECT id FROM visit_status WHERE '${status}'= status;
    `);
  }
}
export default VisitStatus;
