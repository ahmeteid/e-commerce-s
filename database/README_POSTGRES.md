# PostgreSQL Database Setup

This directory contains scripts to set up a PostgreSQL database for the e-commerce application.

## Prerequisites

- PostgreSQL installed and running
- PostgreSQL `psql` command-line tool accessible in your PATH
- PostgreSQL superuser access (usually `postgres` user)

## Quick Setup

### Option 1: Automated Setup (Windows)

Run the batch script:
```bash
create_postgres_database.bat
```

This will:
1. Create the `ecommerce_db` database
2. Create all tables and insert sample data

### Option 2: Manual Setup

#### Step 1: Create the Database

```bash
psql -U postgres -f create_database_only.sql
```

Or manually:
```sql
psql -U postgres
CREATE DATABASE ecommerce_db;
\q
```

#### Step 2: Create Tables and Insert Data

```bash
psql -U postgres -d ecommerce_db -f create_postgres_db.sql
```

## Manual SQL Execution

If you prefer to run commands manually:

1. **Connect to PostgreSQL:**
   ```bash
   psql -U postgres
   ```

2. **Create the database:**
   ```sql
   CREATE DATABASE ecommerce_db;
   ```

3. **Connect to the new database:**
   ```sql
   \c ecommerce_db
   ```

4. **Run the schema script:**
   ```sql
   \i create_postgres_db.sql
   ```
   Or copy and paste the contents of `create_postgres_db.sql` into the psql prompt.

## Spring Boot Configuration

After creating the database, update your `backend/src/main/resources/application.properties`:

```properties
# PostgreSQL Configuration
spring.datasource.url=jdbc:postgresql://localhost:5432/ecommerce_db
spring.datasource.username=postgres
spring.datasource.password=your_password
spring.datasource.driver-class-name=org.postgresql.Driver
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
```

## Add PostgreSQL Dependency

Make sure your `backend/pom.xml` includes the PostgreSQL driver:

```xml
<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <scope>runtime</scope>
</dependency>
```

## Verify Installation

After setup, verify the database:

```bash
psql -U postgres -d ecommerce_db
```

Then run:
```sql
SELECT COUNT(*) FROM categories;
SELECT COUNT(*) FROM products;
```

You should see 5 categories and 18 products.

## Troubleshooting

### Connection Issues
- Ensure PostgreSQL service is running
- Check if PostgreSQL is listening on port 5432 (default)
- Verify username and password

### Permission Issues
- Make sure you're using a user with database creation privileges
- On Windows, you may need to run as Administrator

### Database Already Exists
- If the database already exists, you can drop it first:
  ```sql
  DROP DATABASE ecommerce_db;
  ```
- Or modify the script to use `CREATE DATABASE IF NOT EXISTS` (PostgreSQL 9.1+)

## Files

- `create_database_only.sql` - Creates only the database
- `create_postgres_db.sql` - Creates tables, indexes, and inserts sample data
- `create_postgres_database.bat` - Windows batch script for automated setup

