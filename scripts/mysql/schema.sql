CREATE DATABASE IF NOT EXISTS mysqltests;

USE mysqltests;

CREATE TABLE users (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  username VARCHAR(16) NOT NULL,
  email VARCHAR(60) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

CREATE TABLE test (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  info VARCHAR(80) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;

INSERT INTO test (info) VALUES ('myTestInfo');