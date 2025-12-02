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

    public String createResetOtp(String email){
        User u = users.findByEmail(email).orElse(null);
        if(u == null) return null;

        String otp = String.format("%06d", new Random().nextInt(1_000_000));
        PasswordResetToken t = new PasswordResetToken();
        t.setEmail(email);
        t.setToken(otp);
        t.setExpiresAt(LocalDateTime.now().plusMinutes(10));
        t.setUsed(false);
        repo.save(t);
        return otp;
    }

    public boolean verifyOtp(String email, String otp){
        var t = repo.findByEmailAndToken(email, otp).orElse(null);
        if(t == null || t.isUsed()) return false;
        if(t.getExpiresAt().isBefore(LocalDateTime.now())) return false;
        t.setUsed(true);
        repo.save(t);
        return true;
    }
}