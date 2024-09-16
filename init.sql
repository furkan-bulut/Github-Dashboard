CREATE DATABASE IF NOT EXISTS github_data;

USE github_data;

CREATE TABLE IF NOT EXISTS pull_requests (
  id INT NOT NULL PRIMARY KEY,
  url VARCHAR(255),
  title VARCHAR(255) NOT NULL,
  state VARCHAR(50) NOT NULL,
  created_at VARCHAR(255),
  updated_at VARCHAR(255),
  author VARCHAR(255),
  label TEXT,
  milestone VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS comments (
  id INT NOT NULL UNIQUE,
  url VARCHAR(255),
  body TEXT NOT NULL,
  created_at VARCHAR(255),
  updated_at VARCHAR(255),
  author VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS commits (
  sha VARCHAR(255) NOT NULL UNIQUE,
  url VARCHAR(255),
  message TEXT NOT NULL,
  created_at VARCHAR(255),
  updated_at VARCHAR(255),
  author VARCHAR(255)
);
