package com.greennest.backend.controller;

import com.greennest.backend.entity.User;
import com.greennest.backend.dto.response.ProductResponse;
import com.greennest.backend.dto.response.UserResponse;
import com.greennest.backend.entity.Category;
import com.greennest.backend.entity.Product;
import com.greennest.backend.repository.UserRepository;
import com.greennest.backend.repository.CategoryRepository;
import com.greennest.backend.repository.ProductRepository;
import com.greennest.backend.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/test")
public class TestController {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private CategoryRepository categoryRepository;
    
    @Autowired
    private ProductRepository productRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private JwtUtil jwtUtil;
    
    @GetMapping("/hello")
    public String hello() {
        return "✅ GreenNest Backend is running successfully!";
    }
    
    @GetMapping("/database")
    public String testDatabase() {
        try {
            long userCount = userRepository.count();
            long categoryCount = categoryRepository.count();
            long productCount = productRepository.count();
            
            return String.format(
                "✅ Database connection successful!%n" +
                "Users: %d%n" +
                "Categories: %d%n" +
                "Products: %d",
                userCount, categoryCount, productCount
            );
        } catch (Exception e) {
            return "❌ Database connection failed: " + e.getMessage();
        }
    }
    
    @GetMapping("/create-sample-data")  // ← Now accepts GET requests
    public String createSampleData() {
        try {
            // Create sample category
            if (categoryRepository.count() == 0) {
                Category category = new Category("Indoor Plants", "Plants suitable for indoor decoration");
                categoryRepository.save(category);
                
                // Create sample product
                Product product = new Product("Snake Plant", "Easy to care indoor plant", new BigDecimal("299.99"), category);
                product.setStockQuantity(50);
                product.setImageUrl("https://example.com/snake-plant.jpg");
                product.setCareInstructions("Water once a week, indirect sunlight");
                productRepository.save(product);
            }
            
            // Create sample user
            if (userRepository.count() == 0) {
                User user = new User("John", "Doe", "john@example.com", passwordEncoder.encode("password123"));
                user.setPhone("9876543210");
                user.setCity("Mumbai");
                user.setState("Maharashtra");
                user.setPincode("400001");
                userRepository.save(user);
                
                // Create admin user
                User admin = new User("Admin", "User", "admin@greennest.com", passwordEncoder.encode("admin123"));
                admin.setRole(User.Role.ADMIN);
                userRepository.save(admin);
            }
            
            return "✅ Sample data created successfully!";
        } catch (Exception e) {
            return "❌ Error creating sample data: " + e.getMessage();
        }
    }

    
    @GetMapping("/users")
    public List<UserResponse> getAllUsers() {
        List<User> users = userRepository.findAll();
        
        return users.stream().map(user -> {
            UserResponse response = new UserResponse();
            response.setId(user.getId());
            response.setFirstName(user.getFirstName());
            response.setLastName(user.getLastName());
            response.setEmail(user.getEmail());
            response.setRole(user.getRole().name());
            response.setPhone(user.getPhone());
            response.setCity(user.getCity());
            response.setState(user.getState());
            response.setCreatedAt(user.getCreatedAt());
            // ❌ NO PASSWORD MAPPING!
            return response;
        }).collect(java.util.stream.Collectors.toList());
    }

    
    @GetMapping("/categories")
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }
    
    @GetMapping("/products")
    public List<ProductResponse> getAllProducts() {
        List<Product> products = productRepository.findAll();
        
        return products.stream().map(product -> {
            ProductResponse response = new ProductResponse();
            response.setId(product.getId());
            response.setName(product.getName());
            response.setDescription(product.getDescription());
            response.setPrice(product.getPrice());
            response.setStockQuantity(product.getStockQuantity());
            response.setImageUrl(product.getImageUrl());
            response.setCareInstructions(product.getCareInstructions());
            response.setIsFeatured(product.getIsFeatured());
            response.setIsActive(product.getIsActive());
            response.setCreatedAt(product.getCreatedAt());
            
            // Safely get category information
            if (product.getCategory() != null) {
                response.setCategoryId(product.getCategory().getId());
                response.setCategoryName(product.getCategory().getName());
            }
            
            return response;
        }).collect(java.util.stream.Collectors.toList());
    }

    
    @GetMapping("/jwt-test/{email}")
    public String testJwt(@PathVariable String email) {
        String token = jwtUtil.generateToken(email, "CUSTOMER");
        boolean isValid = jwtUtil.validateToken(token);
        String extractedEmail = jwtUtil.getEmailFromToken(token);
        String role = jwtUtil.getRoleFromToken(token);
        
        return String.format(
            "✅ JWT Test Results:%n" +
            "Token: %s%n" +
            "Valid: %s%n" +
            "Email: %s%n" +
            "Role: %s",
            token, isValid, extractedEmail, role
        );
    }
}
