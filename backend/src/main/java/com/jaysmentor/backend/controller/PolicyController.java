package com.jaysmentor.backend.controller;

import com.jaysmentor.backend.model.Policy;
import com.jaysmentor.backend.model.PolicyType;
import com.jaysmentor.backend.service.PolicyService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/policies")
@CrossOrigin(origins = "*")
public class PolicyController {

    @Autowired
    private PolicyService policyService;

    // PUBLIC — get policy by type
    @GetMapping("/{type}")
    public ResponseEntity<?> getPolicy(@PathVariable String type) {

        PolicyType policyType;
        try {
            policyType = PolicyType.valueOf(type.toUpperCase());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Invalid policy type");
        }

        return policyService.getPolicy(policyType)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ADMIN — update/create policy
    @PostMapping("/{type}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> savePolicy(
            @PathVariable String type,
            @RequestBody Policy policy
    ) {
        PolicyType policyType;
        try {
            policyType = PolicyType.valueOf(type.toUpperCase());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Invalid policy type");
        }

        policy.setType(policyType);
        return ResponseEntity.ok(policyService.savePolicy(policy));
    }
}
