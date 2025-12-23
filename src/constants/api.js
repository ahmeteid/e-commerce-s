// API Configuration
export const API_BASE_URL = "http://localhost:8080/api";

export const API_ENDPOINTS = {
  PRODUCTS: "/products",
  PRODUCT_BY_ID: (id) => `/products/${id}`,
  CATEGORIES: "/categories",
};
