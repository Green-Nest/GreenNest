package com.greennest.backend.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "razorpay")
public class RazorpayProperties {
    
    private Key key = new Key();
    private String currency = "INR";
    private Company company = new Company();
    private Webhook webhook = new Webhook();
    
    // Getters and Setters
    public Key getKey() { return key; }
    public void setKey(Key key) { this.key = key; }
    
    public String getCurrency() { return currency; }
    public void setCurrency(String currency) { this.currency = currency; }
    
    public Company getCompany() { return company; }
    public void setCompany(Company company) { this.company = company; }
    
    public Webhook getWebhook() { return webhook; }
    public void setWebhook(Webhook webhook) { this.webhook = webhook; }
    
    // Nested classes
    public static class Key {
        private String id;
        private String secret;
        
        public String getId() { return id; }
        public void setId(String id) { this.id = id; }
        
        public String getSecret() { return secret; }
        public void setSecret(String secret) { this.secret = secret; }
    }
    
    public static class Company {
        private String name;
        private String logo;
        
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        
        public String getLogo() { return logo; }
        public void setLogo(String logo) { this.logo = logo; }
    }
    
    public static class Webhook {
        private String secret;
        private String url;
        
        public String getSecret() { return secret; }
        public void setSecret(String secret) { this.secret = secret; }
        
        public String getUrl() { return url; }
        public void setUrl(String url) { this.url = url; }
    }
}
