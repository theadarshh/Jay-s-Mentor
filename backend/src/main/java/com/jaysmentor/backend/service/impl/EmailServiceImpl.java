package com.jaysmentor.backend.service.impl;

import com.jaysmentor.backend.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImpl implements EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Override
    public void sendVerificationEmail(String toEmail, String token) throws Exception {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Your verification code - JAYS MENTOR");
        String body = "Your verification code is: " + token + "\\nThis code will expire in 15 minutes.";
        message.setText(body);
        mailSender.send(message);
    }
}