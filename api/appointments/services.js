import { pool } from '../../utils/dbConnection.js';
//import VisitStatus from '../../services/VisitStatus.js';
//const objVisit = new VisitStatus();
class Appointment {
  constructor() {
    this.maxDailyAppointmentsDoc = 10;
  }

  async validate(hour, date, cc_patients, cc_doctors) {
    return await pool.query(
      `select count(id) from visits v
            where '${hour}' = v.hour and v.date ='${date}'
            and (v.cc_doctors=${cc_doctors} or v.cc_patients=${cc_patients});`
    );
  }

  async insertOne(hour, date, cc_patients, cc_doctors) {
    await pool.query(
      `INSERT INTO visits (hour, date, cc_patients, cc_doctors)
      VALUES ('${hour}','${date}',${cc_patients},${cc_doctors});`
    );
  }
  async findAppointmentsCountByMedic(cc, date) {
    return await pool.query(
      `select count(id) from visits where cc_doctors=${cc} and date='${date}';`
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
        where ${cc} = d.cc_user and us.activity=true and v.date = current_date;`
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
        where ${cc}=p.cc_user and us.activity=true and v.date >= current_date;`
    );
  }

  async findAllPreviouslyPatient(cc) {
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
        where ${cc}=p.cc_user and us.activity=true and v.date < current_date;`
    );
  }

  async findAllPreviouslyMedic(cc) {
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
        where ${cc} = d.cc_user and us.activity=true and v.date < current_date;`
    );
  }

  async findOne(id) {
    return await pool.query(
      `
        select v.id, v.hour, v.date, us.name, us.cc, v.description, s.status
        from visits as v
        JOIN visit_status as s
        ON (v.id_visit_status=s.id)
		    JOIN users as us
		    ON (us.cc=v.cc_patients)
        where ${id} = v.id;`
    );
  }

  async findAllAppointments() {
    return await pool.query(
      `select v.id, v.hour, v.date, use.name, sp.speciality, us.name as paciente, s.status
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
		    JOIN users as use
		    ON (use.cc=d.cc_user)`
    );
  }

  async findApointmentsRealized() {
    return await pool.query(
      `select v.id, v.hour, v.date, use.name, sp.speciality, us.name as paciente, s.status
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
		    JOIN users as use
		    ON (use.cc=d.cc_user)
        where s.status='Efectuada';`
    );
  }

  async findApointmentsRealizedWeekly() {
    return await pool.query(
      `select v.id, v.hour, v.date, use.name, sp.speciality, us.name as paciente, s.status
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
		    JOIN users as use
		    ON (use.cc=d.cc_user)
        where s.status='Efectuada' and v.date <= current_date and v.date >= current_date -7;`
    );
  }

  async findApointmentsRealizedBiweekly() {
    return await pool.query(
      `select v.id, v.hour, v.date, use.name, sp.speciality, us.name as paciente, s.status
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
		    JOIN users as use
		    ON (use.cc=d.cc_user)
        where s.status='Efectuada' and v.date <= current_date and v.date >= current_date -15;`
    );
  }

  async findApointmentsRealizedMonthly() {
    return await pool.query(
      `select v.id, v.hour, v.date, use.name, sp.speciality, us.name as paciente, s.status
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
		    JOIN users as use
		    ON (use.cc=d.cc_user)
        where s.status='Efectuada' and v.date <= current_date and v.date >= current_date -30;`
    );
  }

  async findApointmentsRealizedBiannual() {
    return await pool.query(
      `select v.id, v.hour, v.date, use.name, sp.speciality, us.name as paciente, s.status
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
		    JOIN users as use
		    ON (use.cc=d.cc_user)
        where s.status='Efectuada' and v.date <= current_date and v.date >= current_date -180;`
    );
  }

  async findApointmentsCanceled() {
    return await pool.query(
      `select v.id, v.hour, v.date, use.name, sp.speciality, us.name as paciente, s.status
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
		    JOIN users as use
		    ON (use.cc=d.cc_user)
        where s.status='Cancelada';`
    );
  }

  async findApointmentsCanceledWeekly() {
    return await pool.query(
      `select v.id, v.hour, v.date, use.name, sp.speciality, us.name as paciente, s.status
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
		    JOIN users as use
		    ON (use.cc=d.cc_user)
        where s.status='Cancelada' and v.date <= current_date and v.date >= current_date -7;`
    );
  }

  async findApointmentsCanceledBiweekly() {
    return await pool.query(
      `select v.id, v.hour, v.date, use.name, sp.speciality, us.name as paciente, s.status
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
		    JOIN users as use
		    ON (use.cc=d.cc_user)
        where s.status='Cancelada' and v.date <= current_date and v.date >= current_date -15;`
    );
  }

  async findApointmentsCanceledMonthly() {
    return await pool.query(
      `select v.id, v.hour, v.date, use.name, sp.speciality, us.name as paciente, s.status
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
		    JOIN users as use
		    ON (use.cc=d.cc_user)
        where s.status='Cancelada' and v.date <= current_date and v.date >= current_date -30;`
    );
  }

  async findApointmentsCanceledBiannual() {
    return await pool.query(
      `select v.id, v.hour, v.date, use.name, sp.speciality, us.name as paciente, s.status
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
		    JOIN users as use
		    ON (use.cc=d.cc_user)
        where s.status='Cancelada' and v.date <= current_date and v.date >= current_date -180;`
    );
  }
}
export default Appointment;
