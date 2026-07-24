package com.ontap.controller;

import com.ontap.dto.ApiException;
import com.ontap.entity.Booking;
import com.ontap.repository.BookingRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    private final BookingRepository bookingRepository;

    public BookingController(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    @GetMapping
    public Map<String, Object> getBookings(
            @RequestParam(required = false) Long customerId,
            @RequestParam(required = false) Long providerId) {
        List<Booking> bookings;
        if (customerId != null) {
            bookings = bookingRepository.findByCustomerIdOrderByCreatedAtDesc(customerId);
        } else if (providerId != null) {
            bookings = bookingRepository.findByProviderIdOrderByCreatedAtDesc(providerId);
        } else {
            bookings = bookingRepository.findAllByOrderByCreatedAtDesc();
        }
        return Map.of("bookings", bookings);
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> createBooking(@RequestBody Booking booking) {
        if (booking.getServiceId() == null || booking.getCustomerId() == null
                || booking.getBookingDate() == null) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "Missing required fields");
        }
        if (booking.getStatus() == null) booking.setStatus("pending");
        Booking saved = bookingRepository.save(booking);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Map.of("message", "Booking created", "bookingId", saved.getId()));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Map<String, Object>> updateStatus(
            @PathVariable Long id, @RequestBody Map<String, String> body) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Booking not found"));
        String status = body.get("status");
        if (status == null) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "Status required");
        }
        booking.setStatus(status);
        bookingRepository.save(booking);
        return ResponseEntity.ok(Map.of("message", "Booking updated", "status", status));
    }
}
