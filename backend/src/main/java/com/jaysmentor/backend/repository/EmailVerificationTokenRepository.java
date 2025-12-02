package com.jaysmentor.backend.repository;

import com.jaysmentor.backend.model.EmailVerificationToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface EmailVerificationTokenRepository extends JpaRepository<EmailVerificationToken, Long> {
    Optional<EmailVerificationToken> findByTokenAndEmail(String token, String email);
    Optional<EmailVerificationToken> findTopByEmailOrderByCreatedAtDesc(String email);
}