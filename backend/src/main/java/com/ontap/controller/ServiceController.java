package com.ontap.controller;

import com.ontap.entity.ServiceEntity;
import com.ontap.repository.ServiceRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/services")
public class ServiceController {

    private final ServiceRepository serviceRepository;

    public ServiceController(ServiceRepository serviceRepository) {
        this.serviceRepository = serviceRepository;
    }

    @GetMapping
    public Map<String, Object> getServices() {
        List<ServiceEntity> services = serviceRepository.findAll();
        return Map.of("services", services);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ServiceEntity> getService(@PathVariable Long id) {
        return serviceRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> createService(@RequestBody ServiceEntity service) {
        ServiceEntity saved = serviceRepository.save(service);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Map.of("message", "Service created", "serviceId", saved.getId()));
    }
}
