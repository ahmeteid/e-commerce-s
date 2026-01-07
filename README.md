# E-Commerce Application

A modern full-stack e-commerce web application built with React, Material UI, and Spring Boot. Features a responsive frontend with shopping cart functionality and a RESTful backend API.

![Tech Stack](https://img.shields.io/badge/React-19-blue) ![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2-green) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-18-blue)

## 📋 Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Database Setup](#database-setup)
- [API Endpoints](#api-endpoints)
- [Technologies Used](#technologies-used)
- [Troubleshooting](#troubleshooting)
- [Future Enhancements](#future-enhancements)

## ✨ Features

### Frontend (React + Material UI)
- 🏠 **Home Page** - Display featured products with modern UI
- 📦 **Product Catalog** - Browse products with search and filter functionality
- 🔍 **Product Details** - Detailed product information pages
- 🛒 **Shopping Cart** - Add, remove, and manage cart items
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- 🎨 **Material UI** - Beautiful, modern interface components
- 💾 **Local Storage** - Cart data persists across sessions

### Backend (Spring Boot)
- 🔌 **RESTful API** - Clean, well-structured API endpoints
- 📊 **Product Management** - CRUD operations for products
- 📁 **Category Management** - Organize products by categories
- 🗄️ **Database Integration** - Supports H2, MySQL, and PostgreSQL
- 🔒 **CORS Configuration** - Secure cross-origin requests
- ✅ **Input Validation** - Data validation and error handling
- 🔄 **Auto Data Initialization** - Sample data loaded on startup

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **Java JDK 17+** - [Download](https://adoptium.net/)
- **Maven 3.6+** - [Download](https://maven.apache.org/) (or use NetBeans bundled Maven)
- **PostgreSQL** (optional) - [Download](https://www.postgresql.org/download/)
- **MySQL** (optional) - [Download](https://dev.mysql.com/downloads/)

### Verify Installation

```bash
# Check Node.js
node --version

# Check Java
java -version

# Check Maven (if in PATH)
mvn --version
```

## 📁 Project Structure

```
e-commerce-s/
├── src/                          # React Frontend
│   ├── components/               # Reusable React components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── ProductCard.jsx
│   │   └── CheckoutDialog.jsx
│   ├── pages/                    # Page components
│   │   ├── Home.jsx
│   │   ├── Products.jsx
│   │   ├── ProductDetail.jsx
│   │   ├── Cart.jsx
│   │   ├── Orders.jsx
│   │   ├── Login.jsx
│   │   └── Signup.jsx
│   ├── context/                  # React Context for state management
│   │   ├── ProductContext.jsx
│   │   ├── CartContext.jsx
│   │   ├── OrderContext.jsx
│   │   └── AuthContext.jsx
│   ├── services/                 # API service layer
│   │   └── api.js
│   ├── constants/                # Constants and configuration
│   │   └── api.js
│   ├── hooks/                    # Custom React hooks
│   ├── utils/                    # Utility functions
│   ├── assets/                   # Static assets
│   └── styles/                   # CSS files
├── backend/                      # Spring Boot Backend
│   ├── src/main/java/com/ecommerce/
│   │   ├── model/                # Entity models
│   │   │   ├── Product.java
│   │   │   └── Category.java
│   │   ├── repository/            # Data repositories
│   │   │   ├── ProductRepository.java
│   │   │   └── CategoryRepository.java
│   │   ├── controller/            # REST controllers
│   │   │   ├── ProductController.java
│   │   │   └── CategoryController.java
│   │   ├── config/                # Configuration classes
│   │   │   ├── CorsConfig.java
│   │   │   └── DataInitializer.java
│   │   └── EcommerceApplication.java
│   ├── src/main/resources/
│   │   └── application.properties # Database configuration
│   ├── pom.xml                    # Maven dependencies
│   ├── run-backend.bat           # Windows batch script
│   └── run-backend.ps1           # PowerShell script
├── database/                     # Database scripts
│   ├── ecommerce_database.sql   # MySQL schema
│   ├── create_postgres_db.sql    # PostgreSQL schema
│   ├── create_database_only.sql  # PostgreSQL DB creation
│   └── README_POSTGRES.md        # PostgreSQL setup guide
├── package.json                  # Frontend dependencies
├── vite.config.js               # Vite configuration
└── README.md                     # This file
```

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd e-commerce-s
```

### 2. Install Frontend Dependencies

```bash
npm install
```

### 3. Backend Setup

The backend uses Maven for dependency management. Dependencies will be downloaded automatically when you run the application.

**Note for Windows Users:** If Maven is not in your PATH, the project includes helper scripts:
- `backend/run-backend.bat` - Windows batch script
- `backend/run-backend.ps1` - PowerShell script

## ▶️ Running the Application

You need **two terminal windows** - one for the backend and one for the frontend.

### Option 1: Using Helper Scripts (Windows - Recommended)

**Terminal 1 - Backend:**
```bash
cd backend
.\run-backend.bat
# OR
.\run-backend.ps1
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

### Option 2: Manual Commands

**Terminal 1 - Backend:**

If Maven is in your PATH:
```bash
cd backend
mvn spring-boot:run
```

If Maven is NOT in your PATH (Windows):
```powershell
cd backend
& "C:\Program Files\NetBeans-18\netbeans\java\maven\bin\mvn.cmd" spring-boot:run
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

### Option 3: Using IntelliJ IDEA

1. Open the `backend` folder in IntelliJ IDEA
2. Wait for Maven dependencies to download
3. Right-click on `EcommerceApplication.java` → Run
4. Start frontend in terminal: `npm run dev`

### Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8080/api
- **H2 Console** (if using H2): http://localhost:8080/h2-console

## 🗄️ Database Setup

The application supports three database options:

### Option 1: H2 Database (Default - Easiest)

No setup required! H2 is an in-memory database that works out of the box.

**Configuration** (already set in `application.properties`):
```properties
spring.datasource.url=jdbc:h2:mem:ecommercedb
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=
```

**Access H2 Console:**
- URL: http://localhost:8080/h2-console
- JDBC URL: `jdbc:h2:mem:ecommercedb`
- Username: `sa`
- Password: (leave empty)

**Note:** Data is lost when the application stops (in-memory database).

### Option 2: PostgreSQL

1. **Create the database:**
```bash
"C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres -c "CREATE DATABASE ecommerce_db;"
```

2. **Create tables and insert data:**
```bash
"C:\Program Files\PostgreSQL\18\bin\psql.exe" -U postgres -d ecommerce_db -f "database\create_postgres_db.sql"
```

3. **Update `backend/src/main/resources/application.properties`:**
```properties
# Comment out H2 configuration
# spring.datasource.url=jdbc:h2:mem:ecommercedb
# spring.datasource.driverClassName=org.h2.Driver

# Add PostgreSQL configuration
spring.datasource.url=jdbc:postgresql://localhost:5432/ecommerce_db
spring.datasource.username=postgres
spring.datasource.password=your_password
spring.datasource.driver-class-name=org.postgresql.Driver
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
```

4. **Add PostgreSQL dependency to `backend/pom.xml`:**
```xml
<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <scope>runtime</scope>
</dependency>
```

### Option 3: MySQL

1. **Create the database:**
```sql
CREATE DATABASE ecommerce_db;
```

2. **Run the SQL script:**
```bash
mysql -u root -p ecommerce_db < database/ecommerce_database.sql
```

3. **Update `backend/src/main/resources/application.properties`:**
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/ecommerce_db?createDatabaseIfNotExist=true
spring.datasource.username=root
spring.datasource.password=your_password
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.database-platform=org.hibernate.dialect.MySQLDialect
```

## 🔌 API Endpoints

### Products

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| GET | `/api/products/{id}` | Get product by ID |
| GET | `/api/products/category/{categoryId}` | Get products by category |
| POST | `/api/products` | Create new product |
| PUT | `/api/products/{id}` | Update product |
| DELETE | `/api/products/{id}` | Delete product |

### Categories

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/categories` | Get all categories |
| GET | `/api/categories/{id}` | Get category by ID |
| POST | `/api/categories` | Create new category |
| PUT | `/api/categories/{id}` | Update category |
| DELETE | `/api/categories/{id}` | Delete category |

### Example API Requests

**Get all products:**
```bash
curl http://localhost:8080/api/products
```

**Get product by ID:**
```bash
curl http://localhost:8080/api/products/1
```

**Create a product:**
```bash
curl -X POST http://localhost:8080/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Product",
    "description": "Product description",
    "price": 99.99,
    "stock": 50,
    "categoryId": 1
  }'
```

## 🛠️ Technologies Used

### Frontend
- **React 19** - UI library
- **Material UI (MUI) 5** - Component library
- **React Router 6** - Routing
- **Axios** - HTTP client
- **Vite** - Build tool and dev server
- **Emotion** - CSS-in-JS styling

### Backend
- **Spring Boot 3.2** - Java framework
- **Spring Data JPA** - Data persistence
- **Spring Web** - REST API
- **H2 Database** - In-memory database (development)
- **PostgreSQL** - Relational database (production option)
- **MySQL** - Relational database (production option)
- **Maven** - Dependency management
- **Lombok** - Reduce boilerplate code

## 🔧 Troubleshooting

### Backend Issues

**Maven not found:**
```powershell
# Use full path to Maven
& "C:\Program Files\NetBeans-18\netbeans\java\maven\bin\mvn.cmd" spring-boot:run

# Or use the helper script
cd backend
.\run-backend.bat
```

**Port 8080 already in use:**
- Stop other applications using port 8080
- Or change port in `application.properties`: `server.port=8081`

**Java version error:**
- Ensure Java 17+ is installed: `java -version`
- Update JAVA_HOME environment variable if needed

**Database connection errors:**
- Verify database service is running
- Check username/password in `application.properties`
- Ensure database exists (for PostgreSQL/MySQL)

### Frontend Issues

**npm install fails:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Port 5173 already in use:**
- Vite will automatically use the next available port
- Or specify a different port: `npm run dev -- --port 3000`

**API not connecting:**
- Ensure backend is running on port 8080
- Check browser console (F12) for CORS errors
- Verify API endpoint: http://localhost:8080/api/products

### Database Issues

**H2 Console not accessible:**
- Ensure backend is running
- Check `spring.h2.console.enabled=true` in `application.properties`

**PostgreSQL connection failed:**
- Verify PostgreSQL service is running
- Check connection string in `application.properties`
- Ensure database exists: `psql -U postgres -l`

## 📝 Development Notes

- **CORS Configuration**: Backend allows requests from `http://localhost:5173`
- **State Management**: React Context API for global state
- **Data Persistence**: Cart data stored in browser localStorage
- **Hot Reload**: Both frontend and backend support hot reload during development
- **Sample Data**: Automatically loaded on backend startup via `DataInitializer.java`

## 🚧 Future Enhancements

- [ ] User authentication and authorization (JWT)
- [ ] Order management system
- [ ] Payment integration (Stripe/PayPal)
- [ ] Product reviews and ratings
- [ ] Admin dashboard
- [ ] Image upload functionality
- [ ] Email notifications
- [ ] Search and advanced filtering
- [ ] Wishlist functionality
- [ ] Product recommendations
- [ ] Multi-language support

## 📄 License

This project is open source and available under the MIT License.

## 👥 Contributing

Contributions, issues, and feature requests are welcome!

## 📞 Support

For support, please open an issue in the repository.

---

**Happy Coding! 🎉**
