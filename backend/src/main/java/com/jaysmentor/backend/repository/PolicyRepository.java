package com.jaysmentor.backend.repository;

import com.jaysmentor.backend.model.Policy;
import com.jaysmentor.backend.model.PolicyType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PolicyRepository extends JpaRepository<Policy, Long> {
    Optional<Policy> findByType(PolicyType type);
}
