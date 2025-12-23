package com.ecommerce.config;

import com.ecommerce.model.Category;
import com.ecommerce.model.Product;
import com.ecommerce.repository.CategoryRepository;
import com.ecommerce.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ProductRepository productRepository;

    @Override
    public void run(String... args) throws Exception {
        // Only initialize if database is empty
        if (categoryRepository.count() == 0) {
            initializeData();
        }
    }

    private void initializeData() {
        // Create Categories
        Category electronics = new Category("Electronics", "Electronic devices and gadgets");
        Category clothing = new Category("Clothing", "Apparel and fashion items");
        Category books = new Category("Books", "Books and reading materials");
        Category homeGarden = new Category("Home & Garden", "Home improvement and garden supplies");
        Category sports = new Category("Sports", "Sports equipment and accessories");

        electronics = categoryRepository.save(electronics);
        clothing = categoryRepository.save(clothing);
        books = categoryRepository.save(books);
        homeGarden = categoryRepository.save(homeGarden);
        sports = categoryRepository.save(sports);

        // Create Products
        productRepository.save(new Product(
            "Laptop Pro 15\"",
            "High-performance laptop with 16GB RAM and 512GB SSD",
            1299.99,
            25,
            "https://via.placeholder.com/400x300?text=Laptop",
            electronics.getId()
        ));

        productRepository.save(new Product(
            "Wireless Mouse",
            "Ergonomic wireless mouse with long battery life",
            29.99,
            150,
            "https://via.placeholder.com/400x300?text=Mouse",
            electronics.getId()
        ));

        productRepository.save(new Product(
            "Smartphone X",
            "Latest smartphone with 128GB storage and triple camera",
            899.99,
            40,
            "https://via.placeholder.com/400x300?text=Smartphone",
            electronics.getId()
        ));

        productRepository.save(new Product(
            "Wireless Headphones",
            "Noise-cancelling wireless headphones",
            199.99,
            60,
            "https://via.placeholder.com/400x300?text=Headphones",
            electronics.getId()
        ));

        productRepository.save(new Product(
            "Tablet Air",
            "10-inch tablet with stylus support",
            499.99,
            30,
            "https://via.placeholder.com/400x300?text=Tablet",
            electronics.getId()
        ));

        productRepository.save(new Product(
            "Cotton T-Shirt",
            "Comfortable 100% cotton t-shirt in various colors",
            19.99,
            200,
            "https://via.placeholder.com/400x300?text=T-Shirt",
            clothing.getId()
        ));

        productRepository.save(new Product(
            "Denim Jeans",
            "Classic fit denim jeans",
            59.99,
            80,
            "https://via.placeholder.com/400x300?text=Jeans",
            clothing.getId()
        ));

        productRepository.save(new Product(
            "Winter Jacket",
            "Warm winter jacket with hood",
            129.99,
            45,
            "https://via.placeholder.com/400x300?text=Jacket",
            clothing.getId()
        ));

        productRepository.save(new Product(
            "Running Shoes",
            "Lightweight running shoes for daily use",
            79.99,
            100,
            "https://via.placeholder.com/400x300?text=Shoes",
            clothing.getId()
        ));

        productRepository.save(new Product(
            "The Great Novel",
            "Bestselling fiction novel",
            14.99,
            300,
            "https://via.placeholder.com/400x300?text=Book",
            books.getId()
        ));

        productRepository.save(new Product(
            "Programming Guide",
            "Complete guide to modern programming",
            39.99,
            50,
            "https://via.placeholder.com/400x300?text=Programming+Book",
            books.getId()
        ));

        productRepository.save(new Product(
            "Coffee Table Book",
            "Beautiful photography coffee table book",
            49.99,
            25,
            "https://via.placeholder.com/400x300?text=Coffee+Table+Book",
            books.getId()
        ));

        productRepository.save(new Product(
            "Garden Tools Set",
            "Complete set of essential garden tools",
            89.99,
            35,
            "https://via.placeholder.com/400x300?text=Garden+Tools",
            homeGarden.getId()
        ));

        productRepository.save(new Product(
            "Indoor Plant Pot",
            "Decorative ceramic plant pot set",
            24.99,
            120,
            "https://via.placeholder.com/400x300?text=Plant+Pot",
            homeGarden.getId()
        ));

        productRepository.save(new Product(
            "LED String Lights",
            "Waterproof LED string lights for outdoor use",
            34.99,
            75,
            "https://via.placeholder.com/400x300?text=LED+Lights",
            homeGarden.getId()
        ));

        productRepository.save(new Product(
            "Basketball",
            "Official size basketball",
            29.99,
            90,
            "https://via.placeholder.com/400x300?text=Basketball",
            sports.getId()
        ));

        productRepository.save(new Product(
            "Yoga Mat",
            "Non-slip yoga mat with carrying strap",
            39.99,
            65,
            "https://via.placeholder.com/400x300?text=Yoga+Mat",
            sports.getId()
        ));

        productRepository.save(new Product(
            "Tennis Racket",
            "Professional tennis racket",
            129.99,
            30,
            "https://via.placeholder.com/400x300?text=Tennis+Racket",
            sports.getId()
        ));

        System.out.println("Sample data initialized successfully!");
    }
}

