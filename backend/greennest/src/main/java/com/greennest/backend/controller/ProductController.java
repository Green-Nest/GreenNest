package com.greennest.backend.controller;

import com.greennest.backend.dto.request.ProductCreateRequest;
import com.greennest.backend.dto.response.ApiResponse;
import com.greennest.backend.dto.response.ProductResponse;
import com.greennest.backend.entity.Category;
import com.greennest.backend.entity.Product;
import com.greennest.backend.repository.CategoryRepository;
import com.greennest.backend.repository.ProductRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:3000")
public class ProductController {
    
    @Autowired
    private ProductRepository productRepository;
    
    @Autowired
    private CategoryRepository categoryRepository;
    
    // ================================
    // PUBLIC ENDPOINTS
    // ================================
    
    @GetMapping
    public ResponseEntity<ApiResponse<List<ProductResponse>>> getAllProducts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size) {
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
    
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<ProductResponse>> getProduct(@PathVariable Long id) {
        try {
            Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
            
            if (!product.getIsActive()) {
                return ResponseEntity.notFound().build();
            }
            
            ProductResponse productResponse = convertToProductResponse(product);
            
            return ResponseEntity.ok(
                ApiResponse.success("Product retrieved successfully", productResponse)
            );
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Failed to retrieve product: " + e.getMessage()));
        }
    }
    
    @GetMapping("/featured")
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
    
    @GetMapping("/search")
    public ResponseEntity<ApiResponse<List<ProductResponse>>> searchProducts(
            @RequestParam String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size) {
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
    // ADMIN ENDPOINTS
    // ================================
    
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<ProductResponse>> createProduct(
            @Valid @RequestBody ProductCreateRequest request) {
        try {
            Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));
            
            Product product = new Product();
            product.setName(request.getName());
            product.setDescription(request.getDescription());
            product.setPrice(request.getPrice());
            product.setStockQuantity(request.getStockQuantity());
            product.setCategory(category);
            product.setImageUrl(request.getImageUrl());
            product.setCareInstructions(request.getCareInstructions());
            product.setIsFeatured(request.getIsFeatured());
            product.setIsActive(true);
            product.setCreatedAt(LocalDateTime.now());
            product.setUpdatedAt(LocalDateTime.now());
            
            product = productRepository.save(product);
            ProductResponse productResponse = convertToProductResponse(product);
            
            return ResponseEntity.ok(
                ApiResponse.success("Product created successfully", productResponse)
            );
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Failed to create product: " + e.getMessage()));
        }
    }
    
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<ProductResponse>> updateProduct(
            @PathVariable Long id,
            @Valid @RequestBody ProductCreateRequest request) {
        try {
            Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
            
            Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));
            
            product.setName(request.getName());
            product.setDescription(request.getDescription());
            product.setPrice(request.getPrice());
            product.setStockQuantity(request.getStockQuantity());
            product.setCategory(category);
            product.setImageUrl(request.getImageUrl());
            product.setCareInstructions(request.getCareInstructions());
            product.setIsFeatured(request.getIsFeatured());
            product.setUpdatedAt(LocalDateTime.now());
            
            product = productRepository.save(product);
            ProductResponse productResponse = convertToProductResponse(product);
            
            return ResponseEntity.ok(
                ApiResponse.success("Product updated successfully", productResponse)
            );
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Failed to update product: " + e.getMessage()));
        }
    }
    
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<String>> deleteProduct(@PathVariable Long id) {
        try {
            Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
            
            product.setIsActive(false);
            product.setUpdatedAt(LocalDateTime.now());
            productRepository.save(product);
            
            return ResponseEntity.ok(
                ApiResponse.success("Product deleted successfully", null)
            );
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Failed to delete product: " + e.getMessage()));
        }
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
