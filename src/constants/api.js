// API Configuration
// Backend API base URL
// For local development: http://localhost:8080/api
// For production: Set VITE_API_BASE_URL environment variable
// Example: https://your-backend.onrender.com/api
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

// Log API URL in development mode
if (import.meta.env.DEV) {
  console.log("🔗 Backend API URL:", API_BASE_URL);
}

export const API_ENDPOINTS = {
  PRODUCTS: "/products",
  PRODUCT_BY_ID: (id) => `/products/${id}`,
  CATEGORIES: "/categories",
};
