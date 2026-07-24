package com.ontap.dto;

/** Request payloads for authentication endpoints. */
public class AuthDtos {

    public static class RegisterRequest {
        public String name;
        public String email;
        public String password;
        public String phone;
        public String userType;
    }

    public static class LoginRequest {
        public String email;
        public String password;
        public String userType;
    }
}
