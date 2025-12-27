package com.jaysmentor.backend.payment;

import com.razorpay.*;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class RazorpayService {

 @Value("${razorpay.key}") private String key;
 @Value("${razorpay.secret}") private String secret;

 public JSONObject createOrder(int amount) throws Exception {
  RazorpayClient client=new RazorpayClient(key,secret);
  JSONObject o=new JSONObject();
  o.put("amount",amount);
  o.put("currency","INR");
  o.put("receipt","rcpt_"+System.currentTimeMillis());
  return client.orders.create(o).toJson();
 }
}