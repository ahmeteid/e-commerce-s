import { createContext, useContext, useState, useEffect } from "react";
// Backend API import - commented out for Netlify deployment (using mock data)
// Uncomment below to enable backend API:
// import { productService } from "../services/api";

const ProductContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    // For Netlify deployment: Using mock data directly (backend commented out)
    // To enable backend: Uncomment the try-catch block below and comment out the mock data section

    setLoading(true);
    setError(null);

    // Use mock data directly for Netlify (no backend needed)
    setProducts(getMockProducts());
    setLoading(false);

    /* BACKEND CODE - COMMENTED OUT FOR NETLIFY DEPLOYMENT
    // Uncomment this section to use backend API
    try {
      setLoading(true);
      setError(null);
      const data = await productService.getAllProducts();
      setProducts(data);
    } catch (err) {
      // Check if it's a network error (backend not running)
      const isNetworkError =
        err.code === "ERR_NETWORK" ||
        err.code === "ECONNABORTED" ||
        err.message?.includes("Network Error") ||
        err.message?.includes("timeout");

      if (isNetworkError) {
        // Silently fallback to mock data when backend is not available
        if (process.env.NODE_ENV === "development") {
          console.info(
            "ℹ️ Backend not available, using mock data. Start the Spring Boot backend to use real data."
          );
        }
        setProducts(getMockProducts());
        setError(null);
      } else {
        // For other errors, log and set error state
        console.error("Error fetching products:", err);
        setError(err.message || "Failed to fetch products");
        // Still use mock data as fallback
        setProducts(getMockProducts());
      }
    } finally {
      setLoading(false);
    }
    */
  };

  const getMockProducts = () => {
    return [
      {
        id: 1,
        name: 'Laptop Pro 15"',
        description:
          "High-performance laptop with 16GB RAM and 512GB SSD. Perfect for professionals and gamers alike.",
        price: 1299.99,
        stock: 25,
        imageUrl:
          "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=600&fit=crop&q=80",
        categoryId: 1,
      },
      {
        id: 2,
        name: "Wireless Mouse",
        description:
          "Ergonomic wireless mouse with long battery life. Comfortable design for all-day use.",
        price: 29.99,
        stock: 150,
        imageUrl:
          "https://images.unsplash.com/photo-1527814050087-3793815479db?w=800&h=600&fit=crop&q=80",
        categoryId: 1,
      },
      {
        id: 3,
        name: "Smartphone X",
        description:
          "Latest smartphone with 128GB storage and triple camera system. Capture life in stunning detail.",
        price: 899.99,
        stock: 40,
        imageUrl:
          "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=600&fit=crop&q=80",
        categoryId: 1,
      },
      {
        id: 4,
        name: "Wireless Headphones",
        description:
          "Premium noise-cancelling wireless headphones. Immerse yourself in crystal-clear sound.",
        price: 199.99,
        stock: 60,
        imageUrl:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop&q=80",
        categoryId: 1,
      },
      {
        id: 5,
        name: "Cotton T-Shirt",
        description:
          "Comfortable 100% organic cotton t-shirt in various colors. Sustainable and stylish.",
        price: 19.99,
        stock: 200,
        imageUrl:
          "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=600&fit=crop&q=80",
        categoryId: 2,
      },
      {
        id: 6,
        name: "Denim Jeans",
        description:
          "Classic fit denim jeans with premium quality fabric. Timeless style for every occasion.",
        price: 59.99,
        stock: 80,
        imageUrl:
          "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&h=600&fit=crop&q=80",
        categoryId: 2,
      },
      // Additional products commented out for Netlify (only showing 6 items)
      /*
      {
        id: 7,
        name: "The Great Novel",
        description:
          "Bestselling fiction novel that will captivate you from the first page to the last.",
        price: 14.99,
        stock: 300,
        imageUrl:
          "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&h=600&fit=crop&q=80",
        categoryId: 3,
      },
      {
        id: 8,
        name: "Basketball",
        description:
          "Official size basketball with premium grip. Perfect for indoor and outdoor play.",
        price: 29.99,
        stock: 90,
        imageUrl:
          "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&h=600&fit=crop&q=80",
        categoryId: 5,
      },
      */
    ];
  };

  const getProductById = (id) => {
    return products.find((product) => product.id === parseInt(id));
  };

  const value = {
    products,
    loading,
    error,
    fetchProducts,
    getProductById,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};
