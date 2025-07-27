package com.greennest.backend.controller;

import com.greennest.backend.dto.response.ApiResponse;
import com.greennest.backend.dto.response.OrderResponse;
import com.greennest.backend.dto.response.UserResponse;
import com.greennest.backend.entity.User;
import com.greennest.backend.entity.Order;
import com.greennest.backend.entity.Product;
import com.greennest.backend.service.OrderService;
import com.greennest.backend.service.UserService;
import com.greennest.backend.repository.ProductRepository;
import com.greennest.backend.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private ProductRepository productRepository;
    
    @Autowired
    private CategoryRepository categoryRepository;
    
    // ================================
    // ADMIN DASHBOARD ENDPOINTS
    // ================================
    
    @GetMapping("/dashboard")
    public ResponseEntity<ApiResponse<Object>> getDashboard(Authentication authentication) {
        try {
            long totalUsers = userService.findUsersByRole(User.Role.CUSTOMER).size();
            long totalProducts = productRepository.count();
            long totalCategories = categoryRepository.count();
            long activeProducts = productRepository.findByIsActiveTrue(
                org.springframework.data.domain.Pageable.unpaged()).getTotalElements();
            
            // ✅ FIXED: Create a proper Map instead of anonymous object
            java.util.Map<String, Object> dashboardStats = new java.util.HashMap<>();
            dashboardStats.put("totalUsers", totalUsers);
            dashboardStats.put("totalProducts", totalProducts);
            dashboardStats.put("totalCategories", totalCategories);
            dashboardStats.put("activeProducts", activeProducts);
            dashboardStats.put("adminEmail", authentication.getName());
            
            return ResponseEntity.ok(
                ApiResponse.success("Dashboard data retrieved successfully", dashboardStats)
            );
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body(ApiResponse.error("Failed to retrieve dashboard data: " + e.getMessage()));
        }
    }

    
    // ================================
    // USER MANAGEMENT ENDPOINTS
    // ================================
    
    @GetMapping("/users")
    public ResponseEntity<ApiResponse<List<UserResponse>>> getAllUsers(
            @RequestParam(required = false) String role) {  // ✅ Added @RequestParam
        try {
            List<User> users;
            String message;
            
            // ✅ Handle role parameter filtering
            if (role != null && !role.trim().isEmpty()) {
                String roleParam = role.trim().toLowerCase();
                
                if (roleParam.equals("customers")) {
                    users = userService.findUsersByRole(User.Role.CUSTOMER);
                    message = "Customers retrieved successfully";
                    
                } else if (roleParam.equals("admins")) {
                    users = userService.findUsersByRole(User.Role.ADMIN);
                    message = "Admins retrieved successfully";
                    
                } else {
                    // Invalid role parameter
                    return ResponseEntity.badRequest()
                        .body(ApiResponse.error("Invalid role parameter. Use 'customers' or 'admins'"));
                }
            } else {
                // No role parameter - return all users
                users = userService.findAllActiveUsers();
                message = "All users retrieved successfully";
            }
            
            List<UserResponse> userResponses = users.stream()
                .map(this::convertToUserResponse)
                .collect(Collectors.toList());
            
            return ResponseEntity.ok(
                ApiResponse.success(message, userResponses)
            );
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body(ApiResponse.error("Failed to retrieve users: " + e.getMessage()));
        }
    }

    
    @GetMapping("/users/customers")
    public ResponseEntity<ApiResponse<List<UserResponse>>> getCustomersOnly() {
        try {
            List<User> customers = userService.findUsersByRole(User.Role.CUSTOMER);
            List<UserResponse> customerResponses = customers.stream()
                .map(this::convertToUserResponse)
                .collect(Collectors.toList());
            
            return ResponseEntity.ok(
                ApiResponse.success("Customers retrieved successfully", customerResponses)
            );
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body(ApiResponse.error("Failed to retrieve customers: " + e.getMessage()));
        }
    }
    
    @DeleteMapping("/users/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<String>> deleteUser(@PathVariable Long id) {
        try {
            userService.deleteUser(id);
            return ResponseEntity.ok(
                ApiResponse.success("User deactivated successfully", null)
            );
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body(ApiResponse.error("Failed to deactivate user: " + e.getMessage()));
        }
    }
    
    @GetMapping("/users/admins")
    public ResponseEntity<ApiResponse<List<UserResponse>>> getAdminsOnly() {
        try {
            List<User> admins = userService.findUsersByRole(User.Role.ADMIN);
            List<UserResponse> adminResponses = admins.stream()
                .map(this::convertToUserResponse)
                .collect(Collectors.toList());
            
            return ResponseEntity.ok(
                ApiResponse.success("Admins retrieved successfully", adminResponses)
            );
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body(ApiResponse.error("Failed to retrieve admins: " + e.getMessage()));
        }
    }
    
    // ================================
    // PRODUCT MANAGEMENT ENDPOINTS
    // ================================
    
    @GetMapping("/products")
    public ResponseEntity<ApiResponse<List<Product>>> getAllProducts() {
        try {
            List<Product> products = productRepository.findAll();
            return ResponseEntity.ok(
                ApiResponse.success("Products retrieved successfully", products)
            );
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body(ApiResponse.error("Failed to retrieve products: " + e.getMessage()));
        }
    }
    
    @PostMapping("/products/{id}/feature")
    public ResponseEntity<ApiResponse<String>> toggleProductFeature(@PathVariable Long id) {
        try {
            Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
            
            product.setIsFeatured(!product.getIsFeatured());
            productRepository.save(product);
            
            String message = product.getIsFeatured() ? "Product featured" : "Product unfeatured";
            return ResponseEntity.ok(ApiResponse.success(message, null));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body(ApiResponse.error("Failed to toggle product feature: " + e.getMessage()));
        }
    }
    
 // ================================
 // ORDER MANAGEMENT ENDPOINTS
 // ================================

 @GetMapping("/orders")
 public ResponseEntity<ApiResponse<List<OrderResponse>>> getAllOrders() {
     try {
         List<OrderResponse> orders = orderService.getAllOrders();
         return ResponseEntity.ok(
             ApiResponse.success("Orders retrieved successfully", orders)
         );
     } catch (Exception e) {
         return ResponseEntity.internalServerError()
             .body(ApiResponse.error("Failed to retrieve orders: " + e.getMessage()));
     }
 }

 @PutMapping("/orders/{orderId}/status")
 public ResponseEntity<ApiResponse<OrderResponse>> updateOrderStatus(
         @PathVariable Long orderId,
         @RequestParam String status) {
     try {
         Order.OrderStatus orderStatus = Order.OrderStatus.valueOf(status.toUpperCase());
         OrderResponse orderResponse = orderService.updateOrderStatus(orderId, orderStatus);
         
         return ResponseEntity.ok(
             ApiResponse.success("Order status updated successfully", orderResponse)
         );
     } catch (Exception e) {
         return ResponseEntity.badRequest()
             .body(ApiResponse.error("Failed to update order status: " + e.getMessage()));
     }
 }

 // Add these autowired services at the top of the class
 @Autowired
 private OrderService orderService;

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
}
