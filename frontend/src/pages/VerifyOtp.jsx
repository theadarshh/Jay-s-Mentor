import React, { useState, useEffect } from "react";
import axios from "axios";

const VerifyOtp = () => {
  const [email] = useState(localStorage.getItem("signup_email") || "");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [resendTimer, setResendTimer] = useState(30);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  useEffect(() => {
    if (!email) {
      setMessage("Email is required");
      return;
    }
    if (resendTimer > 0) {
      const t = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(t);
    }
  }, [resendTimer, email]);

  const handleVerify = async () => {
    setLoading(true);
    try {
      await axios.post("http://localhost:8080/api/verify/confirm", { email, otp });
      setMessage("Verification successful! Redirecting...");
      setTimeout(() => {
        localStorage.removeItem("signup_email");
        window.location.href = "/login";
      }, 1500);
    } catch (err) {
      setMessage(err.response?.data?.error || "Invalid OTP");
    }
    setLoading(false);
  };

  const handleResendOtp = async () => {
    if (resendTimer > 0) return;
    setResendLoading(true);
    try {
      await axios.post("http://localhost:8080/api/verify/resend", { email });
      setMessage("OTP resent!");
      setResendTimer(30);
    } catch (err) {
      setMessage(err.response?.data?.error || "Failed to resend OTP");
    }
    setResendLoading(false);
  };

  return (
    <div style={{ maxWidth: 400, margin: "40px auto", textAlign: "center" }}>
      <h2>Email Verification</h2>
      <p>{email}</p>

      <input value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Enter OTP" />
      <button onClick={handleVerify} disabled={loading}>
        {loading ? "Verifying..." : "Verify OTP"}
      </button>

      {resendTimer > 0 ? (
        <p>Resend OTP in {resendTimer}s</p>
      ) : (
        <button onClick={handleResendOtp} disabled={resendLoading}>Resend OTP</button>
      )}

      {message && <p style={{ color: "red" }}>{message}</p>}
    </div>
  );
};

export default VerifyOtp;
