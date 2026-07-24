package com.ontap.controller;

import com.ontap.dto.AuthDtos.LoginRequest;
import com.ontap.dto.AuthDtos.RegisterRequest;
import com.ontap.entity.User;
import com.ontap.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(@RequestBody RegisterRequest req) {
        User user = authService.register(req);
        Map<String, Object> body = new HashMap<>();
        body.put("message", "Registration successful");
        body.put("userId", user.getId());
        return ResponseEntity.status(HttpStatus.CREATED).body(body);
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody LoginRequest req) {
        User user = authService.login(req);
        Map<String, Object> safeUser = new HashMap<>();
        safeUser.put("id", user.getId());
        safeUser.put("name", user.getName());
        safeUser.put("email", user.getEmail());
        safeUser.put("phone", user.getPhone());
        safeUser.put("user_type", user.getUserType());

        Map<String, Object> body = new HashMap<>();
        body.put("message", "Login successful");
        body.put("user", safeUser);
        return ResponseEntity.ok(body);
    }
}
