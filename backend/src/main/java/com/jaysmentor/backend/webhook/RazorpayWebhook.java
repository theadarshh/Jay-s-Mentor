package com.jaysmentor.backend.webhook;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/webhook")
public class RazorpayWebhook {

 @PostMapping("/razorpay")
 public String success(@RequestBody String payload){
  // VERIFY SIGNATURE HERE (PROD)
  // IF VERIFIED:
  // 1) CREATE USER
  // 2) SET subscription=PAID
  // 3) UNLOCK DASHBOARD + WHATSAPP
  return "OK";
 }
}