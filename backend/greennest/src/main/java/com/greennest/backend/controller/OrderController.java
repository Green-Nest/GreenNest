package com.greennest.backend.controller;

import com.greennest.backend.dto.request.OrderCreateRequest;
import com.greennest.backend.dto.response.ApiResponse;
import com.greennest.backend.dto.response.OrderResponse;
import com.greennest.backend.entity.User;
import com.greennest.backend.service.OrderService;
import com.greennest.backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:3000")
public class OrderController {
    
    @Autowired
    private OrderService orderService;
    
    @Autowired
    private UserService userService;
    
    @PostMapping("/create")
    public ResponseEntity<ApiResponse<OrderResponse>> createOrder(
            @Valid @RequestBody OrderCreateRequest request,
            Authentication authentication) {
        try {
            User user = getUserFromAuth(authentication);
            OrderResponse orderResponse = orderService.createOrder(user, request);
            
            return ResponseEntity.ok(
                ApiResponse.success("Order created successfully", orderResponse)
            );
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Failed to create order: " + e.getMessage()));
        }
    }
    
    @GetMapping
    public ResponseEntity<ApiResponse<List<OrderResponse>>> getUserOrders(Authentication authentication) {
        try {
            User user = getUserFromAuth(authentication);
            List<OrderResponse> orders = orderService.getUserOrders(user);
            
            return ResponseEntity.ok(
                ApiResponse.success("Orders retrieved successfully", orders)
            );
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body(ApiResponse.error("Failed to retrieve orders: " + e.getMessage()));
        }
    }
    
    @GetMapping("/{orderId}")
    public ResponseEntity<ApiResponse<OrderResponse>> getOrder(
            @PathVariable Long orderId,
            Authentication authentication) {
        try {
            User user = getUserFromAuth(authentication);
            OrderResponse orderResponse = orderService.getOrderById(orderId, user);
            
            return ResponseEntity.ok(
                ApiResponse.success("Order retrieved successfully", orderResponse)
            );
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Failed to retrieve order: " + e.getMessage()));
        }
    }
    
    private User getUserFromAuth(Authentication authentication) {
        String email = authentication.getName();
        return userService.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}
