// API Configuration
// For Netlify: Set VITE_API_BASE_URL in Netlify environment variables
// Example: https://your-backend.onrender.com/api
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

export const API_ENDPOINTS = {
  PRODUCTS: "/products",
  PRODUCT_BY_ID: (id) => `/products/${id}`,
  CATEGORIES: "/categories",
};
