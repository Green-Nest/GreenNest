package com.greennest.backend.service;

import com.greennest.backend.dto.request.PaymentRequest;
import com.greennest.backend.dto.request.RefundRequest;
import com.greennest.backend.dto.response.PaymentResponse;
import com.greennest.backend.entity.Order;
import com.greennest.backend.entity.User;

public interface PaymentService {
    
    PaymentResponse createRazorpayOrder(Order order, User user);
    boolean verifyPayment(PaymentRequest paymentRequest);
    Order updatePaymentStatus(PaymentRequest paymentRequest);
    boolean verifyWebhookSignature(String payload, String signature);
    void handleWebhookEvent(String payload);
    Order processRefund(Long orderId, RefundRequest refundRequest);
}
