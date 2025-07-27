package com.greennest.backend.config;

import com.greennest.backend.security.JwtAuthenticationFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;
    
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOriginPatterns(Arrays.asList("*")); // For development
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
    
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .sessionManagement(session -> 
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                // ================================
                // PUBLIC ENDPOINTS (No authentication required)
                // ================================
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/api/test/**").permitAll()
                
                // ✅ FIXED: Product browsing endpoints are PUBLIC
                .requestMatchers(HttpMethod.GET, "/api/products").permitAll()           // Browse all products
                .requestMatchers(HttpMethod.GET, "/api/products/**").permitAll()        // View single product
                .requestMatchers(HttpMethod.GET, "/api/products/featured").permitAll()  // Featured products
                .requestMatchers(HttpMethod.GET, "/api/products/search").permitAll()    // Search products
                
             // ✅ ADDED: Payment webhook endpoint (public for Razorpay callbacks)
                .requestMatchers(HttpMethod.POST, "/api/payments/webhook").permitAll()
                
                // ================================
                // ADMIN-ONLY ENDPOINTS
                // ================================
                .requestMatchers("/api/admin/**").hasAuthority("ROLE_ADMIN")
                
                // ✅ FIXED: Admin product management (CREATE, UPDATE, DELETE)
                .requestMatchers(HttpMethod.POST, "/api/products/**").hasAuthority("ROLE_ADMIN")
                .requestMatchers(HttpMethod.PUT, "/api/products/**").hasAuthority("ROLE_ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/api/products/**").hasAuthority("ROLE_ADMIN")
                
             // ✅ ADDED: Admin payment endpoints
                .requestMatchers("/api/payments/refund/**").hasAuthority("ROLE_ADMIN")
                
                // ================================
                // AUTHENTICATED USER ENDPOINTS
                // ================================
                .requestMatchers("/api/customer/**").hasAnyAuthority("ROLE_CUSTOMER", "ROLE_ADMIN")
                .requestMatchers("/api/cart/**").hasAnyAuthority("ROLE_CUSTOMER", "ROLE_ADMIN")
                .requestMatchers("/api/orders/**").hasAnyAuthority("ROLE_CUSTOMER", "ROLE_ADMIN")
                
             // Customer payment endpoints
                .requestMatchers("/api/payments/create-order/**").hasAnyAuthority("ROLE_CUSTOMER", "ROLE_ADMIN")
                .requestMatchers("/api/payments/verify").hasAnyAuthority("ROLE_CUSTOMER", "ROLE_ADMIN")
                .requestMatchers("/api/payments/order/**").hasAnyAuthority("ROLE_CUSTOMER", "ROLE_ADMIN")
                
                // ================================
                // DEFAULT: Require authentication for everything else
                // ================================
                .anyRequest().authenticated()
            )
            .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
        
        return http.build();
    }

}
