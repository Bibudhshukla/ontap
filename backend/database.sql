-- =============================================================
-- On-Tap MySQL schema (reference)
-- Hibernate auto-creates these tables on startup (ddl-auto=update),
-- so running this file manually is OPTIONAL. It documents the schema
-- and can be used to provision the database ahead of time.
-- =============================================================

CREATE DATABASE IF NOT EXISTS on_tap_db
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE on_tap_db;

CREATE TABLE IF NOT EXISTS users (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20) NOT NULL,
  password VARCHAR(255) NOT NULL,
  user_type VARCHAR(20) NOT NULL,          -- 'customer' | 'provider'
  created_at DATETIME
);

CREATE TABLE IF NOT EXISTS services (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  icon VARCHAR(100),
  price_range VARCHAR(100),
  category VARCHAR(100),
  created_at DATETIME
);

CREATE TABLE IF NOT EXISTS bookings (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  customer_id BIGINT NOT NULL,
  provider_id BIGINT,
  service_id BIGINT NOT NULL,
  booking_date DATE NOT NULL,
  booking_time TIME,
  address TEXT,
  status VARCHAR(20) DEFAULT 'pending',    -- pending|confirmed|in-progress|completed|cancelled
  total_amount DECIMAL(10,2),
  created_at DATETIME
);

CREATE TABLE IF NOT EXISTS ratings (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  booking_id BIGINT NOT NULL,
  customer_id BIGINT NOT NULL,
  provider_id BIGINT NOT NULL,
  rating INT,
  review TEXT,
  created_at DATETIME
);

CREATE TABLE IF NOT EXISTS payments (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  booking_id BIGINT,
  user_id BIGINT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  payment_method VARCHAR(30),              -- card|upi|wallet|bank_transfer
  transaction_id VARCHAR(255) UNIQUE,
  status VARCHAR(20) DEFAULT 'pending',    -- pending|success|failed|refunded
  payment_date DATETIME
);

CREATE TABLE IF NOT EXISTS support_tickets (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  user_id BIGINT,
  subject VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(30) DEFAULT 'general',
  priority VARCHAR(20) DEFAULT 'medium',
  status VARCHAR(20) DEFAULT 'open',
  created_at DATETIME
);
