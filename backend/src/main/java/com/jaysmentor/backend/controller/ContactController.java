package com.jaysmentor.backend.controller;

import com.jaysmentor.backend.model.ContactSubmission;
import com.jaysmentor.backend.service.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "*")
public class ContactController {

    @Autowired
    private ContactService service;

    // PUBLIC — submit contact form
    @PostMapping("/submit")
    public ResponseEntity<?> submit(@Valid @RequestBody ContactSubmission submission) {
        ContactSubmission saved = service.save(submission);
        return ResponseEntity.ok(saved);
    }

    // ADMIN — list all submissions
    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<ContactSubmission>> listAll() {
        return ResponseEntity.ok(service.listAll());
    }

    // ADMIN — delete submission
    @DeleteMapping("/admin/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok().build();
    }
}
