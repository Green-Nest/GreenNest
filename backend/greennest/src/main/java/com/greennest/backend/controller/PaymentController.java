package com.greennest.backend.controller;

import com.greennest.backend.dto.request.PaymentRequest;
import com.greennest.backend.dto.request.RefundRequest;
import com.greennest.backend.dto.response.ApiResponse;
import com.greennest.backend.dto.response.PaymentResponse;
import com.greennest.backend.entity.Order;
import com.greennest.backend.entity.User;
import com.greennest.backend.repository.OrderRepository;
import com.greennest.backend.service.PaymentService;
import com.greennest.backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "http://localhost:3000")
public class PaymentController {
    
    @Autowired
    private PaymentService paymentService;
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private OrderRepository orderRepository;
    
    // ================================
    // CUSTOMER PAYMENT ENDPOINTS
    // ================================
    
    @PostMapping("/create-order/{orderId}")
    public ResponseEntity<ApiResponse<PaymentResponse>> createPaymentOrder(
            @PathVariable Long orderId,
            Authentication authentication) {
        try {
            User user = getUserFromAuth(authentication);
            
            Order order = orderRepository.findById(orderId)
                    .orElseThrow(() -> new RuntimeException("Order not found"));
            
            // Verify order belongs to user
            if (!order.getUser().getId().equals(user.getId())) {
                return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Access denied"));
            }
            
            // Check if order is in correct state for payment
            if (order.getPaymentStatus() != Order.PaymentStatus.PENDING) {
                return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Order is not in pending payment status"));
            }
            
            PaymentResponse paymentResponse = paymentService.createRazorpayOrder(order, user);
            
            return ResponseEntity.ok(
                ApiResponse.success("Payment order created successfully", paymentResponse)
            );
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body(ApiResponse.error("Failed to create payment order: " + e.getMessage()));
        }
    }
    
    @PostMapping("/verify")
    public ResponseEntity<ApiResponse<String>> verifyPayment(
            @Valid @RequestBody PaymentRequest paymentRequest,
            Authentication authentication) {
        try {
            User user = getUserFromAuth(authentication);
            
            // Verify order belongs to user
            Order order = orderRepository.findById(paymentRequest.getOrderId())
                    .orElseThrow(() -> new RuntimeException("Order not found"));
            
            if (!order.getUser().getId().equals(user.getId())) {
                return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Access denied"));
            }
            
            // Verify and update payment
            Order updatedOrder = paymentService.updatePaymentStatus(paymentRequest);
            
            return ResponseEntity.ok(
                ApiResponse.success("Payment verified and order confirmed successfully", null)
            );
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Payment verification failed: " + e.getMessage()));
        }
    }
    
    @GetMapping("/order/{orderId}")
    public ResponseEntity<ApiResponse<Object>> getPaymentDetails(
            @PathVariable Long orderId,
            Authentication authentication) {
        try {
            User user = getUserFromAuth(authentication);
            
            Order order = orderRepository.findById(orderId)
                    .orElseThrow(() -> new RuntimeException("Order not found"));
            
            // Verify order belongs to user or user is admin
            if (!order.getUser().getId().equals(user.getId()) && user.getRole() != User.Role.ADMIN) {
                return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Access denied"));
            }
            
            // Create payment details response
            Map<String, Object> paymentDetails = new HashMap<>();
            paymentDetails.put("orderNumber", order.getOrderNumber());
            paymentDetails.put("totalAmount", order.getTotalAmount());
            paymentDetails.put("paymentStatus", order.getPaymentStatus().name());
            paymentDetails.put("razorpayOrderId", order.getRazorpayOrderId());
            paymentDetails.put("razorpayPaymentId", order.getRazorpayPaymentId());
            paymentDetails.put("paymentCompletedAt", order.getPaymentCompletedAt());
            paymentDetails.put("refundStatus", order.getRefundStatus().name());
            paymentDetails.put("refundAmount", order.getRefundAmount());
            paymentDetails.put("refundId", order.getRefundId());
            
            return ResponseEntity.ok(
                ApiResponse.success("Payment details retrieved successfully", paymentDetails)
            );
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                .body(ApiResponse.error("Failed to retrieve payment details: " + e.getMessage()));
        }
    }
    
    // ================================
    // ADMIN REFUND ENDPOINTS
    // ================================
    
    @PostMapping("/refund/{orderId}")
    public ResponseEntity<ApiResponse<String>> processRefund(
            @PathVariable Long orderId,
            @Valid @RequestBody RefundRequest refundRequest,
            Authentication authentication) {
        try {
            // Process refund (only admins can access this endpoint due to security config)
            Order refundedOrder = paymentService.processRefund(orderId, refundRequest);
            
            return ResponseEntity.ok(
                ApiResponse.success("Refund processed successfully", null)
            );
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                .body(ApiResponse.error("Failed to process refund: " + e.getMessage()));
        }
    }
    
    // ================================
    // WEBHOOK ENDPOINT (Public)
    // ================================
    
    @PostMapping("/webhook")
    public ResponseEntity<String> handleWebhook(
            @RequestBody String payload,
            @RequestHeader("X-Razorpay-Signature") String signature) {
        try {
            if (paymentService.verifyWebhookSignature(payload, signature)) {
                paymentService.handleWebhookEvent(payload);
                return ResponseEntity.ok("Webhook processed successfully");
            } else {
                return ResponseEntity.badRequest().body("Invalid signature");
            }
        } catch (Exception e) {
            System.err.println("Webhook processing error: " + e.getMessage());
            return ResponseEntity.internalServerError().body("Webhook processing failed");
        }
    }
    
    private User getUserFromAuth(Authentication authentication) {
        String email = authentication.getName();
        return userService.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}
