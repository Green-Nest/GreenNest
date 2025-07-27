package com.greennest.backend.controller;

import com.greennest.backend.dto.request.LoginRequest;
import com.greennest.backend.dto.request.RegisterRequest;
import com.greennest.backend.dto.response.ApiResponse;
import com.greennest.backend.dto.response.AuthResponse;
import com.greennest.backend.entity.User;
import com.greennest.backend.service.UserService;
import com.greennest.backend.security.JwtUtil;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private JwtUtil jwtUtil;
    
    @PostMapping("/register")
    public ResponseEntity<ApiResponse<AuthResponse>> register(@Valid @RequestBody RegisterRequest registerRequest) {
        try {
            // Check if email already exists
            if (userService.existsByEmail(registerRequest.getEmail())) {
                return ResponseEntity.badRequest()
                    .body(ApiResponse.error("Email already exists"));
            }
            
            // Create user
            User user = userService.createUser(registerRequest);
            
            // Generate JWT token
            String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());
            
            // Create response
            AuthResponse authResponse = new AuthResponse(
                token, 
                user.getEmail(), 
                user.getFirstName(), 
                user.getLastName(), 
                user.getRole().name()
            );
            
            return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("User registered successfully", authResponse));
                
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ApiResponse.error("Registration failed: " + e.getMessage()));
        }
    }
    
    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@Valid @RequestBody LoginRequest loginRequest) {
        try {
            // Find user by email
            Optional<User> userOptional = userService.findByEmail(loginRequest.getEmail());
            
            if (userOptional.isEmpty()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error("Invalid email or password"));
            }
            
            User user = userOptional.get();
            
            // Check password
            if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error("Invalid email or password"));
            }
            
            // Check if user is active
            if (!user.getIsActive()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error("Account is deactivated"));
            }
            
            // Generate JWT token
            String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());
            
            // Create response
            AuthResponse authResponse = new AuthResponse(
                token, 
                user.getEmail(), 
                user.getFirstName(), 
                user.getLastName(), 
                user.getRole().name()
            );
            
            return ResponseEntity.ok(ApiResponse.success("Login successful", authResponse));
            
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ApiResponse.error("Login failed: " + e.getMessage()));
        }
    }
}
