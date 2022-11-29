import { pool } from '../../services/dbConnection.js';

class Patient {
  async findAll() {
    // todo: change SQL query
    return await pool.query('SELECT * FROM user_role');
  }
}

export default Patient;
