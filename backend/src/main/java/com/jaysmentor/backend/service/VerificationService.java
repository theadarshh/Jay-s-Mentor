package com.jaysmentor.backend.service;

import com.jaysmentor.backend.model.VerificationToken;
import com.jaysmentor.backend.repository.VerificationTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
public class VerificationService {

    @Autowired
    private VerificationTokenRepository tokenRepository;

    // create token for username (email)
    public String createTokenFor(String username) {
        // delete previous tokens for username
        tokenRepository.deleteByUsername(username);

        String token = String.valueOf((int)(Math.random() * 900000) + 100000); // 6-digit OTP
        VerificationToken vt = new VerificationToken(token, username, LocalDateTime.now().plusMinutes(15));
        tokenRepository.save(vt);
        return token;
    }

    public boolean verifyToken(String token, String username) {
        Optional<VerificationToken> opt = tokenRepository.findByToken(token);
        if (opt.isEmpty()) return false;
        VerificationToken vt = opt.get();
        if (!vt.getUsername().equals(username)) return false;
        if (vt.getExpiryDate().isBefore(LocalDateTime.now())) return false;
        // success -> delete token
        tokenRepository.delete(vt);
        return true;
    }
}
