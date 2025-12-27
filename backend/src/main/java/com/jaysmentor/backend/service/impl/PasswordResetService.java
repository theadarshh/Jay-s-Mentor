package com.jaysmentor.backend.service.impl;

import com.jaysmentor.backend.model.PasswordResetToken;
import com.jaysmentor.backend.model.User;
import com.jaysmentor.backend.repository.PasswordResetTokenRepository;
import com.jaysmentor.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Random;

@Service
public class PasswordResetService {

    @Autowired
    private PasswordResetTokenRepository repo;

    @Autowired
    private UserRepository users;

    private static final int OTP_EXPIRY_MINUTES = 10;
    private static final int MAX_REQUESTS_PER_HOUR = 5;

    public String createResetOtp(String email) {
        User u = users.findByEmail(email).orElse(null);
        if (u == null) return null;

        LocalDateTime oneHourAgo = LocalDateTime.now().minusHours(1);
        long recentCount = repo.countByEmailAndCreatedAtAfter(email, oneHourAgo);
        if (recentCount >= MAX_REQUESTS_PER_HOUR) {
            return null;
        }

        String otp = String.format("%06d", new Random().nextInt(1_000_000));
        PasswordResetToken t = new PasswordResetToken();
        t.setEmail(email);
        t.setToken(otp);
        t.setCreatedAt(LocalDateTime.now());
        t.setExpiresAt(LocalDateTime.now().plusMinutes(OTP_EXPIRY_MINUTES));
        t.setUsed(false);
        repo.save(t);
        return otp;
    }

    public boolean verifyOtp(String email, String otp) {
        var t = repo.findByEmailAndToken(email, otp).orElse(null);
        if (t == null || t.isUsed()) return false;
        if (t.getExpiresAt().isBefore(LocalDateTime.now())) return false;
        t.setUsed(true);
        repo.save(t);
        return true;
    }
}
