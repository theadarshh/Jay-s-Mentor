package com.jaysmentor.backend.service;

public interface VerificationService {
    String createTokenFor(String email) throws Exception;
    boolean verifyToken(String token, String email);
}