CREATE TABLE IF NOT EXISTS  employee (
    id serial PRIMARY KEY,
    password varchar(255) NOT NULL,
    firstName varchar(255),
    lastName varchar(255),
    email varchar(255) NOT NULL UNIQUE,
    username varchar(255) NOT NULL UNIQUE,
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
    emailemployee TEXT,
    question TEXT,
    answer TEXT,
    visible  varchar(255),
    notified BOOLEAN
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

INSERT INTO employee(id, password, firstName, lastName, email, username, department, position, role)
VALUES (1, '$2a$05$Ad7uHnUx5D4TI6thE5bXf.dLCxw/SqeSK7T06bCGLDg9vjhh28ltK', 'Colibri', 'Administrator', 'notifier.colibri@outlook.com', 'colibriadmin', 'IT', 'admin', 'admin'); 

INSERT INTO employee(id, password, firstName, lastName, email, username, department, position, role)
VALUES (2, '$2a$05$Ad7uHnUx5D4TI6thE5bXf.dLCxw/SqeSK7T06bCGLDg9vjhh28ltK', 'Colibri', 'Support', 'support.colibri@colibrimail.com', 'colibrisupport', 'IT', 'support', 'suport'); 

INSERT INTO employee(id, password, firstName, lastName, email, username, department, position, role)
VALUES (3, '$2a$05$Ad7uHnUx5D4TI6thE5bXf.dLCxw/SqeSK7T06bCGLDg9vjhh28ltK', 'Colibri', 'User', 'user01.colibri@colibrimail.com', 'user01', 'Finance', 'Accountant', 'user'); 
