// Backend API Service
// Handles all API calls to the backend

import axios from "axios";
import { API_BASE_URL } from "../constants/api";

// Create axios instance with base configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 second timeout for backend requests
});

// Add request interceptor to handle network errors gracefully
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Suppress network error logging in console for better UX
    if (error.code === "ERR_NETWORK" || error.code === "ECONNABORTED") {
      // Return a rejected promise but don't log to console
      return Promise.reject({
        ...error,
        silent: true, // Flag to indicate this is a silent error
      });
    }
    // For other errors, let them through normally
    return Promise.reject(error);
  }
);

// Product API functions
export const productService = {
  // Get all products from backend
  getAllProducts: async () => {
    try {
      const response = await api.get("/products");
      return response.data;
    } catch (error) {
      // Log errors except for silent network errors
      if (
        !error.silent &&
        error.code !== "ERR_NETWORK" &&
        error.code !== "ECONNABORTED"
      ) {
        console.error("Error fetching products from backend:", error);
      }
      throw error;
    }
  },

  // Get product by ID
  getProductById: async (id) => {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      // Don't log silent network errors
      if (
        !error.silent &&
        error.code !== "ERR_NETWORK" &&
        error.code !== "ECONNABORTED"
      ) {
        console.error(`Error fetching product ${id}:`, error);
      }
      throw error;
    }
  },

  // Get products by category
  getProductsByCategory: async (categoryId) => {
    try {
      const response = await api.get(`/products/category/${categoryId}`);
      return response.data;
    } catch (error) {
      // Don't log silent network errors
      if (
        !error.silent &&
        error.code !== "ERR_NETWORK" &&
        error.code !== "ECONNABORTED"
      ) {
        console.error(
          `Error fetching products by category ${categoryId}:`,
          error
        );
      }
      throw error;
    }
  },
};

// Category API functions
export const categoryService = {
  // Get all categories
  getAllCategories: async () => {
    try {
      const response = await api.get("/categories");
      return response.data;
    } catch (error) {
      // Don't log silent network errors
      if (
        !error.silent &&
        error.code !== "ERR_NETWORK" &&
        error.code !== "ECONNABORTED"
      ) {
        console.error("Error fetching categories:", error);
      }
      throw error;
    }
  },
};

export default api;
