package com.greennest.backend.controller;

import com.greennest.backend.dto.request.CartAddRequest;
import com.greennest.backend.dto.response.ApiResponse;
import com.greennest.backend.dto.response.CartResponse;
import com.greennest.backend.entity.User;
import com.greennest.backend.service.CartService;
import com.greennest.backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:3000")
public class CartController {
    
    @Autowired
    private CartService cartService;
    
    @Autowired
    private UserService userService;
    
    @PostMapping("/add")
    public ResponseEntity<ApiResponse<CartResponse>> addToCart(
            @Valid @RequestBody CartAddRequest request,
            Authentication authentication) {
        try {
            User user = getUserFromAuth(authentication);
            CartResponse cartResponse = cartService.addToCart(user, request);
            
            return ResponseEntity.ok(
                ApiResponse.success("Item added to cart successfully", cartResponse)
            );
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Failed to add item to cart: " + e.getMessage()));
        }
    }
    
    @GetMapping
    public ResponseEntity<ApiResponse<List<CartResponse>>> getCart(Authentication authentication) {
        try {
            User user = getUserFromAuth(authentication);
            List<CartResponse> cartItems = cartService.getCartItems(user);
            
            return ResponseEntity.ok(
                ApiResponse.success("Cart retrieved successfully", cartItems)
            );
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body(ApiResponse.error("Failed to retrieve cart: " + e.getMessage()));
        }
    }
    
    @PutMapping("/update/{productId}")
    public ResponseEntity<ApiResponse<CartResponse>> updateCartItem(
            @PathVariable Long productId,
            @RequestParam Integer quantity,
            Authentication authentication) {
        try {
            User user = getUserFromAuth(authentication);
            CartResponse cartResponse = cartService.updateCartItem(user, productId, quantity);
            
            if (cartResponse == null) {
                return ResponseEntity.ok(
                    ApiResponse.success("Item removed from cart", null)
                );
            }
            
            return ResponseEntity.ok(
                ApiResponse.success("Cart item updated successfully", cartResponse)
            );
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Failed to update cart item: " + e.getMessage()));
        }
    }
    
    @DeleteMapping("/remove/{productId}")
    public ResponseEntity<ApiResponse<String>> removeFromCart(
            @PathVariable Long productId,
            Authentication authentication) {
        try {
            User user = getUserFromAuth(authentication);
            cartService.removeFromCart(user, productId);
            
            return ResponseEntity.ok(
                ApiResponse.success("Item removed from cart successfully", null)
            );
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Failed to remove item from cart: " + e.getMessage()));
        }
    }
    
    @DeleteMapping("/clear")
    public ResponseEntity<ApiResponse<String>> clearCart(Authentication authentication) {
        try {
            User user = getUserFromAuth(authentication);
            cartService.clearCart(user);
            
            return ResponseEntity.ok(
                ApiResponse.success("Cart cleared successfully", null)
            );
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body(ApiResponse.error("Failed to clear cart: " + e.getMessage()));
        }
    }
    
    @GetMapping("/total")
    public ResponseEntity<ApiResponse<Object>> getCartSummary(Authentication authentication) {
        try {
            User user = getUserFromAuth(authentication);
            BigDecimal total = cartService.getCartTotal(user);
            int itemCount = cartService.getCartItemCount(user);
            
            // ✅ FIXED: Use HashMap instead of anonymous object
            Map<String, Object> summary = new HashMap<>();
            summary.put("total", total);
            summary.put("itemCount", itemCount);
            
            return ResponseEntity.ok(
                ApiResponse.success("Cart summary retrieved successfully", summary)
            );
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body(ApiResponse.error("Failed to retrieve cart summary: " + e.getMessage()));
        }
    }

    
    private User getUserFromAuth(Authentication authentication) {
        String email = authentication.getName();
        return userService.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}
