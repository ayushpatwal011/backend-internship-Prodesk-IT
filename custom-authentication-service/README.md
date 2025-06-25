# 🔐 Custom Authentication Service (Node.js + MongoDB + OAuth2 + JWT + 2FA)

A full-featured authentication system with:
- ✅ JWT-based authentication
- ✅ OTP-based Two-Factor Authentication (2FA)
- ✅ Google OAuth2 login
- ✅ Role-based access
- ✅ Nodemailer for OTP email
- ✅ Frontend served from backend (HTML/CSS/JS)

---
## 📁 Project Structure
custom-auth-service/
├── config/ # DB and Google OAuth config
├── controllers/ # Register, Login, OTP logic
├── models/ # User Schema
├── public/ # Frontend HTML/CSS/JS
├── routes/ # Auth Routes and Procted Routes
├── utils/ # JWT, OTP helpers
├── .env # Environment variables
├── index.js # Main Entry File
├── README.md

✨ Features
🔐 1. User Registration
POST /auth/register
→ name, email, password

🔑 2. Login with Email/Password
POST /auth/login
→ Sends OTP to email

📲 3. OTP Verification (2FA)
POST /auth/verify
→ Verifies OTP, returns JWT

🌐 4. Google Login
GET /auth/google
→ Google OAuth2 login
GET /auth/google/callback
→ Handles Google callback and user creation

