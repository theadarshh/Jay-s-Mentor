package com.jaysmentor.backend.service;

import com.jaysmentor.backend.model.FAQ;
import com.jaysmentor.backend.repository.FAQRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FAQService {
    @Autowired
    private FAQRepository repo;
    public List<FAQ> listAll() { return repo.findAll(); }
    public Optional<FAQ> get(Long id) { return repo.findById(id); }
    public FAQ create(FAQ f) { return repo.save(f); }
    public FAQ update(FAQ f) { return repo.save(f); }
    public void delete(Long id) { repo.deleteById(id); }
}
