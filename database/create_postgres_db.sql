-- PostgreSQL Database Creation Script for E-Commerce Application
-- Run this script as a PostgreSQL superuser (usually 'postgres')

-- Create Database
-- Note: You cannot create a database inside a transaction block
-- Run this command separately if needed:
-- CREATE DATABASE ecommerce_db;

-- Connect to the database (uncomment if running manually)
-- \c ecommerce_db;

-- Drop tables if they exist (for clean setup)
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS categories CASCADE;

-- Create Categories Table
CREATE TABLE categories (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(200),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Products Table
CREATE TABLE products (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(500),
    price DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL DEFAULT 0,
    image_url VARCHAR(255),
    category_id BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- Create indexes for better performance
CREATE INDEX idx_products_category_id ON products(category_id);
CREATE INDEX idx_products_name ON products(name);

-- Insert Sample Categories
INSERT INTO categories (name, description) VALUES
('Electronics', 'Electronic devices and gadgets'),
('Clothing', 'Apparel and fashion items'),
('Books', 'Books and reading materials'),
('Home & Garden', 'Home improvement and garden supplies'),
('Sports', 'Sports equipment and accessories');

-- Insert Sample Products
INSERT INTO products (name, description, price, stock, image_url, category_id) VALUES
('Laptop Pro 15"', 'High-performance laptop with 16GB RAM and 512GB SSD', 1299.99, 25, 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=600&fit=crop&q=80', 1),
('Wireless Mouse', 'Ergonomic wireless mouse with long battery life', 29.99, 150, 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=800&h=600&fit=crop&q=80', 1),
('Smartphone X', 'Latest smartphone with 128GB storage and triple camera', 899.99, 40, 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=600&fit=crop&q=80', 1),
('Wireless Headphones', 'Noise-cancelling wireless headphones', 199.99, 60, 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop&q=80', 1),
('Tablet Air', '10-inch tablet with stylus support', 499.99, 30, 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&h=600&fit=crop&q=80', 1),
('Cotton T-Shirt', 'Comfortable 100% cotton t-shirt in various colors', 19.99, 200, 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=600&fit=crop&q=80', 2),
('Denim Jeans', 'Classic fit denim jeans', 59.99, 80, 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&h=600&fit=crop&q=80', 2),
('Winter Jacket', 'Warm winter jacket with hood', 129.99, 45, 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=600&fit=crop&q=80', 2),
('Running Shoes', 'Lightweight running shoes for daily use', 79.99, 100, 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=600&fit=crop&q=80', 2),
('The Great Novel', 'Bestselling fiction novel', 14.99, 300, 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&h=600&fit=crop&q=80', 3),
('Programming Guide', 'Complete guide to modern programming', 39.99, 50, 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&q=80', 3),
('Coffee Table Book', 'Beautiful photography coffee table book', 49.99, 25, 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&h=600&fit=crop&q=80', 3),
('Garden Tools Set', 'Complete set of essential garden tools', 89.99, 35, 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop&q=80', 4),
('Indoor Plant Pot', 'Decorative ceramic plant pot set', 24.99, 120, 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&h=600&fit=crop&q=80', 4),
('LED String Lights', 'Waterproof LED string lights for outdoor use', 34.99, 75, 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&h=600&fit=crop&q=80', 4),
('Basketball', 'Official size basketball', 29.99, 90, 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&h=600&fit=crop&q=80', 5),
('Yoga Mat', 'Non-slip yoga mat with carrying strap', 39.99, 65, 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&h=600&fit=crop&q=80', 5),
('Tennis Racket', 'Professional tennis racket', 129.99, 30, 'https://images.unsplash.com/photo-1622163642991-c2b9c43ab9b3?w=800&h=600&fit=crop&q=80', 5);

-- Verify Data
SELECT COUNT(*) as total_categories FROM categories;
SELECT COUNT(*) as total_products FROM products;
SELECT c.name as category, COUNT(p.id) as product_count 
FROM categories c 
LEFT JOIN products p ON c.id = p.category_id 
GROUP BY c.id, c.name 
ORDER BY product_count DESC;

