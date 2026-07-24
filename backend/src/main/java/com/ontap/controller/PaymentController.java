package com.ontap.controller;

import com.ontap.dto.ApiException;
import com.ontap.entity.Booking;
import com.ontap.entity.Payment;
import com.ontap.repository.BookingRepository;
import com.ontap.repository.PaymentRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    private final PaymentRepository paymentRepository;
    private final BookingRepository bookingRepository;

    public PaymentController(PaymentRepository paymentRepository, BookingRepository bookingRepository) {
        this.paymentRepository = paymentRepository;
        this.bookingRepository = bookingRepository;
    }

    /** Simulated payment processing (mirrors the original /api/payment/process route). */
    @PostMapping("/process")
    public ResponseEntity<Map<String, Object>> process(@RequestBody Payment payment) {
        if (payment.getUserId() == null || payment.getAmount() == null) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "User and amount are required");
        }
        payment.setTransactionId("TXN-" + UUID.randomUUID().toString().substring(0, 12).toUpperCase());
        payment.setStatus("success");
        Payment saved = paymentRepository.save(payment);

        // Mark the linked booking as confirmed once paid
        if (saved.getBookingId() != null) {
            bookingRepository.findById(saved.getBookingId()).ifPresent(b -> {
                b.setStatus("confirmed");
                bookingRepository.save(b);
            });
        }

        return ResponseEntity.ok(Map.of(
                "message", "Payment successful",
                "transactionId", saved.getTransactionId(),
                "status", saved.getStatus()));
    }
}
