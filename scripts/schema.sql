-- CREATE USER 'psycarlo'@'%' IDENTIFIED WITH mysql_native_password BY 'bitcoinislove';
-- GRANT ALL ON *.* TO 'psycarlo'@'%' WITH GRANT OPTION;

CREATE DATABASE [IF NOT EXISTS] mysqltests;

USE mysqltests;

CREATE TABLE users (
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  username VARCHAR(16) NOT NULL,
  email VARCHAR(60) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;