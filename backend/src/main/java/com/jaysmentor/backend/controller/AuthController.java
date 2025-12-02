package com.jaysmentor.backend.controller;

import com.jaysmentor.backend.model.User;
import com.jaysmentor.backend.model.Role;
import com.jaysmentor.backend.repository.UserRepository;
import com.jaysmentor.backend.service.VerificationService;
import com.jaysmentor.backend.service.impl.JwtServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.jaysmentor.backend.service.impl.PasswordResetService;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private com.jaysmentor.backend.service.impl.CustomUserDetailsService userDetailsService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtServiceImpl jwtService;

    @Autowired
    private VerificationService verificationService;

    @Autowired
    private PasswordResetService passwordResetService;

    public static class SignupRequest {
        @NotBlank public String fullName;
        @NotBlank @Email public String email;
        @NotBlank public String password;
        public String phone;
    }

    public static class LoginRequest {
        @NotBlank public String identifier; // email or phone
        @NotBlank public String password;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest req) {
        if (userRepository.findByEmail(req.email).isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("error","User with email already exists"));
        }
        if (req.phone != null && userRepository.findByPhone(req.phone).isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("error","User with phone already exists"));
        }

        User user = new User();
        user.setFullName(req.fullName);
        user.setEmail(req.email);
        user.setPassword(passwordEncoder.encode(req.password));
        user.setPhone(req.phone);
        user.setRole(Role.USER);
        user.setEnabled(false);

        userRepository.save(user);

        try {
            String otp = verificationService.createTokenFor(req.email);
            return ResponseEntity.ok(Map.of("message","User registered. Verify OTP sent.","otp", otp));
        } catch (Exception ex) {
            return ResponseEntity.internalServerError().body(
                    Map.of("error","Failed to send verification email", "details", ex.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@Valid @RequestBody LoginRequest req) {
        String emailToAuth;

        if (req.identifier.contains("@")) {
            emailToAuth = req.identifier;
        } else {
            var opt = userRepository.findByPhone(req.identifier);
            if (opt.isEmpty()) {
                return ResponseEntity.status(401).body(Map.of("error","Invalid email/phone or password"));
            }
            emailToAuth = opt.get().getEmail();
        }

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(emailToAuth, req.password));
        } catch (Exception ex) {
            return ResponseEntity.status(401).body(Map.of("error","Invalid email/phone or password"));
        }

        UserDetails userDetails = userDetailsService.loadUserByUsername(emailToAuth);
        String jwt = jwtService.generateToken(userDetails);
        return ResponseEntity.ok(Map.of("token", jwt));
    }

    @PostMapping("/forgot")
    public ResponseEntity<?> forgot(@RequestBody Map<String,String> body){
        String email = body.get("email");
        var user = userRepository.findByEmail(email).orElse(null);
        if(user == null) return ResponseEntity.badRequest().body(Map.of("error","No user with that email"));

        String otp = passwordResetService.createResetOtp(email);
        return ResponseEntity.ok(Map.of("message","OTP sent for reset","otp",otp));
    }

    @PostMapping("/forgot/verify")
    public ResponseEntity<?> verifyForgot(@RequestBody Map<String,String> body){
        boolean ok = passwordResetService.verifyOtp(body.get("email"), body.get("otp"));
        if(!ok) return ResponseEntity.badRequest().body(Map.of("error","Invalid OTP"));
        return ResponseEntity.ok(Map.of("message","OTP verified"));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String,String> body){
        String email = body.get("email");
        String newPass = body.get("password");
        var user = userRepository.findByEmail(email).orElse(null);
        if(user == null) return ResponseEntity.badRequest().body(Map.of("error","User not found"));

        user.setPassword(passwordEncoder.encode(newPass));
        userRepository.save(user);
        return ResponseEntity.ok(Map.of("message","Password updated"));
    }

    // FIXED: ADDED MAPPING FOR HEALTH ENDPOINT
    @GetMapping("/health")
    public ResponseEntity<?> health() {
        return ResponseEntity.ok(Map.of("status","ok"));
    }
}
