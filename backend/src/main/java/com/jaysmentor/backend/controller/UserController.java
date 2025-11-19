package com.jaysmentor.backend.controller;

import com.jaysmentor.backend.model.Role;
import com.jaysmentor.backend.model.User;
import com.jaysmentor.backend.repository.UserRepository;
import com.jaysmentor.backend.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserRepository userRepository;

    // returns current user by reading Authorization header Bearer <token>
    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(@RequestHeader("Authorization") String authHeader) {

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401).body("Missing token");
        }

        String token = authHeader.substring(7);
        String email = jwtService.extractEmail(token);

        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(404).body("User not found");
        }

        User user = userOpt.get();
        user.setPassword(null);

        if (user.getRole() == null) {
            user.setRole(Role.USER);
        }

        return ResponseEntity.ok(user);
    }

    // update profile (authenticated)
    @PostMapping("/update")
    public ResponseEntity<?> updateProfile(@RequestHeader("Authorization") String authHeader,
                                           @RequestBody User updated) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(401).body("Missing token");
        }
        String token = authHeader.substring(7);
        String email = jwtService.extractEmail(token);

        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isEmpty()) {
            return ResponseEntity.status(404).body("User not found");
        }

        User user = userOpt.get();
        // allow updating fullName and phone (phone must remain unique)
        if (updated.getFullName() != null) user.setFullName(updated.getFullName());
        if (updated.getPhone() != null && !updated.getPhone().equals(user.getPhone())) {
            if (userRepository.findByPhone(updated.getPhone()).isPresent()) {
                return ResponseEntity.badRequest().body("Phone already in use");
            }
            user.setPhone(updated.getPhone());
        }

        // optional: update password (if provided, encode)
        if (updated.getPassword() != null && !updated.getPassword().isBlank()) {
            // get encoder via bean (autowire here would be better) — using passwordEncoder bean requires injection
            // assume PasswordEncoder bean is available in Spring context; autowire it
        }

        userRepository.save(user);
        user.setPassword(null);
        return ResponseEntity.ok(user);
    }
}
