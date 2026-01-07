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
            "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=600&fit=crop&q=80",
            electronics.getId()
        ));

        productRepository.save(new Product(
            "Wireless Mouse",
            "Ergonomic wireless mouse with long battery life",
            29.99,
            150,
            "https://images.unsplash.com/photo-1527814050087-3793815479db?w=800&h=600&fit=crop&q=80",
            electronics.getId()
        ));

        productRepository.save(new Product(
            "Smartphone X",
            "Latest smartphone with 128GB storage and triple camera",
            899.99,
            40,
            "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=600&fit=crop&q=80",
            electronics.getId()
        ));

        productRepository.save(new Product(
            "Wireless Headphones",
            "Noise-cancelling wireless headphones",
            199.99,
            60,
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop&q=80",
            electronics.getId()
        ));

        productRepository.save(new Product(
            "Tablet Air",
            "10-inch tablet with stylus support",
            499.99,
            30,
            "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&h=600&fit=crop&q=80",
            electronics.getId()
        ));

        productRepository.save(new Product(
            "Cotton T-Shirt",
            "Comfortable 100% cotton t-shirt in various colors",
            19.99,
            200,
            "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=600&fit=crop&q=80",
            clothing.getId()
        ));

        productRepository.save(new Product(
            "Denim Jeans",
            "Classic fit denim jeans",
            59.99,
            80,
            "https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&h=600&fit=crop&q=80",
            clothing.getId()
        ));

        productRepository.save(new Product(
            "Winter Jacket",
            "Warm winter jacket with hood",
            129.99,
            45,
            "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&h=600&fit=crop&q=80",
            clothing.getId()
        ));

        productRepository.save(new Product(
            "Running Shoes",
            "Lightweight running shoes for daily use",
            79.99,
            100,
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=600&fit=crop&q=80",
            clothing.getId()
        ));

        productRepository.save(new Product(
            "The Great Novel",
            "Bestselling fiction novel",
            14.99,
            300,
            "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&h=600&fit=crop&q=80",
            books.getId()
        ));

        productRepository.save(new Product(
            "Programming Guide",
            "Complete guide to modern programming",
            39.99,
            50,
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&q=80",
            books.getId()
        ));

        productRepository.save(new Product(
            "Coffee Table Book",
            "Beautiful photography coffee table book",
            49.99,
            25,
            "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&h=600&fit=crop&q=80",
            books.getId()
        ));

        productRepository.save(new Product(
            "Garden Tools Set",
            "Complete set of essential garden tools",
            89.99,
            35,
            "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=600&fit=crop&q=80",
            homeGarden.getId()
        ));

        productRepository.save(new Product(
            "Indoor Plant Pot",
            "Decorative ceramic plant pot set",
            24.99,
            120,
            "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&h=600&fit=crop&q=80",
            homeGarden.getId()
        ));

        productRepository.save(new Product(
            "LED String Lights",
            "Waterproof LED string lights for outdoor use",
            34.99,
            75,
            "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&h=600&fit=crop&q=80",
            homeGarden.getId()
        ));

        productRepository.save(new Product(
            "Basketball",
            "Official size basketball",
            29.99,
            90,
            "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&h=600&fit=crop&q=80",
            sports.getId()
        ));

        productRepository.save(new Product(
            "Yoga Mat",
            "Non-slip yoga mat with carrying strap",
            39.99,
            65,
            "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&h=600&fit=crop&q=80",
            sports.getId()
        ));

        productRepository.save(new Product(
            "Tennis Racket",
            "Professional tennis racket",
            129.99,
            30,
            "https://images.unsplash.com/photo-1622163642991-c2b9c43ab9b3?w=800&h=600&fit=crop&q=80",
            sports.getId()
        ));

        System.out.println("Sample data initialized successfully!");
    }
}

