package com.ontap.controller;

import com.ontap.dto.ApiException;
import com.ontap.entity.SupportTicket;
import com.ontap.repository.SupportTicketRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/support")
public class SupportController {

    private final SupportTicketRepository ticketRepository;

    public SupportController(SupportTicketRepository ticketRepository) {
        this.ticketRepository = ticketRepository;
    }

    @GetMapping("/tickets")
    public Map<String, Object> getTickets() {
        List<SupportTicket> tickets = ticketRepository.findAllByOrderByCreatedAtDesc();
        return Map.of("tickets", tickets);
    }

    @PostMapping("/tickets")
    public ResponseEntity<Map<String, Object>> createTicket(@RequestBody SupportTicket ticket) {
        if (ticket.getSubject() == null || ticket.getSubject().isBlank()) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "Subject is required");
        }
        SupportTicket saved = ticketRepository.save(ticket);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Map.of("message", "Ticket created", "ticketId", saved.getId()));
    }
}
