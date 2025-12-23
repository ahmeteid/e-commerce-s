# Quick Start Guide

## Frontend (React + Material UI)

The frontend is already configured and should be running. If not, follow these steps:

1. **Install dependencies** (if not already done):
   ```bash
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```

3. **Access the application**:
   - Open your browser and go to: `http://localhost:5173`
   - The app will work with mock data if the backend is not running

## Backend (Spring Boot)

### Prerequisites
- Java JDK 17 or higher installed
- Maven 3.6+ installed (or use Maven wrapper)
- IntelliJ IDEA (recommended)

### Setup Steps

1. **Open the backend project in IntelliJ IDEA**:
   - File → Open → Select the `backend` folder
   - IntelliJ will automatically detect it as a Maven project
   - Wait for Maven dependencies to download

2. **Configure the database** (optional):
   - By default, the app uses H2 in-memory database (no setup needed)
   - For MySQL: Edit `backend/src/main/resources/application.properties`
     - Uncomment MySQL configuration lines
     - Update username and password
     - Create database: `CREATE DATABASE ecommerce_db;`

3. **Run the Spring Boot application**:
   - Right-click on `EcommerceApplication.java`
   - Select "Run 'EcommerceApplication'"
   - Or use: `mvn spring-boot:run` from terminal

4. **Verify backend is running**:
   - API should be available at: `http://localhost:8080/api`
   - Test endpoint: `http://localhost:8080/api/products`
   - H2 Console: `http://localhost:8080/h2-console` (if using H2)

### Sample Data

The backend automatically initializes sample data on first run via `DataInitializer.java`. You should see:
- 5 Categories (Electronics, Clothing, Books, Home & Garden, Sports)
- 18 Products across different categories

## Testing the Application

1. **Frontend Only (Mock Data)**:
   - Start frontend: `npm run dev`
   - Navigate to `http://localhost:5173`
   - App will use mock data (8 sample products)
   - All features work: browsing, cart, product details

2. **Full Stack (Frontend + Backend)**:
   - Start backend in IntelliJ
   - Start frontend: `npm run dev`
   - Navigate to `http://localhost:5173`
   - App will fetch real data from backend API
   - All 18 products will be available

## Troubleshooting

### Frontend Issues
- **Port 5173 already in use**: Change port in `vite.config.js` or kill the process using port 5173
- **Dependencies not installing**: Delete `node_modules` and `package-lock.json`, then run `npm install` again
- **CORS errors**: Make sure backend CORS is configured (already done in `CorsConfig.java`)

### Backend Issues
- **Port 8080 already in use**: Change `server.port` in `application.properties`
- **Maven dependencies not downloading**: Check internet connection, try `mvn clean install`
- **Database connection errors**: Verify database credentials in `application.properties`
- **Class not found errors**: Make sure you're using Java 17+

## Project Structure

```
e-commerce-s/
├── src/                          # React Frontend
│   ├── components/               # Reusable components
│   ├── pages/                    # Page components
│   ├── context/                  # State management
│   ├── services/                 # API services
│   └── ...
├── backend/                      # Spring Boot Backend
│   └── src/main/java/com/ecommerce/
│       ├── model/                # Entities
│       ├── repository/           # Data access
│       ├── controller/           # REST APIs
│       └── config/               # Configuration
└── database/                     # SQL scripts
```

## Features Available

✅ Home page with featured products
✅ Product listing with search and sort
✅ Product detail page
✅ Shopping cart functionality
✅ Responsive Material UI design
✅ State management with React Context
✅ RESTful API backend
✅ Database integration

