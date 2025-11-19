package com.jaysmentor.backend.controller;

import com.jaysmentor.backend.model.Program;
import com.jaysmentor.backend.service.ProgramService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/programs")
@CrossOrigin(origins = "*")
public class ProgramController {

    @Autowired
    private ProgramService service;

    // PUBLIC — list published programs
    @GetMapping("/public")
    public ResponseEntity<List<Program>> listPublished() {
        return ResponseEntity.ok(service.listPublished());
    }

    // PUBLIC — get single program
    @GetMapping("/public/{id}")
    public ResponseEntity<?> getProgram(@PathVariable Long id) {
        return service.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ADMIN — list all
    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Program>> listAll() {
        return ResponseEntity.ok(service.listAll());
    }

    // ADMIN — create/update
    @PostMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Program> saveProgram(@RequestBody Program program) {
        return ResponseEntity.ok(service.save(program));
    }

    // ADMIN — delete
    @DeleteMapping("/admin/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteProgram(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.ok().build();
    }
}
