package com.jaysmentor.backend.controller;

import com.jaysmentor.backend.model.ContactSubmission;
import com.jaysmentor.backend.model.Program;
import com.jaysmentor.backend.service.ContactService;
import com.jaysmentor.backend.service.ProgramService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    @Autowired
    private ContactService contactService;

    @Autowired
    private ProgramService programService;

    // ---------------------------
    // CONTACT SUBMISSIONS
    // ---------------------------
    @GetMapping("/contacts")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<ContactSubmission>> listContacts() {
        List<ContactSubmission> contacts = contactService.listAll();
        return ResponseEntity.ok(contacts);
    }

    // ---------------------------
    // PROGRAMS LIST
    // ---------------------------
    @GetMapping("/programs")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<Program>> getPrograms() {
        return ResponseEntity.ok(programService.listAll());
    }

    // ---------------------------
    // DELETE PROGRAM
    // ---------------------------
    @DeleteMapping("/programs/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> deleteProgram(@PathVariable Long id) {
        programService.delete(id);
        return ResponseEntity.ok().build();
    }
}
