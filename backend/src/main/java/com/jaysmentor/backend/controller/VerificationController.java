package com.jaysmentor.backend.controller;

import com.jaysmentor.backend.service.VerificationService;
import com.jaysmentor.backend.repository.UserRepository;
import com.jaysmentor.backend.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

import java.util.Map;

@RestController
@RequestMapping("/api/verify")
@CrossOrigin(origins = "http://localhost:3000")
public class VerificationController {

    @Autowired
    private VerificationService verificationService;

    @Autowired
    private UserRepository userRepository;

    public static class SendRequest {
        @NotBlank @Email public String email;
    }

    public static class ConfirmRequest {
        @NotBlank public String email;
        @NotBlank public String otp;
    }

    @PostMapping("/send")
    public ResponseEntity<?> sendVerification(@Valid @RequestBody SendRequest req) {
        var user = userRepository.findByEmail(req.email).orElse(null);
        if (user == null) return ResponseEntity.badRequest().body(Map.of("error","No user with that email"));
        if (user.isEnabled()) return ResponseEntity.badRequest().body(Map.of("error","User already verified"));
        try {
            String otp = verificationService.createTokenFor(req.email);
            return ResponseEntity.ok(Map.of("message","OTP sent","otp", otp));
        } catch (Exception ex) {
            return ResponseEntity.internalServerError().body(Map.of("error","Failed to send email", "details", ex.getMessage()));
        }
    }

    @PostMapping("/confirm")
    public ResponseEntity<?> confirmVerification(@Valid @RequestBody ConfirmRequest req) {
        boolean ok = verificationService.verifyToken(req.otp, req.email);
        if (!ok) return ResponseEntity.badRequest().body(Map.of("error","Invalid or expired OTP"));
        return ResponseEntity.ok(Map.of("message","Email verified"));
    }
}