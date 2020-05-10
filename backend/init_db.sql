CREATE TABLE IF NOT EXISTS  employee (
    id serial PRIMARY KEY,
    password varchar(255) NOT NULL,
    firstName varchar(255),
    lastName varchar(255),
    email varchar(255) NOT NULL UNIQUE,
    department varchar(255),
    position varchar(255),
    role varchar(255)
);

CREATE TABLE IF NOT EXISTS  resource (
    id serial PRIMARY KEY,
    name varchar(255) NOT NULL UNIQUE,
    details TEXT
); 

CREATE TABLE IF NOT EXISTS  question(
    id serial PRIMARY KEY,
    question TEXT,
    answer TEXT,
    visible  varchar(255)
); 

CREATE TABLE IF NOT EXISTS  booking(
    id serial PRIMARY KEY,
    idResource integer REFERENCES resource(id),
    idEmployee integer REFERENCES employee(id),
    day DATE,
    startHour TIME,
    endHour TIME,
    details TEXT 
);