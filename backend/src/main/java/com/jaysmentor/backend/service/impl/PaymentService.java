package com.jaysmentor.backend.service.impl;

import com.jaysmentor.backend.model.Payment;
import com.jaysmentor.backend.model.User;
import com.jaysmentor.backend.repository.PaymentRepository;
import com.jaysmentor.backend.repository.UserRepository;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final UserRepository userRepository;
    private final boolean mock;

    private RazorpayClient client;
    private final String key;
    private final String secret;

    public PaymentService(PaymentRepository paymentRepository,
                          UserRepository userRepository,
                          @Value("${payment.mock:true}") boolean mock,
                          @Value("${razorpay.key:}") String key,
                          @Value("${razorpay.secret:}") String secret) throws Exception {
        this.paymentRepository = paymentRepository;
        this.userRepository = userRepository;
        this.mock = mock;
        this.key = key;
        this.secret = secret;

        if (!mock) {
            this.client = new RazorpayClient(key, secret);
        }
    }

    // Create an order (Razorpay) or return a mock order object
    public JSONObject createOrder(String email, long amountPaise) throws Exception {

        // MOCK MODE (no real payment, useful for development)
        if (mock) {
            JSONObject mockOrder = new JSONObject();
            mockOrder.put("id", "mock_order_" + System.currentTimeMillis());
            mockOrder.put("amount", amountPaise);
            mockOrder.put("currency", "INR");
            mockOrder.put("status", "created");

            Payment p = new Payment();
            p.setRazorpayOrderId(mockOrder.getString("id"));
            p.setEmail(email);
            p.setAmount(amountPaise);
            p.setSuccess(false);
            paymentRepository.save(p);

            return mockOrder;
        }

        // REAL Razorpay order creation
        JSONObject orderRequest = new JSONObject();
        orderRequest.put("amount", amountPaise);
        orderRequest.put("currency", "INR");
        orderRequest.put("receipt", "rcpt_" + System.currentTimeMillis());
        orderRequest.put("payment_capture", 1);

        // FIXED syntax → correct Razorpay SDK usage
        Order order = client.orders.create(orderRequest);

        // Save payment row
        Payment p = new Payment();
        p.setRazorpayOrderId(order.get("id"));
        p.setEmail(email);
        p.setAmount(order.get("amount"));
        p.setSuccess(false);
        paymentRepository.save(p);

        return new JSONObject(order.toString());
    }

    // Confirm payment after frontend posts paymentId + signature
    public boolean confirmPayment(String orderId, String paymentId, String signature) {

        Optional<Payment> opt = paymentRepository.findByRazorpayOrderId(orderId);
        if (opt.isEmpty()) return false;

        Payment p = opt.get();
        p.setRazorpayPaymentId(paymentId);
        p.setRazorpaySignature(signature);
        p.setSuccess(true);
        paymentRepository.save(p);

        // Update user subscription
        Optional<User> uOpt = userRepository.findByEmail(p.getEmail());
        uOpt.ifPresent(user -> {
            user.setSubscriptionStatus(User.SubscriptionStatus.PAID);
            user.setPaymentId(paymentId);
            user.setPaymentAmount(p.getAmount());
            userRepository.save(user);
        });

        return true;
    }
}
