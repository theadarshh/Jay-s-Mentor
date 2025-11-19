package com.jaysmentor.backend.controller;

import com.jaysmentor.backend.model.Role;
import com.jaysmentor.backend.model.User;
import com.jaysmentor.backend.repository.UserRepository;
import com.jaysmentor.backend.service.CustomUserDetailsService;
import com.jaysmentor.backend.service.JwtService;
import com.jaysmentor.backend.service.VerificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private VerificationService verificationService;

    // Signup request DTO
    public static class SignupRequest {
        @NotBlank public String fullName;
        @NotBlank public String email;
        @NotBlank public String password;
        @NotBlank public String phone;
    }

    // Login request DTO
    public static class LoginRequest {
        @NotBlank public String identifier; // email or phone
        @NotBlank public String password;
    }

    // Verify OTP DTO
    public static class VerifyRequest {
        @NotBlank public String email;
        @NotBlank public String otp;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest req) {
        // check email/phone unique
        if (userRepository.findByEmail(req.email).isPresent()) {
            return ResponseEntity.badRequest().body("User with email already exists!");
        }
        if (userRepository.findByPhone(req.phone).isPresent()) {
            return ResponseEntity.badRequest().body("User with phone already exists!");
        }
        // create user with role USER, account not yet verified (we still save user, but verification needed)
        User user = new User(req.fullName, req.email, passwordEncoder.encode(req.password), req.phone, Role.USER);
        userRepository.save(user);

        // create verification token (OTP) and return it in response for testing (in prod send via SMS/email)
        String otp = verificationService.createTokenFor(req.email);
        // NOTE: we return OTP in response for dev convenience; in prod we would send by SMS/email.
        return ResponseEntity.ok("{\"message\": \"User registered. Verify OTP sent.\", \"otp\": \"" + otp + "\"}");
    }

    // Verify OTP (signup)
    @PostMapping("/verify-signup")
    public ResponseEntity<?> verifySignup(@Valid @RequestBody VerifyRequest req) {
        boolean ok = verificationService.verifyToken(req.otp, req.email);
        if (!ok) {
            return ResponseEntity.badRequest().body("Invalid or expired OTP");
        }
        // Optionally: mark user as verified — we don't have a field so just success
        return ResponseEntity.ok("✅ Signup verified");
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@Valid @RequestBody LoginRequest req) {
        // Determine whether identifier is email or phone
        String emailToAuth = null;
        if (req.identifier.contains("@")) {
            emailToAuth = req.identifier;
        } else {
            // treat as phone
            var opt = userRepository.findByPhone(req.identifier);
            if (opt.isEmpty()) {
                return ResponseEntity.status(401).body("❌ Invalid email/phone or password!");
            }
            emailToAuth = opt.get().getEmail();
        }

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(emailToAuth, req.password)
            );
        } catch (Exception e) {
            return ResponseEntity.status(401).body("❌ Invalid email/phone or password!");
        }

        final UserDetails userDetails = userDetailsService.loadUserByUsername(emailToAuth);
        final String jwt = jwtService.generateToken(userDetails);
        return ResponseEntity.ok("{\"token\": \"" + jwt + "\"}");
    }

    @GetMapping("/health")
    public ResponseEntity<String> healthCheck() {
        return ResponseEntity.ok("✅ Backend is running fine!");
    }
}
