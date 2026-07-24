package com.ontap.controller;

import com.ontap.dto.ApiException;
import com.ontap.entity.Rating;
import com.ontap.repository.RatingRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/ratings")
public class RatingController {

    private final RatingRepository ratingRepository;

    public RatingController(RatingRepository ratingRepository) {
        this.ratingRepository = ratingRepository;
    }

    @GetMapping
    public Map<String, Object> getRatings(@RequestParam(required = false) Long providerId) {
        List<Rating> ratings = providerId != null
                ? ratingRepository.findByProviderId(providerId)
                : ratingRepository.findAll();
        return Map.of("ratings", ratings);
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> submitRating(@RequestBody Rating rating) {
        if (rating.getBookingId() == null || rating.getRating() == null) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "Booking and rating are required");
        }
        if (rating.getRating() < 1 || rating.getRating() > 5) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "Rating must be between 1 and 5");
        }
        Rating saved = ratingRepository.save(rating);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Map.of("message", "Rating submitted", "ratingId", saved.getId()));
    }
}
