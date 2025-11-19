package com.jaysmentor.backend.controller;

import com.jaysmentor.backend.model.FAQ;
import com.jaysmentor.backend.service.FAQService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/faqs")
@CrossOrigin(origins = "http://localhost:3000")
public class FAQController {

    @Autowired
    private FAQService service;

    @GetMapping
    public ResponseEntity<List<FAQ>> list() { return ResponseEntity.ok(service.listAll()); }

    @GetMapping("/{id}")
    public ResponseEntity<?> get(@PathVariable Long id) {
        return service.get(id).map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> create(@RequestBody FAQ f) { return ResponseEntity.ok(service.create(f)); }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody FAQ f) {
        return service.get(id).map(existing -> {
            existing.setQuestion(f.getQuestion());
            existing.setAnswer(f.getAnswer());
            existing.setPublished(f.isPublished());
            service.update(existing);
            return ResponseEntity.ok(existing);
        }).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        service.delete(id); return ResponseEntity.ok().build();
    }
}
