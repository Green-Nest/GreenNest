package com.greennest.backend.service;

import com.greennest.backend.dto.request.RegisterRequest;
import com.greennest.backend.entity.User;
import java.util.List;
import java.util.Optional;

public interface UserService {
    
    User createUser(RegisterRequest registerRequest);
    Optional<User> findByEmail(String email);
    List<User> findAllActiveUsers();
    User updateUser(Long id, User user);
    void deleteUser(Long id);
    boolean existsByEmail(String email);
    List<User> findUsersByRole(User.Role role);
}
