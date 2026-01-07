@echo off
REM PostgreSQL Database Creation Script for Windows
REM This script creates the database and schema for the e-commerce application

echo ========================================
echo PostgreSQL Database Setup
echo ========================================
echo.

REM Check if PostgreSQL is installed
where psql >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: PostgreSQL psql command not found in PATH
    echo Please ensure PostgreSQL is installed and psql is in your PATH
    pause
    exit /b 1
)

echo Step 1: Creating database...
psql -U postgres -f create_database_only.sql
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to create database
    pause
    exit /b 1
)

echo.
echo Step 2: Creating tables and inserting sample data...
psql -U postgres -d ecommerce_db -f create_postgres_db.sql
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: Failed to create schema
    pause
    exit /b 1
)

echo.
echo ========================================
echo Database setup completed successfully!
echo ========================================
echo.
echo Database: ecommerce_db
echo Default user: postgres
echo.
echo You can now update your application.properties with:
echo   spring.datasource.url=jdbc:postgresql://localhost:5432/ecommerce_db
echo   spring.datasource.username=postgres
echo   spring.datasource.password=your_password
echo   spring.datasource.driver-class-name=org.postgresql.Driver
echo   spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
echo.
pause

