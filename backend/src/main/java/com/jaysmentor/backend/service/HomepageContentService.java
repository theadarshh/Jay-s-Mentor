package com.jaysmentor.backend.service;

import com.jaysmentor.backend.model.HomepageContent;
import com.jaysmentor.backend.repository.HomepageContentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HomepageContentService {

    @Autowired
    private HomepageContentRepository repository;

    // Return single homepage record
    public HomepageContent getHomepageContent() {
        return repository.findAll()
                .stream()
                .findFirst()
                .orElse(null);
    }

    // Create or update homepage content
    public HomepageContent saveHomepageContent(HomepageContent content) {
        // always store one record only
        repository.deleteAll();
        return repository.save(content);
    }
}
