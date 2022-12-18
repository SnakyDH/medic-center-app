import { pool } from '../../utils/dbConnection.js';
//import VisitStatus from '../../services/VisitStatus.js';
//const objVisit = new VisitStatus();
class Appointment {
  constructor() {}
  async insertOne(hour, date, cc_patients, cc_doctors) {
    await pool.query(
      `INSERT INTO visits (hour, date, cc_patients, cc_doctors)
      VALUES ('${hour}','${date}',${cc_patients},${cc_doctors});`
    );
  }
  async findAllAppointmentsM(cc) {
    return await pool.query(
      `select v.id, v.hour, v.date, us.name, us.cc, s.status
        from visits as v
        JOIN visit_status as s
        ON (v.id_visit_status=s.id)
        JOIN doctors as d
        ON (d.cc_user=v.cc_doctors)
        JOIN patients as p
        ON (p.cc_user=v.cc_patients)
		    JOIN specialties as sp
		    ON (d.id_specialties=sp.id)
		    JOIN users as us
		    ON (us.cc=p.cc_user)
        where ${cc} = d.cc_user and us.activity=true;`
    );
  }
  async findAllAppointmentsP(cc) {
    return await pool.query(
      `select v.id, v.hour, v.date, sp.speciality, us.name, s.status
        from visits as v
        JOIN visit_status as s
        ON (v.id_visit_status=s.id)
        JOIN doctors as d
        ON (d.cc_user=v.cc_doctors)
        JOIN patients as p
        ON (p.cc_user=v.cc_patients)
		    JOIN specialties as sp
		    ON (d.id_specialties=sp.id)
		    JOIN users as us
		    ON (us.cc=d.cc_user)
        where ${cc}=p.cc_user and us.activity=true;`
    );
  }
}
export default Appointment;
