CREATE DATABASE IF NOT EXISTS student_queuing_system CHARACTER
SET
  utf8mb4 COLLATE utf8mb4_unicode_ci;

USE student_queuing_system;

CREATE TABLE IF NOT EXISTS users (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(120) NOT NULL,
  email VARCHAR(190) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM ('admin', 'staff', 'student') NOT NULL DEFAULT 'student',
  student_number VARCHAR(40) NULL UNIQUE,
  is_active TINYINT (1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS services (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  description VARCHAR(255),
  is_active TINYINT (1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS queue_tickets (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  ticket_number VARCHAR(20) NOT NULL,
  student_id INT UNSIGNED NOT NULL,
  service_id INT UNSIGNED NOT NULL,
  status ENUM (
    'waiting',
    'called',
    'serving',
    'completed',
    'cancelled',
    'no_show'
  ) NOT NULL DEFAULT 'waiting',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  called_at DATETIME NULL,
  called_by INT UNSIGNED NULL,
  FOREIGN KEY (student_id) REFERENCES users (id),
  FOREIGN KEY (service_id) REFERENCES services (id),
  FOREIGN KEY (called_by) REFERENCES users (id),
  INDEX idx_service_created (service_id, created_at, status),
  INDEX idx_student_created (student_id, created_at)
);
