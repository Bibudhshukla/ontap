package com.ontap.repository;

import com.ontap.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findByCustomerIdOrderByCreatedAtDesc(Long customerId);
    List<Booking> findByProviderIdOrderByCreatedAtDesc(Long providerId);
    List<Booking> findAllByOrderByCreatedAtDesc();
}
