package com.ontap.controller;

import com.ontap.repository.BookingRepository;
import com.ontap.repository.ServiceRepository;
import com.ontap.repository.SupportTicketRepository;
import com.ontap.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final UserRepository userRepository;
    private final ServiceRepository serviceRepository;
    private final BookingRepository bookingRepository;
    private final SupportTicketRepository ticketRepository;

    public AdminController(UserRepository userRepository,
                           ServiceRepository serviceRepository,
                           BookingRepository bookingRepository,
                           SupportTicketRepository ticketRepository) {
        this.userRepository = userRepository;
        this.serviceRepository = serviceRepository;
        this.bookingRepository = bookingRepository;
        this.ticketRepository = ticketRepository;
    }

    @GetMapping("/stats")
    public Map<String, Object> stats() {
        long customers = userRepository.findByUserType("customer").size();
        long providers = userRepository.findByUserType("provider").size();
        return Map.of(
                "totalUsers", userRepository.count(),
                "customers", customers,
                "providers", providers,
                "totalServices", serviceRepository.count(),
                "totalBookings", bookingRepository.count(),
                "openTickets", ticketRepository.count());
    }

    @GetMapping("/users")
    public Map<String, Object> users() {
        return Map.of("users", userRepository.findAll());
    }

    @GetMapping("/bookings")
    public Map<String, Object> bookings() {
        return Map.of("bookings", bookingRepository.findAllByOrderByCreatedAtDesc());
    }
}
