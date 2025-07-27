package com.greennest.backend.repository;

import com.greennest.backend.entity.OrderItem;
import com.greennest.backend.entity.Order;
import com.greennest.backend.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
    
    List<OrderItem> findByOrder(Order order);
    List<OrderItem> findByProduct(Product product);
    
    @Query("SELECT oi.product, SUM(oi.quantity) as totalSold " +
           "FROM OrderItem oi " +
           "WHERE oi.order.paymentStatus = 'COMPLETED' " +
           "GROUP BY oi.product " +
           "ORDER BY totalSold DESC")
    List<Object[]> findTopSellingProducts();
    
    @Query("SELECT SUM(oi.quantity) FROM OrderItem oi WHERE oi.product = :product")
    Long getTotalSoldQuantity(@Param("product") Product product);
}
