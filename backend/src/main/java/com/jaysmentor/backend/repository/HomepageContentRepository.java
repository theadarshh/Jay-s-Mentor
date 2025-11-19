package com.jaysmentor.backend.repository;

import com.jaysmentor.backend.model.HomepageContent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HomepageContentRepository extends JpaRepository<HomepageContent, Long> {
    // helper to get the single record (optional)
}
