package com.jaysmentor.backend.service;

import com.jaysmentor.backend.model.Program;
import com.jaysmentor.backend.repository.ProgramRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProgramService {

    @Autowired
    private ProgramRepository repo;

    public List<Program> listAll() { return repo.findAll(); }
    public List<Program> listPublished() { return repo.findByPublishedTrue(); }
    public Optional<Program> findById(Long id) { return repo.findById(id); }
    public Program save(Program p) { return repo.save(p); }
    public void delete(Long id) { repo.deleteById(id); }
}
