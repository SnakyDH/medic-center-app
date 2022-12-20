-- create database  medic_center
-- use medic_center
CREATE TABLE user_role(
        id serial not null,
        role varchar(45) not null,
        PRIMARY KEY(id)
);
insert into user_role (role)
        values
        ('administrator'),
        ('medic'),
        ('patient');

CREATE TABLE users(
        cc int not null,
        name varchar(45) not null,
        password varchar(70) not null,
        phone varchar(10) not null,
        email varchar(45) not null,
	      id_user_role int not null,
        activity boolean DEFAULT true,
        FOREIGN KEY (id_user_role) REFERENCES user_role(id)
             MATCH FULL ON UPDATE CASCADE,
        PRIMARY KEY(cc)
);


CREATE TABLE info_password(
        cc_user int not null,
        question varchar(70) not null,
        answer varchar(70) not null,
        FOREIGN KEY (cc_user) REFERENCES users(cc),
        PRIMARY KEY(cc_user)
);


CREATE TABLE patients(
        cc_user int not null,
        age int2 not null,
        weight decimal not null,
        height decimal not null,
        birth date not null,
        FOREIGN KEY (cc_user) REFERENCES users(cc)
             MATCH FULL ON UPDATE CASCADE,
        PRIMARY KEY(cc_user)
);



CREATE TABLE clinic_history(
        id serial not null,
        cc_patients int not null,
        FOREIGN KEY (cc_patients) REFERENCES patients(cc_user)
             MATCH FULL ON UPDATE CASCADE,
        PRIMARY KEY(id, cc_patients)
);


CREATE TABLE specialties(
        id serial not null,
        speciality varchar(50) not null,
        PRIMARY KEY(id)
);

insert into specialties (speciality) values ('pediatria'),('medicina interna'),('urologia'),('neurología'),('hematologia'),('hepatologia'),('ginecologia'),('neumologia'),('cardiologia'),('psiquiatria');

CREATE TABLE doctors(
        cc_user int not null,
        id_specialties int2 not null,
        FOREIGN KEY (cc_user) REFERENCES users(cc)
             MATCH FULL ON UPDATE CASCADE,
        FOREIGN KEY (id_specialties) REFERENCES specialties(id)
             MATCH FULL ON UPDATE CASCADE,
        PRIMARY KEY(cc_user)
);


CREATE TABLE visit_status(
		id serial,
        status varchar(45) not null,
        PRIMARY KEY(id)
);

insert into visit_status (status) values ('Solicitada'),('Efectuada'),('Cancelada');


CREATE TABLE visits(
        id serial not null,
        hour time not null,
        date date not null,
        description varchar(1500) default null,
        cc_patients int not null,
        cc_doctors int not null,
		id_visit_status int default 1,
	    FOREIGN KEY (id_visit_status) REFERENCES visit_status(id)
             MATCH FULL ON UPDATE CASCADE,
        FOREIGN KEY (cc_patients) REFERENCES patients(cc_user)
             MATCH FULL ON UPDATE CASCADE,
        FOREIGN KEY (cc_doctors) REFERENCES doctors(cc_user)
             MATCH FULL ON UPDATE CASCADE,
        PRIMARY KEY(id)
);


ALTER TABLE info_password
DROP CONSTRAINT info_password_cc_user_fkey,
ADD CONSTRAINT info_password_cc_user_fkey
	FOREIGN KEY (cc_user)
	REFERENCES users(cc)
	MATCH FULL ON DELETE CASCADE;

ALTER TABLE users
DROP CONSTRAINT users_id_user_role_fkey,
ADD CONSTRAINT users_id_user_role_fkey
	FOREIGN KEY (id_user_role)
	REFERENCES user_role(id)
        MATCH FULL ON DELETE CASCADE;

ALTER TABLE doctors
DROP CONSTRAINT doctors_cc_user_fkey,
DROP CONSTRAINT doctors_id_specialties_fkey,
ADD CONSTRAINT doctors_cc_user_fkey
	FOREIGN KEY (cc_user) REFERENCES users(cc)
        MATCH FULL ON DELETE CASCADE,
ADD CONSTRAINT doctors_id_specialties_fkey
        FOREIGN KEY (id_specialties) REFERENCES specialties(id)
        MATCH FULL ON DELETE CASCADE;

ALTER TABLE visits
DROP CONSTRAINT visits_cc_doctors_fkey,
DROP CONSTRAINT visits_cc_patients_fkey,
DROP CONSTRAINT visits_id_visit_status_fkey,
ADD CONSTRAINT visits_cc_patients_fkey
        FOREIGN KEY (cc_patients) REFERENCES patients(cc_user)
             MATCH FULL ON DELETE CASCADE,
ADD CONSTRAINT visits_cc_doctors_fkey
        FOREIGN KEY (cc_doctors) REFERENCES doctors(cc_user)
             MATCH FULL ON DELETE CASCADE,
ADD CONSTRAINT visits_id_visit_status_fkey
        FOREIGN KEY (id_visit_status) REFERENCES visit_status(id)
             MATCH FULL ON DELETE CASCADE;
