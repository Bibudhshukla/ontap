package com.ontap.dto;

import org.springframework.http.HttpStatus;

/** Thrown by service methods to signal a specific HTTP status + message to the client. */
public class ApiException extends RuntimeException {

    private final HttpStatus status;

    public ApiException(HttpStatus status, String message) {
        super(message);
        this.status = status;
    }

    public HttpStatus getStatus() {
        return status;
    }
}
