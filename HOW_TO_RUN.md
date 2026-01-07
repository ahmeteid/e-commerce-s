# How to Run the E-Commerce Project

## Quick Start Guide

### Prerequisites Check
- ✅ Node.js installed (check with: `node --version`)
- ✅ Java JDK 17+ installed (check with: `java -version`)
- ✅ Maven installed (check with: `mvn --version`)

---

## Option 1: Run with H2 Database (Default - Easiest)

The project is currently configured to use H2 in-memory database. No database setup needed!

### Step 1: Install Frontend Dependencies
```bash
npm install
```

### Step 2: Start the Backend (Spring Boot)
Open a terminal and run:

**Option A - If Maven is in PATH:**
```bash
cd backend
mvn spring-boot:run
```

**Option B - If Maven is NOT in PATH (Windows):**
```powershell
cd backend
& "C:\Program Files\NetBeans-18\netbeans\java\maven\bin\mvn.cmd" spring-boot:run
```

**Option C - Add Maven to PATH for this session:**
```powershell
$env:Path += ";C:\Program Files\NetBeans-18\netbeans\java\maven\bin"
cd backend
mvn spring-boot:run
```

Wait for the message: `Started EcommerceApplication` (takes about 30-60 seconds)

### Step 3: Start the Frontend (React)
Open a **new terminal** (keep backend running) and run:
```bash
npm run dev
```

### Step 4: Access the Application
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8080/api
- **H2 Console**: http://localhost:8080/h2-console
  - JDBC URL: `jdbc:h2:mem:ecommercedb`
  - Username: `sa`
  - Password: (leave empty)

---

## Option 2: Run with PostgreSQL Database

### Step 1: Create PostgreSQL Database
Run these commands in CMD/PowerShell:

```cmd
"C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres -c "CREATE DATABASE ecommerce_db;"
```

Then create tables and insert data:
```cmd
"C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres -d ecommerce_db -f "F:\React\omar aslan\e-commerce-s\database\create_postgres_db.sql"
```

### Step 2: Update Backend Configuration
Edit `backend/src/main/resources/application.properties`:

**Comment out H2 configuration:**
```properties
# spring.datasource.url=jdbc:h2:mem:ecommercedb
# spring.datasource.driverClassName=org.h2.Driver
# spring.datasource.username=sa
# spring.datasource.password=
# spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
```

**Add PostgreSQL configuration:**
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/ecommerce_db
spring.datasource.username=postgres
spring.datasource.password=your_postgres_password
spring.datasource.driver-class-name=org.postgresql.Driver
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
```

**Add PostgreSQL dependency to `backend/pom.xml`** (if not already there):
```xml
<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <scope>runtime</scope>
</dependency>
```

### Step 3: Start Backend
```bash
cd backend
mvn spring-boot:run
```

### Step 4: Start Frontend
```bash
npm run dev
```

---

## Running Both Services

You need **TWO terminal windows**:

### Terminal 1 - Backend:
```powershell
cd backend
& "C:\Program Files\NetBeans-18\netbeans\java\maven\bin\mvn.cmd" spring-boot:run
```
*(Or use `mvn spring-boot:run` if Maven is in your PATH)*

### Terminal 2 - Frontend:
```bash
npm run dev
```

---

## Troubleshooting

### Backend won't start?
- **Maven not found?** Use full path: `& "C:\Program Files\NetBeans-18\netbeans\java\maven\bin\mvn.cmd" spring-boot:run`
- Check if port 8080 is already in use
- Make sure Java 17+ is installed: `java -version`
- Check Maven dependencies: `cd backend && & "C:\Program Files\NetBeans-18\netbeans\java\maven\bin\mvn.cmd" clean install`

### Frontend won't start?
- Make sure Node.js is installed
- Delete `node_modules` and run `npm install` again
- Check if port 5173 is available

### Database connection errors?
- For PostgreSQL: Make sure PostgreSQL service is running
- Check username/password in `application.properties`
- Verify database exists: `psql -U postgres -l`

### API not working?
- Make sure backend is running on port 8080
- Check CORS configuration
- Verify API endpoint: http://localhost:8080/api/products

---

## Verify Everything is Working

1. **Backend Health Check:**
   - Open: http://localhost:8080/api/products
   - Should return JSON with products

2. **Frontend:**
   - Open: http://localhost:5173
   - Should see the e-commerce homepage

3. **Database:**
   - H2: http://localhost:8080/h2-console
   - PostgreSQL: `psql -U postgres -d ecommerce_db -c "SELECT COUNT(*) FROM products;"`

---

## Development Tips

- **Hot Reload**: Both frontend and backend support hot reload
- **Backend Logs**: Check terminal running `mvn spring-boot:run` for errors
- **Frontend Logs**: Check browser console (F12) for errors
- **API Testing**: Use browser or Postman to test http://localhost:8080/api/products

