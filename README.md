# Intelligent Doc Platform

An AI-powered SaaS platform that allows users to:

* Create accounts securely
* Login using JWT Authentication
* Upload PDF documents
* Ask questions from uploaded PDFs using AI
* Receive summarized and contextual answers
* Manage uploaded documents through a clean UI

---

# Tech Stack

## Frontend

* React.js
* Vite
* Tailwind CSS
* Axios

## Backend

* FastAPI
* Python
* SQLAlchemy
* JWT Authentication
* Groq API

## Database

* SQLite (Development)

---

# Features

## Authentication System

* User Signup
* User Login
* JWT Token Generation
* Protected Routes
* Secure Password Hashing

## AI PDF System

* Upload PDFs
* Extract PDF text
* Store uploaded documents
* Ask AI questions from PDFs
* AI-generated contextual answers
* Source context display

## UI Features

* Modern dark themed dashboard
* Responsive layout
* AI chat style interface
* Upload panel
* Document history panel
* Authentication flow

---

# Project Structure

```bash
intelligent-doc-platform/
│
├── app/
│   ├── core/
│   │   └── config.py
│   │
│   ├── database/
│   │   └── db.py
│   │
│   ├── models/
│   │   └── user_model.py
│   │
│   ├── routes/
│   │   ├── auth_routes.py
│   │   ├── upload_routes.py
│   │   └── ask_routes.py
│   │
│   ├── schemas/
│   │   └── user_schema.py
│   │
│   ├── services/
│   │   ├── pdf_service.py
│   │   └── ai_service.py
│   │
│   └── main.py
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Signup.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Upload.jsx
│   │   │   ├── Ask.jsx
│   │   │   └── Documents.jsx
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── requirements.txt
├── railway.json
├── .gitignore
└── README.md
```

---

# Installation Guide

## 1. Clone Repository

```bash
git clone https://github.com/your-username/intelligent-doc-platform.git
```

```bash
cd intelligent-doc-platform
```

---

# Backend Setup

## 2. Create Virtual Environment

Mac/Linux:

```bash
python3 -m venv venv
```

Activate Environment:

```bash
source venv/bin/activate
```

Windows:

```bash
venv\Scripts\activate
```

---

## 3. Install Dependencies

```bash
pip install -r requirements.txt
```

---

## 4. Create Environment Variables

Create a `.env` file:

```env
GROQ_API_KEY=your_groq_api_key
SECRET_KEY=your_secret_key
ALGORITHM=HS256
```

---

## 5. Run Backend

```bash
uvicorn app.main:app --reload
```

Backend runs on:

```bash
http://127.0.0.1:8000
```

Swagger Docs:

```bash
http://127.0.0.1:8000/docs
```

---

# Frontend Setup

## 6. Move into Frontend

```bash
cd frontend
```

---

## 7. Install Frontend Dependencies

```bash
npm install
```

---

## 8. Run Frontend

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# Authentication Flow

## Signup

Users can:

* Create accounts
* Store credentials securely
* Prevent duplicate accounts

## Login

Users receive:

* JWT access token
* Token stored in localStorage
* Protected API access

---

# PDF Upload Flow

1. User uploads PDF
2. Backend extracts text
3. Text is processed
4. AI context is generated
5. User can ask questions

---

# AI Question Answering

The application uses:

* Groq API
* Llama 3.3 70B model

AI features:

* Summarization
* Contextual responses
* Source-aware answers
* PDF-based Q&A

---

# API Endpoints

## Authentication

### Signup

```http
POST /signup
```

### Login

```http
POST /login
```

---

## PDF Upload

### Upload PDF

```http
POST /upload
```

Protected Route:

```http
Authorization: Bearer <token>
```

---

## Ask Questions

### Ask AI

```http
POST /ask
```

Body:

```json
{
  "question": "What is this document about?"
}
```

---

# Deployment

## Backend Deployment (Railway)

### Create railway.json

```json
{
  "$schema": "https://railway.app/railway.schema.json",
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "uvicorn app.main:app --host 0.0.0.0 --port $PORT"
  }
}
```

### Railway Steps

1. Push project to GitHub
2. Create Railway project
3. Connect GitHub repository
4. Add environment variables
5. Deploy backend

---

## Frontend Deployment (Vercel)

1. Push frontend to GitHub
2. Import repository into Vercel
3. Deploy automatically
4. Connect backend URL

---

# Security Features

* JWT Authentication
* Password Hashing
* Protected Routes
* Environment Variables
* API Key Protection
* CORS Middleware

---

# Future Improvements

## Planned Features

* Multi-document chat
* Vector database integration
* Semantic search
* Chat history
* User dashboards
* Stripe payments
* SaaS subscriptions
* Team workspaces
* OCR support
* PDF highlighting
* AI memory
* Streaming responses

---

# Common Errors & Fixes

## 401 Unauthorized

Cause:

* Missing JWT token

Fix:

* Ensure token is stored in localStorage
* Pass Authorization header correctly

---

## CORS Error

Cause:

* Backend not allowing frontend URL

Fix:

Add CORSMiddleware in FastAPI.

---

## Upload Failed

Cause:

* Missing token
* Backend not running

Fix:

* Login again
* Verify backend URL

---

# Screenshots

## Authentication UI

* Signup page
* Login page

## Dashboard

* Upload panel
* AI chat panel
* Documents panel

---

# Author

Prachi Tambe

---

# License

This project is for educational and portfolio purposes.

---

# Final Notes

This project demonstrates:

* Full-stack development
* AI SaaS architecture
* Authentication systems
* API integration
* Modern frontend design
* Backend deployment
* AI workflow implementation

It can be extended into a production-ready AI SaaS platform with subscriptions, team collaboration, and enterprise document intelligence features.
