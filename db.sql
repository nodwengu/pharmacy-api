
create database pharmacy_db

create extension if not exists "uuid-ossp";

create table users (
    id serial primary key not null,
    username text not null,
    email text not null unique,
    password text not null
);

create table facility (
    id serial primary key not null,
    name text,
    address text,
    phone text
);

create table unit (
    id serial primary key not null,
    unit_name text,
    facility_id int,
    floor_no int,
    FOREIGN KEY(facility_id) references facility(id)
);

-- create table room (
--     id serial primary key not null,
--     room_no int,
--     unit-id int
--     FOREIGN KEY(unit_id) references unit(id)
-- );

create table patient (
    id serial primary key not null,
    unit_id int,
    first_name text,
    last_name text,
    email text,
    age int,
    FOREIGN KEY(unit_id) references unit(id)
);

create table drug (
    id serial primary key not null,
    name text,
    description text,
    price number,
    dose text,
    instock int,
);

create table prescription (
    id serial primary key not null,
    patient_id int,
    drug_id int,
    FOREIGN KEY(patient_id) references patient(id),
    FOREIGN KEY(drug_id) references drug(id)
);

create table orders (
    id serial primary key not null,
    prescript_id int,
    phar_id int,
    price decimal,
    order_date text,
    order_status text default 'In-progress',
    FOREIGN KEY(prescript_id) references prescription(id),
    FOREIGN KEY(phar_id) references pharmacist(id)
);

create table pharmacist (
    id serial primary key not null,
    first_name text,
    last_name text,
    email text,
    phone text
);

-- Adding user
INSERT INTO users(username, email, password) 
VALUES('bob', 'bob@email.com', 'bob');

-- Adding pharmacist
INSERT INTO pharmacist(first_name, last_name, email, phone) 
VALUES('Anorld', 'Goeson', 'anold@gmail.com', '011 123');

INSERT INTO pharmacist(first_name, last_name, email, phone) 
VALUES('Vincent', 'Khumalo', 'vinc@gmail.com', '011 123');

INSERT INTO pharmacist(first_name, last_name, email, phone) 
VALUES('Thando', 'Nodwengu', 'thando@gmail.com', '011 123');

-- Adding orders
INSERT INTO orders(prescript_id, order_date, price ) 
VALUES(1, '10-Feb-22', 200);

-- Adding prescription
INSERT INTO prescription(patient_id, drug_id, dosage) 
VALUES(8, 26, 'sdssdsdds');

-- Adding drug
INSERT INTO drug(name, instock) 
VALUES('drug-6', 10);

INSERT INTO drug(name, instock) 
VALUES('drug-7', 10);

INSERT INTO drug(name, instock) 
VALUES('drug-3', 10);

INSERT INTO drug(name, instock) 
VALUES('drug-4', 10);

INSERT INTO drug(name, instock) 
VALUES('drug-5', 10);

-- Adding pantients
INSERT INTO patient(first_name,last_name, age, unit_id) 
VALUES('Bob', 'Marly', 35, 1);

INSERT INTO patient(first_name,last_name, age, unit_id) 
VALUES('Jim', 'Skew', 30, 1);

INSERT INTO patient(first_name,last_name, age, unit_id) 
VALUES('John', 'Doe', 45, 4);

INSERT INTO patient(first_name,last_name, age, unit_id) 
VALUES('Bill', 'Gates', 45, 5);

-- Adding facilities
INSERT INTO facility(name, address, phone) 
VALUES('Facility-A', 'Samora', '011 123');

INSERT INTO facility(name, address, phone) 
VALUES('Facility-B', 'Langa', '011 321');

INSERT INTO facility(name, address, phone) 
VALUES('Facility-C', 'Nyanga', '011 213');

-- Adding units
INSERT INTO unit(unit_name, facility_id, floor_no) 
VALUES('Unit-A', 1, 1);

INSERT INTO unit(unit_name, facility_id, floor_no) 
VALUES('Unit-B', 1, 1);

INSERT INTO unit(unit_name, facility_id, floor_no) 
VALUES('Unit-C', 1, 2);

INSERT INTO unit(unit_name, facility_id, floor_no) 
VALUES('Unit-A', 2, 3);

INSERT INTO unit(unit_name, facility_id, floor_no) 
VALUES('Unit-B', 2, 3);

INSERT INTO unit(unit_name, facility_id, floor_no) 
VALUES('Unit-C', 2, 3);


SELECT p.first_name, p.last_name, d.name, pr.dosage
FROM patient As p
INNER JOIN prescription As pr
ON p.id = pr.patient_id
INNER JOIN drug As d 
ON d.id = pr.drug_id;


ALTER TABLE drug 
ADD COLUMN description decimal;

ALTER TABLE drug 
ADD COLUMN dose decimal;

ALTER TABLE drug 
ADD COLUMN price decimal;

ALTER TABLE orders 
DROP COLUMN price;

