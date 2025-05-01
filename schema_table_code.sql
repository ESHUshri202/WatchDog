create database employee_monitor;

use employee_monitor;


CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100),
    password VARCHAR(255)
);

CREATE TABLE attendance (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT,
    check_in DATETIME,
    check_out DATETIME,
    FOREIGN KEY (employee_id) REFERENCES employees(id)
);


CREATE TABLE tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT,
    task_name VARCHAR(255),
    status VARCHAR(50),
    assigned_on DATE,
    completed_on DATE,
    FOREIGN KEY (employee_id) REFERENCES employees(id)
);


CREATE TABLE activity_log (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT,
    process_name VARCHAR(255),
    timestamp DATETIME
);

CREATE TABLE screenshots (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT,
    file_path VARCHAR(255),
    timestamp DATETIME
);


CREATE TABLE idle_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT,
    idle_start DATETIME,
    idle_end DATETIME,
    duration_seconds INT
);
use employee_monitor;

CREATE TABLE admin (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);


select * from admin;

DELETE FROM activity_log
WHERE employee_id IS NULL;