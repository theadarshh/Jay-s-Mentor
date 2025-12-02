package com.jaysmentor.backend.service.impl;

import com.jaysmentor.backend.model.EmailVerificationToken;
import com.jaysmentor.backend.model.User;
import com.jaysmentor.backend.repository.EmailVerificationTokenRepository;
import com.jaysmentor.backend.repository.UserRepository;
import com.jaysmentor.backend.service.EmailService;
import com.jaysmentor.backend.service.VerificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

@Service
public class VerificationServiceImpl implements VerificationService {

    @Autowired
    private EmailVerificationTokenRepository tokenRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private UserRepository userRepository;

    private static final int EXPIRY_MINUTES = 15;

    @Override
    public String createTokenFor(String email) throws Exception {
        String otp = String.format("%06d", new Random().nextInt(1_000_000));
        EmailVerificationToken token = new EmailVerificationToken();
        token.setToken(otp);
        token.setEmail(email);
        token.setCreatedAt(LocalDateTime.now());
        token.setExpiresAt(LocalDateTime.now().plusMinutes(EXPIRY_MINUTES));
        token.setUsed(false);

        tokenRepository.save(token);

        // send email (may throw if mail not configured)
        emailService.sendVerificationEmail(email, otp);

        return otp;
    }

    @Override
    public boolean verifyToken(String tokenStr, String email) {
        Optional<EmailVerificationToken> opt = tokenRepository.findByTokenAndEmail(tokenStr, email);
        if (opt.isEmpty()) return false;
        EmailVerificationToken t = opt.get();
        if (t.isUsed()) return false;
        if (t.getExpiresAt() == null || t.getExpiresAt().isBefore(LocalDateTime.now())) return false;

        t.setUsed(true);
        tokenRepository.save(t);

        Optional<User> u = userRepository.findByEmail(email);
        u.ifPresent(user -> {
            user.setEnabled(true);
            userRepository.save(user);
        });

        return true;
    }
}