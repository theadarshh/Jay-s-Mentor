package com.jaysmentor.backend.service;

public interface EmailService {
    void sendVerificationEmail(String toEmail, String token) throws Exception;
}