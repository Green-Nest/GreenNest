package com.greennest.backend.service;

import com.greennest.backend.dto.request.OrderCreateRequest;
import com.greennest.backend.dto.response.OrderResponse;
import com.greennest.backend.entity.Order;
import com.greennest.backend.entity.User;

import java.util.List;

public interface OrderService {
    
    OrderResponse createOrder(User user, OrderCreateRequest request);
    List<OrderResponse> getUserOrders(User user);
    OrderResponse getOrderById(Long orderId, User user);
    OrderResponse updateOrderStatus(Long orderId, Order.OrderStatus status);
    List<OrderResponse> getAllOrders();
    String generateOrderNumber();
}
