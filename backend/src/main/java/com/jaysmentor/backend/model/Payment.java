package com.jaysmentor.backend.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "payments")
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String razorpayOrderId;
    private String razorpayPaymentId;
    private String razorpaySignature;

    private String email;
    private Long amount; // smallest currency unit

    private String currency = "INR";
    private LocalDateTime createdAt = LocalDateTime.now();
    private boolean success = false;

    // getters/setters
    public Long getId(){ return id; }
    public void setId(Long id){ this.id = id; }

    public String getRazorpayOrderId(){ return razorpayOrderId; }
    public void setRazorpayOrderId(String razorpayOrderId){ this.razorpayOrderId = razorpayOrderId; }

    public String getRazorpayPaymentId(){ return razorpayPaymentId; }
    public void setRazorpayPaymentId(String razorpayPaymentId){ this.razorpayPaymentId = razorpayPaymentId; }

    public String getRazorpaySignature(){ return razorpaySignature; }
    public void setRazorpaySignature(String razorpaySignature){ this.razorpaySignature = razorpaySignature; }

    public String getEmail(){ return email; }
    public void setEmail(String email){ this.email = email; }

    public Long getAmount(){ return amount; }
    public void setAmount(Long amount){ this.amount = amount; }

    public String getCurrency(){ return currency; }
    public void setCurrency(String currency){ this.currency = currency; }

    public LocalDateTime getCreatedAt(){ return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt){ this.createdAt = createdAt; }

    public boolean isSuccess(){ return success; }
    public void setSuccess(boolean success){ this.success = success; }
}
