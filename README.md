# Backend API Documentation

## Overview
This backend provides authentication features, including **login, signup with email verification, and a custom forget password feature**. It is built using **Node.js, Express, and MongoDB**.

## Features
- **User Signup with Email Verification**
- **JWT-based Authentication**
- **Login with Email & Password**
- **Forgot Password with Email Reset Link**
- **Custom Email Templates for Verification & Password Reset**

## API Endpoints

### **1. User Signup**
**Endpoint:** `POST /api/auth/signup`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Response:**
```json
{
  "message": "Verification email sent. Please verify your email."
}
```

### **2. Email Verification**
**Endpoint:** `GET /api/auth/verify/:token`

**Response:**
```json
{
  "message": "Email verified successfully."
}
```

### **3. User Login**
**Endpoint:** `POST /api/auth/login`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass123!"
}
```

**Response:**
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "email": "john@example.com"
  }
}
```

### **4. Forgot Password**
**Endpoint:** `POST /api/auth/forgot-password`

**Request Body:**
```json
{
  "email": "john@example.com"
}
```

**Response:**
```json
{
  "message": "Password reset email sent."
}
```

### **5. Reset Password**
**Endpoint:** `POST /api/auth/reset-password/:token`

**Request Body:**
```json
{
  "newPassword": "NewSecurePass123!"
}
```

**Response:**
```json
{
  "message": "Password reset successful."
}
```

## Email Templates
### **Verification Email**
```
Subject: Verify Your Email

Hello {{name}},

Thank you for signing up. Please verify your email by clicking the link below:

{{verification_link}}

Best,
The Team
```

### **Password Reset Email**
```
Subject: Reset Your Password

Hello {{name}},

We received a request to reset your password. Click the link below to set a new password:

{{reset_link}}

If you did not request this, please ignore this email.

Best,
The Team
```

## Authentication Flow
1. User signs up and receives a **verification email**.
2. User clicks the **verification link** to activate their account.
3. User logs in with **email & password**.
4. If the user forgets the password, they request a **reset link**.
5. User resets their password and logs in again.

## Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT
- **Email Service:** Nodemailer

## License
This project is licensed under the MIT License.

