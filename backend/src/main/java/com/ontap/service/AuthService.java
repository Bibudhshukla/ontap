package com.ontap.service;

import com.ontap.dto.ApiException;
import com.ontap.dto.AuthDtos.LoginRequest;
import com.ontap.dto.AuthDtos.RegisterRequest;
import com.ontap.entity.User;
import com.ontap.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User register(RegisterRequest req) {
        if (req.name == null || req.email == null || req.password == null
                || req.phone == null || req.userType == null) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "Missing required fields");
        }
        if (userRepository.existsByEmail(req.email)) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "Email already registered");
        }
        User user = new User();
        user.setName(req.name);
        user.setEmail(req.email);
        user.setPassword(req.password);
        user.setPhone(req.phone);
        user.setUserType(req.userType);
        return userRepository.save(user);
    }

    public User login(LoginRequest req) {
        if (req.email == null || req.password == null) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "Email and password required");
        }
        User user = userRepository.findByEmailAndPassword(req.email, req.password)
                .orElseThrow(() -> new ApiException(HttpStatus.UNAUTHORIZED, "Invalid credentials"));

        if (req.userType != null && !req.userType.equals(user.getUserType())) {
            throw new ApiException(HttpStatus.UNAUTHORIZED,
                    "This email is registered as a " + user.getUserType());
        }
        return user;
    }
}
