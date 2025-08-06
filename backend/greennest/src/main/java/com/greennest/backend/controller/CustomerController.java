package com.greennest.backend.controller;

import com.greennest.backend.dto.response.ApiResponse;
import com.greennest.backend.dto.response.ProductResponse;
import com.greennest.backend.dto.response.UserResponse;
import com.greennest.backend.entity.User;
import com.greennest.backend.entity.Product;
import com.greennest.backend.service.UserService;
import com.greennest.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/customer")
@CrossOrigin(origins = "http://localhost:3000")
public class CustomerController {
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private ProductRepository productRepository;
    
    // ================================
    // CUSTOMER PROFILE ENDPOINTS
    // ================================
    
    @GetMapping("/profile")
    public ResponseEntity<ApiResponse<UserResponse>> getProfile(Authentication authentication) {
        try {
            String email = authentication.getName();
            Optional<User> userOptional = userService.findByEmail(email);
            
            if (userOptional.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            
            User user = userOptional.get();
            UserResponse userResponse = convertToUserResponse(user);
            
            return ResponseEntity.ok(
                ApiResponse.success("Profile retrieved successfully", userResponse)
            );
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body(ApiResponse.error("Failed to retrieve profile: " + e.getMessage()));
        }
    }
    
    // ================================
    // PRODUCT BROWSING ENDPOINTS
    // ================================
    
    @GetMapping("/products")
    public ResponseEntity<ApiResponse<List<ProductResponse>>> getProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        try {
            Pageable pageable = PageRequest.of(page, size);
            Page<Product> productPage = productRepository.findByIsActiveTrue(pageable);
            
            List<ProductResponse> productResponses = productPage.getContent().stream()
                .map(this::convertToProductResponse)
                .collect(Collectors.toList());
            
            return ResponseEntity.ok(
                ApiResponse.success("Products retrieved successfully", productResponses)
            );
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body(ApiResponse.error("Failed to retrieve products: " + e.getMessage()));
        }
    }
    
    @GetMapping("/products/featured")
    public ResponseEntity<ApiResponse<List<ProductResponse>>> getFeaturedProducts() {
        try {
            List<Product> featuredProducts = productRepository.findByIsFeaturedTrueAndIsActiveTrue();
            
            List<ProductResponse> productResponses = featuredProducts.stream()
                .map(this::convertToProductResponse)
                .collect(Collectors.toList());
            
            return ResponseEntity.ok(
                ApiResponse.success("Featured products retrieved successfully", productResponses)
            );
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body(ApiResponse.error("Failed to retrieve featured products: " + e.getMessage()));
        }
    }
    
    @GetMapping("/products/{id}")
    public ResponseEntity<ApiResponse<ProductResponse>> getProduct(@PathVariable Long id) {
        try {
            Optional<Product> productOptional = productRepository.findById(id);
            
            if (productOptional.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            
            Product product = productOptional.get();
            if (!product.getIsActive()) {
                return ResponseEntity.notFound().build();
            }
            
            ProductResponse productResponse = convertToProductResponse(product);
            
            return ResponseEntity.ok(
                ApiResponse.success("Product retrieved successfully", productResponse)
            );
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body(ApiResponse.error("Failed to retrieve product: " + e.getMessage()));
        }
    }
    
    @GetMapping("/products/search")
    public ResponseEntity<ApiResponse<List<ProductResponse>>> searchProducts(
            @RequestParam String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        try {
            Pageable pageable = PageRequest.of(page, size);
            Page<Product> productPage = productRepository.searchByName(keyword, pageable);
            
            List<ProductResponse> productResponses = productPage.getContent().stream()
                .map(this::convertToProductResponse)
                .collect(Collectors.toList());
            
            return ResponseEntity.ok(
                ApiResponse.success("Search results retrieved successfully", productResponses)
            );
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body(ApiResponse.error("Failed to search products: " + e.getMessage()));
        }
    }
    
    // ================================
    // HELPER METHODS
    // ================================
    
    private UserResponse convertToUserResponse(User user) {
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
        return response;
    }
    
    private ProductResponse convertToProductResponse(Product product) {
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
        
        if (product.getCategory() != null) {
            response.setCategoryId(product.getCategory().getId());
            response.setCategoryName(product.getCategory().getName());
        }
        
        return response;
    }
}
