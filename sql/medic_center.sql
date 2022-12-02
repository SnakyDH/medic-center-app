-- create database  medic_center
-- use medic_center
CREATE TABLE user_role(
        id serial not null, 
        role varchar(45) not null,
        PRIMARY KEY(id)
);
insert into user_role (role) 
        values ('administrator'),
        ('medic'),
        ('patient');

CREATE TABLE users(
        cc int not null,
        name varchar(45) not null,
        password varchar(70) not null,
        phone varchar(10) not null,
        email varchar(45) not null,
	id_user_role int not null,
        FOREIGN KEY (id_user_role) REFERENCES user_role(id)
             MATCH FULL ON UPDATE CASCADE,
        PRIMARY KEY(cc)
);


CREATE TABLE info_password(
        cc_user int not null, 
        answer varchar(70) not null,
        question varchar(70) not null,
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
        id int2 not null,
        cc_patients int not null,
        FOREIGN KEY (cc_patients) REFERENCES patients(cc_user)
             MATCH FULL ON UPDATE CASCADE,
        PRIMARY KEY(id, cc_patients)
);


CREATE TABLE specialties(
        id int2 not null,
        name varchar(50) not null,
        PRIMARY KEY(id)
);



CREATE TABLE doctors(
        cc_user int not null,
        id_specialties int2 not null,
        FOREIGN KEY (cc_user) REFERENCES users(cc)
             MATCH FULL ON UPDATE CASCADE,
        FOREIGN KEY (id_specialties) REFERENCES specialties(id)
             MATCH FULL ON UPDATE CASCADE,
        PRIMARY KEY(cc_user)
);


CREATE TABLE visits(
        id int2 not null,
        hour time not null,
        date date not null,
        description varchar(45) not null,
        cc_patients int not null,
        cc_doctors int not null,
        FOREIGN KEY (cc_patients) REFERENCES patients(cc_user)
             MATCH FULL ON UPDATE CASCADE,
        FOREIGN KEY (cc_doctors) REFERENCES doctors(cc_user)
             MATCH FULL ON UPDATE CASCADE,
        PRIMARY KEY(id)
);


CREATE TABLE visit_status(
        status varchar(45) not null,
        id_visits int2 not null,
        FOREIGN KEY (id_visits) REFERENCES visits(id)
             MATCH FULL ON UPDATE CASCADE,
        PRIMARY KEY(id_visits)
);

