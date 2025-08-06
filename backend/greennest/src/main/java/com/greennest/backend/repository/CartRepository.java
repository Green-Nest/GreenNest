package com.greennest.backend.repository;

import com.greennest.backend.entity.Cart;
import com.greennest.backend.entity.User;
import com.greennest.backend.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
    
    List<Cart> findByUser(User user);
    Optional<Cart> findByUserAndProduct(User user, Product product);
    void deleteByUserAndProduct(User user, Product product);
    void deleteByUser(User user);
    
    @Query("SELECT SUM(c.quantity * c.product.price) FROM Cart c WHERE c.user = :user")
    java.math.BigDecimal calculateCartTotal(@Param("user") User user);
    
    @Query("SELECT COUNT(c) FROM Cart c WHERE c.user = :user")
    int getCartItemCount(@Param("user") User user);
}
