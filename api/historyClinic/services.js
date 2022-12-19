import { pool } from '../../utils/dbConnection.js';

class History {
  async findOne(id) {
    return await pool.query(`
    SELECT c.id,c.cc_patients,u.name,u.activity,p.age,p.weight,p.height,p.birth,v.date,v.description, vs.status
    FROM clinic_history as c
    JOIN patients as p
    ON (c.cc_patients = p.cc_user)
    JOIN users as u
    ON (p.cc_user=u.cc)
    JOIN visits as v
    ON (c.cc_patients = v.cc_patients)
    JOIN visit_status as vs
    ON (v.id_visit_status = vs.id)
    WHERE id=${id} and (vs.status='Efectuada' or vs.status='Canceladas');
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
