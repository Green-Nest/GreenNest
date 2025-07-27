package com.greennest.backend.dto.request;

import jakarta.validation.constraints.NotBlank;

public class OrderCreateRequest {
    
    @NotBlank(message = "Shipping address is required")
    private String shippingAddress;
    
    private String notes;
    
    // Constructors
    public OrderCreateRequest() {}
    
    public OrderCreateRequest(String shippingAddress) {
        this.shippingAddress = shippingAddress;
    }
    
    // Getters and Setters
    public String getShippingAddress() { return shippingAddress; }
    public void setShippingAddress(String shippingAddress) { this.shippingAddress = shippingAddress; }
    
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
}
