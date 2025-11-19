package com.jaysmentor.backend.service;

import com.jaysmentor.backend.model.ContactSubmission;
import com.jaysmentor.backend.repository.ContactSubmissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContactService {

    @Autowired
    private ContactSubmissionRepository repo;

    public ContactSubmission save(ContactSubmission submission) {
        return repo.save(submission);
    }

    public List<ContactSubmission> listAll() { return repo.findAll(); }

    public void delete(Long id) { repo.deleteById(id); }
}
