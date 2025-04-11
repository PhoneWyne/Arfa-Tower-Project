
CREATE DATABASE IF NOT EXISTS jersey_store;


USE jersey_store;


DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS carts;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL
);

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    quantity INT NOT NULL,
    image_url VARCHAR(255) NOT NULL
);

CREATE TABLE carts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  items JSON NOT NULL,  -- stores cart items as JSON
  total DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);



INSERT INTO users (username, email, password) VALUES 
('admin', 'ahmedwyne12@gmail.com','admin123'),
('testuser', 'ahmedsalah@gmail.com','password');


INSERT INTO products (name, price, quantity, image_url) VALUES 
('Albania Away Kit', 29.99, 5, 'src/images/product/jersey2.jpeg'),
('Arsenal Home Kit', 49.99, 4, 'src/images/product/arsenal.jpeg'),
('Bayern Home Kit', 49.99, 6, 'src/images/product/bayern.jpeg'),
('Dortmund Home Kit', 49.99, 8, 'src/images/product/dortmund.jpeg'),
('Liverpool Home Kit', 59.99, 10, 'src/images/product/liverpool.jpeg'),
('Man City Home Kit', 59.99, 20, 'src/images/product/man-city.jpeg'),
('Real Madrid Home Kit', 79.99, 50, 'src/images/product/real-madrid-home.jpeg'),
('Spurs Home Kit', 39.99, 10, 'src/images/product/spurs.jpeg'),
('West Ham Home Kit', 19.99, 10, 'src/images/product/west-ham.jpeg');


