package com.greennest.backend.service.impl;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.greennest.backend.dto.request.CartAddRequest;
import com.greennest.backend.dto.response.CartResponse;
import com.greennest.backend.entity.Cart;
import com.greennest.backend.entity.Product;
import com.greennest.backend.entity.User;
import com.greennest.backend.repository.CartRepository;
import com.greennest.backend.repository.ProductRepository;
import com.greennest.backend.service.CartService;

@Service
@Transactional
public class CartServiceImpl implements CartService {
    
    @Autowired
    private CartRepository cartRepository;
    
    @Autowired
    private ProductRepository productRepository;
    
    @Override
    public CartResponse addToCart(User user, CartAddRequest request) {
        Product product = productRepository.findById(request.getProductId())
                .orElseThrow(() -> new RuntimeException("Product not found"));
        
        if (!product.getIsActive()) {
            throw new RuntimeException("Product is not available");
        }
        
        if (product.getStockQuantity() < request.getQuantity()) {
            throw new RuntimeException("Insufficient stock available");
        }
        
        Optional<Cart> existingCart = cartRepository.findByUserAndProduct(user, product);
        
        Cart cart;
        if (existingCart.isPresent()) {
            cart = existingCart.get();
            int newQuantity = cart.getQuantity() + request.getQuantity();
            
            if (newQuantity > product.getStockQuantity()) {
                throw new RuntimeException("Total quantity exceeds available stock");
            }
            
            cart.setQuantity(newQuantity);
        } else {
            cart = new Cart(user, product, request.getQuantity());
        }
        
        cart = cartRepository.save(cart);
        return convertToCartResponse(cart);
    }
    
    @Override
    public List<CartResponse> getCartItems(User user) {
        List<Cart> cartItems = cartRepository.findByUser(user);
        return cartItems.stream()
                .map(this::convertToCartResponse)
                .collect(Collectors.toList());
    }
    
    @Override
    public CartResponse updateCartItem(User user, Long productId, Integer quantity) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        
        Cart cart = cartRepository.findByUserAndProduct(user, product)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));
        
        if (quantity <= 0) {
            cartRepository.delete(cart);
            return null;
        }
        
        if (quantity > product.getStockQuantity()) {
            throw new RuntimeException("Quantity exceeds available stock");
        }
        
        cart.setQuantity(quantity);
        cart = cartRepository.save(cart);
        
        return convertToCartResponse(cart);
    }
    
    @Override
    public void removeFromCart(User user, Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
        
        cartRepository.deleteByUserAndProduct(user, product);
    }
    
    @Override
    public void clearCart(User user) {
        cartRepository.deleteByUser(user);
    }
    
    @Override
    public BigDecimal getCartTotal(User user) {
        BigDecimal total = cartRepository.calculateCartTotal(user);
        return total != null ? total : BigDecimal.ZERO;
    }
    
    @Override
    public int getCartItemCount(User user) {
        return cartRepository.getCartItemCount(user);
    }
    
    private CartResponse convertToCartResponse(Cart cart) {
        CartResponse response = new CartResponse();
        response.setId(cart.getId());
        response.setProductId(cart.getProduct().getId());
        response.setProductName(cart.getProduct().getName());
        response.setProductImage(cart.getProduct().getImageUrl());
        response.setProductPrice(cart.getProduct().getPrice());
        response.setQuantity(cart.getQuantity());
        response.setSubtotal(cart.getProduct().getPrice().multiply(BigDecimal.valueOf(cart.getQuantity())));
        response.setAddedAt(cart.getAddedAt());
        response.setInStock(cart.getProduct().getStockQuantity() >= cart.getQuantity());
        return response;
    }
}
