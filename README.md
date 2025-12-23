# E-Commerce Application

A full-stack e-commerce web application built with React, Material UI, and Spring Boot.

## Project Structure

```
e-commerce-s/
├── src/                    # React Frontend
│   ├── components/         # Reusable React components
│   ├── pages/              # Page components
│   ├── context/            # React Context for state management
│   ├── services/           # API service layer
│   ├── hooks/              # Custom React hooks
│   ├── utils/              # Utility functions
│   ├── constants/          # Constants and configuration
│   ├── assets/             # Static assets
│   └── styles/             # CSS files
├── backend/                # Spring Boot Backend
│   └── src/main/java/com/ecommerce/
│       ├── model/          # Entity models
│       ├── repository/     # Data repositories
│       ├── controller/     # REST controllers
│       └── config/         # Configuration classes
└── database/               # Database files
    └── ecommerce_database.sql
```

## Features

### Frontend (React + Material UI)
- ✅ Home page displaying featured products
- ✅ Product listing page with search and filter
- ✅ Product detail page
- ✅ Shopping cart functionality
- ✅ Responsive design with Material UI
- ✅ State management using React Context
- ✅ Routing with React Router

### Backend (Spring Boot)
- ✅ RESTful API endpoints
- ✅ Product and Category management
- ✅ MySQL/H2 database integration
- ✅ CORS configuration for frontend access
- ✅ Input validation

## Prerequisites

- Node.js (v16 or higher)
- Java JDK 17 or higher
- Maven 3.6 or higher
- MySQL (optional, H2 is used by default)

## Setup Instructions

### Frontend Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Backend Setup

1. Open the `backend` folder in IntelliJ IDEA

2. Ensure Maven dependencies are downloaded (IntelliJ should do this automatically)

3. Configure database (optional):
   - For MySQL: Update `application.properties` with your MySQL credentials
   - For H2 (default): No configuration needed, runs in-memory

4. Run the Spring Boot application:
   - Right-click on `EcommerceApplication.java` → Run
   - Or use: `mvn spring-boot:run`

The backend API will be available at `http://localhost:8080/api`

### Database Setup

1. For MySQL:
   - Create a database named `ecommerce_db`
   - Run the SQL script: `database/ecommerce_database.sql`

2. For H2 (default):
   - Database is created automatically
   - Access H2 console at: `http://localhost:8080/h2-console`
   - JDBC URL: `jdbc:h2:mem:ecommercedb`
   - Username: `sa`
   - Password: (empty)

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/{id}` - Get product by ID
- `GET /api/products/category/{categoryId}` - Get products by category
- `POST /api/products` - Create new product
- `PUT /api/products/{id}` - Update product
- `DELETE /api/products/{id}` - Delete product

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/{id}` - Get category by ID
- `POST /api/categories` - Create new category
- `PUT /api/categories/{id}` - Update category
- `DELETE /api/categories/{id}` - Delete category

## Technologies Used

### Frontend
- React 19
- Material UI (MUI) 5
- React Router 6
- Axios
- Vite

### Backend
- Spring Boot 3.2
- Spring Data JPA
- H2 Database (development)
- MySQL (production)
- Maven

## Development Notes

- The frontend expects the backend to run on port 8080
- CORS is configured to allow requests from `http://localhost:5173`
- The application uses React Context for state management
- Cart data is persisted in localStorage
- Product images use placeholder URLs - replace with actual image URLs

## Future Enhancements

- User authentication and authorization
- Order management system
- Payment integration
- Product reviews and ratings
- Admin dashboard
- Image upload functionality

