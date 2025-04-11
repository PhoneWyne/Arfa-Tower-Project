-- Create the database only if it doesn't exist
CREATE DATABASE IF NOT EXISTS jersey_store;

-- Use the database
USE jersey_store;

-- Drop existing tables to reset schema & data (only for development)
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS products;

-- Recreate tables
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL
);

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    quantity INT NOT NULL,
    image_url VARCHAR(255) NOT NULL
);

-- Insert sample user (password is plain text for now — dev mode only!)
INSERT INTO users (username, password) VALUES 
('admin', 'admin123'),
('testuser', 'password');

-- Insert sample products
INSERT INTO products (name, price, quantity, image_url) VALUES 
('Ajax Home Kit', 79.99, 'src/images/product/jersey1.jpeg'),
('Albania Away Kit', 69.99, 'src/images/product/jersey2.jpeg');
