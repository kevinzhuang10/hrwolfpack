
DROP DATABASE IF EXISTS wolfpack;
CREATE DATABASE wolfpack;

USE wolfpack;

DROP TABLE IF EXISTS participantListings;
DROP TABLE IF EXISTS listings;
DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(20) NOT NULL,
  password VARCHAR(25) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE (username)
);


CREATE TABLE listings (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(50) NOT NULL,
  initializer INT NOT NULL,
  price DECIMAL(5,2) NOT NULL,
  complete INT NOT NULL DEFAULT 0,
  location VARCHAR(100) NOT NULL ,
  num_of_participants INT NOT NULL,
  PRIMARY KEY (id),
  UNIQUE (initializer),
  FOREIGN KEY (initializer) REFERENCES users (id)
);


CREATE TABLE participantListings (
  id INT NOT NULL AUTO_INCREMENT,
  user_id INT NOT NULL,
  listing_id INT NOT NULL,
  received INT NOT NULL DEFAULT 0,
  PRIMARY KEY (id),
  UNIQUE(user_id, listing_id),
  FOREIGN KEY (user_id)
    REFERENCES users (id),
  FOREIGN KEY (listing_id)
    REFERENCES listings (id)
);