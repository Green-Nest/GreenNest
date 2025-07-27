package com.greennest.backend.service.impl;

import com.greennest.backend.dto.request.PaymentRequest;
import com.greennest.backend.dto.request.RefundRequest;
import com.greennest.backend.dto.response.PaymentResponse;
import com.greennest.backend.entity.Order;
import com.greennest.backend.entity.User;
import com.greennest.backend.repository.OrderRepository;
import com.greennest.backend.service.PaymentService;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Service
@Transactional
public class PaymentServiceImpl implements PaymentService {
    
    @Autowired
    private RazorpayClient razorpayClient;
    
    @Autowired
    private OrderRepository orderRepository;
    
    @Value("${razorpay.key.id}")
    private String keyId;
    
    @Value("${razorpay.key.secret}")
    private String keySecret;
    
    @Value("${razorpay.currency}")
    private String currency;
    
    @Value("${razorpay.company.name}")
    private String companyName;
    
    @Value("${razorpay.webhook.secret}")
    private String webhookSecret;
    
    @Override
    public PaymentResponse createRazorpayOrder(Order order, User user) {
        try {
            // Create Razorpay order
            JSONObject orderRequest = new JSONObject();
            orderRequest.put("amount", order.getTotalAmount().multiply(new BigDecimal("100")).intValue()); // Amount in paise
            orderRequest.put("currency", currency);
            orderRequest.put("receipt", order.getOrderNumber());
            
            // Add notes for tracking
            JSONObject notes = new JSONObject();
            notes.put("order_id", order.getId());
            notes.put("customer_email", user.getEmail());
            orderRequest.put("notes", notes);
            
            // Create order in Razorpay
            com.razorpay.Order razorpayOrder = razorpayClient.orders.create(orderRequest);
            
            // Update order with Razorpay order ID
            order.setRazorpayOrderId(razorpayOrder.get("id"));
            orderRepository.save(order);
            
            // Create response
            PaymentResponse response = new PaymentResponse();
            response.setRazorpayOrderId(razorpayOrder.get("id"));
            response.setRazorpayKeyId(keyId);
            response.setAmount(order.getTotalAmount());
            response.setCurrency(currency);
            response.setOrderNumber(order.getOrderNumber());
            response.setCompanyName(companyName);
            response.setCustomerName(user.getFullName());
            response.setCustomerEmail(user.getEmail());
            response.setCustomerPhone(user.getPhone());
            
            return response;
            
        } catch (RazorpayException e) {
            throw new RuntimeException("Failed to create Razorpay order: " + e.getMessage());
        }
    }
    
    @Override
    public boolean verifyPayment(PaymentRequest paymentRequest) {
        try {
            // Create signature verification string
            String signaturePayload = paymentRequest.getRazorpayOrderId() + "|" + paymentRequest.getRazorpayPaymentId();
            
            // Generate expected signature
            String expectedSignature = generateSignature(signaturePayload, keySecret);
            
            // Compare signatures
            return expectedSignature.equals(paymentRequest.getRazorpaySignature());
            
        } catch (Exception e) {
            System.err.println("Payment verification failed: " + e.getMessage());
            return false;
        }
    }
    
    @Override
    public Order updatePaymentStatus(PaymentRequest paymentRequest) {
        Order order = orderRepository.findById(paymentRequest.getOrderId())
                .orElseThrow(() -> new RuntimeException("Order not found"));
        
        if (verifyPayment(paymentRequest)) {
            // Update order with payment details
            order.setRazorpayPaymentId(paymentRequest.getRazorpayPaymentId());
            order.setRazorpaySignature(paymentRequest.getRazorpaySignature());
            order.setPaymentStatus(Order.PaymentStatus.COMPLETED);
            order.setStatus(Order.OrderStatus.CONFIRMED);
            order.setPaymentCompletedAt(LocalDateTime.now());
            order.setUpdatedAt(LocalDateTime.now());
            
            return orderRepository.save(order);
        } else {
            // Payment verification failed
            order.setPaymentStatus(Order.PaymentStatus.FAILED);
            order.setUpdatedAt(LocalDateTime.now());
            orderRepository.save(order);
            
            throw new RuntimeException("Payment verification failed");
        }
    }
    
    @Override
    public Order processRefund(Long orderId, RefundRequest refundRequest) {
        try {
            Order order = orderRepository.findById(orderId)
                    .orElseThrow(() -> new RuntimeException("Order not found"));
            
            if (order.getRazorpayPaymentId() == null) {
                throw new RuntimeException("No payment found for this order");
            }
            
            if (order.getPaymentStatus() != Order.PaymentStatus.COMPLETED) {
                throw new RuntimeException("Cannot refund a payment that is not completed");
            }
            
            // Create refund request
            JSONObject refundRequestObj = new JSONObject();
            refundRequestObj.put("amount", refundRequest.getAmount().multiply(new BigDecimal("100")).intValue()); // Amount in paise
            refundRequestObj.put("speed", "normal");
            
            if (refundRequest.getReason() != null && !refundRequest.getReason().isEmpty()) {
                JSONObject notes = new JSONObject();
                notes.put("reason", refundRequest.getReason());
                refundRequestObj.put("notes", notes);
            }
            
            // Process refund through Razorpay[1][5]
            com.razorpay.Refund refund = razorpayClient.payments.refund(order.getRazorpayPaymentId(), refundRequestObj);
            
            // Update order with refund details
            order.setRefundId(refund.get("id"));
            order.setRefundAmount(refundRequest.getAmount());
            order.setRefundStatus(Order.RefundStatus.PROCESSED);
            order.setStatus(Order.OrderStatus.CANCELLED);
            order.setUpdatedAt(LocalDateTime.now());
            
            return orderRepository.save(order);
            
        } catch (RazorpayException e) {
            throw new RuntimeException("Failed to process refund: " + e.getMessage());
        }
    }
    
    @Override
    public boolean verifyWebhookSignature(String payload, String signature) {
        try {
            String expectedSignature = generateSignature(payload, webhookSecret);
            return expectedSignature.equals(signature);
        } catch (Exception e) {
            System.err.println("Webhook signature verification failed: " + e.getMessage());
            return false;
        }
    }
    
    @Override
    public void handleWebhookEvent(String payload) {
        try {
            JSONObject event = new JSONObject(payload);
            String eventType = event.getString("event");
            
            switch (eventType) {
                case "payment.captured":
                    handlePaymentCaptured(event);
                    break;
                case "payment.failed":
                    handlePaymentFailed(event);
                    break;
                case "refund.processed":
                    handleRefundProcessed(event);
                    break;
                default:
                    System.out.println("Unhandled webhook event: " + eventType);
            }
        } catch (Exception e) {
            System.err.println("Error handling webhook event: " + e.getMessage());
        }
    }
    
    // Helper methods
    private String generateSignature(String payload, String secret) throws Exception {
        Mac mac = Mac.getInstance("HmacSHA256");
        SecretKeySpec secretKeySpec = new SecretKeySpec(secret.getBytes(), "HmacSHA256");
        mac.init(secretKeySpec);
        byte[] digest = mac.doFinal(payload.getBytes());
        return bytesToHex(digest);
    }
    
    private String bytesToHex(byte[] bytes) {
        StringBuilder result = new StringBuilder();
        for (byte b : bytes) {
            result.append(String.format("%02x", b));
        }
        return result.toString();
    }
    
    private void handlePaymentCaptured(JSONObject event) {
        // Handle payment captured event
        System.out.println("Payment captured: " + event.toString());
    }
    
    private void handlePaymentFailed(JSONObject event) {
        // Handle payment failed event
        System.out.println("Payment failed: " + event.toString());
    }
    
    private void handleRefundProcessed(JSONObject event) {
        // Handle refund processed event
        System.out.println("Refund processed: " + event.toString());
    }
}
