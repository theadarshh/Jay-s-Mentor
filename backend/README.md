JAYS MENTOR backend scaffold

Next steps after running the script:
1) Edit src/main/resources/application.properties if you need to adjust DB/SMPP/JWT.
   - Ensure correct MySQL username/password and URL
   - Replace spring.mail.* with working SMTP values (or use a local mail dev server)
   - Ensure jwt.secret is secure (>= 32 chars)

2) Build & run:
   cd C:\Users\admin\Desktop\Jay-s-Mentor\backend
   mvn clean install
   mvn spring-boot:run

Endpoints:
- POST /api/auth/signup   { fullName, email, password, phone? } -> registers (enabled=false) and sends OTP
- POST /api/verify/confirm { email, otp } -> verifies account and enables user
- POST /api/auth/login    { identifier(email|phone), password } -> returns JWT
- GET  /api/auth/health   -> simple health check

Important: OTP is returned in responses for development. Remove before production.