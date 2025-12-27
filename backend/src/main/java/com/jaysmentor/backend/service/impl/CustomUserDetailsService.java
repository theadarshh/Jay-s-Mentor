package com.jaysmentor.backend.service.impl;

import com.jaysmentor.backend.model.User;
import com.jaysmentor.backend.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        // 🔒 BLOCK LOGIN IF OTP NOT VERIFIED
        if (!user.isEnabled()) {
            throw new UsernameNotFoundException("Email not verified");
        }

        // 🔒 BLOCK LOGIN IF PAYMENT NOT DONE
        if (user.getSubscriptionStatus() != User.SubscriptionStatus.PAID) {
            throw new UsernameNotFoundException("Subscription not active");
        }

        return org.springframework.security.core.userdetails.User
                .withUsername(user.getEmail())
                .password(user.getPassword())
                .authorities("ROLE_" + user.getRole().name())
                .accountExpired(false)
                .accountLocked(false)
                .credentialsExpired(false)
                .disabled(false)
                .build();
    }
}