-- PostgreSQL Database Creation Script (Database Only)
-- Run this script as a PostgreSQL superuser (usually 'postgres')
-- 
-- Usage:
--   psql -U postgres -f create_database_only.sql
--   OR
--   psql -U postgres
--   \i create_database_only.sql

-- Drop database if it exists (optional - uncomment if you want to recreate)
-- DROP DATABASE IF EXISTS ecommerce_db;

-- Create Database
-- Note: This will fail if the database already exists
-- If you need to recreate, uncomment the DROP statement above first
CREATE DATABASE ecommerce_db
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.UTF-8'
    LC_CTYPE = 'en_US.UTF-8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

-- Add comment
COMMENT ON DATABASE ecommerce_db IS 'E-Commerce Application Database';

-- Note: After creating the database, connect to it and run create_postgres_db.sql
-- psql -U postgres -d ecommerce_db -f create_postgres_db.sql

