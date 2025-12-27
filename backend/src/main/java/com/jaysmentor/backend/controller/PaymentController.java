package com.jaysmentor.backend.controller;

import com.jaysmentor.backend.dto.PaymentRequest;
import com.jaysmentor.backend.payment.RazorpayService;
import org.springframework.web.bind.annotation.*;
import org.json.JSONObject;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

 private final RazorpayService service;
 public PaymentController(RazorpayService s){this.service=s;}

 @PostMapping("/order")
 public String create(@RequestBody PaymentRequest req) throws Exception {
  JSONObject o=service.createOrder(req.amount);
  return o.toString();
 }
}