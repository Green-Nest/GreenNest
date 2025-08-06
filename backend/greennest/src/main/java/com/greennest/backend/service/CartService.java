package com.greennest.backend.service;

import com.greennest.backend.dto.request.CartAddRequest;
import com.greennest.backend.dto.response.CartResponse;
import com.greennest.backend.entity.User;

import java.math.BigDecimal;
import java.util.List;

public interface CartService {
    
    CartResponse addToCart(User user, CartAddRequest request);
    List<CartResponse> getCartItems(User user);
    CartResponse updateCartItem(User user, Long productId, Integer quantity);
    void removeFromCart(User user, Long productId);
    void clearCart(User user);
    BigDecimal getCartTotal(User user);
    int getCartItemCount(User user);
}
