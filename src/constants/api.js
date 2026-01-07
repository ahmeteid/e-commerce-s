// API Configuration
// BACKEND API - COMMENTED OUT FOR NETLIFY DEPLOYMENT (using mock data)
// For Netlify: Set VITE_API_BASE_URL in Netlify environment variables
// Example: https://your-backend.onrender.com/api
// Uncomment below to enable backend API:
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";
// For Netlify deployment without backend, this is not used (mock data is used instead)

export const API_ENDPOINTS = {
  PRODUCTS: "/products",
  PRODUCT_BY_ID: (id) => `/products/${id}`,
  CATEGORIES: "/categories",
};
