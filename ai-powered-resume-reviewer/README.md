# 🧠 AI-Powered Resume Reviewer (MERN + Google Gemini)

This project allows users to upload a **PDF resume**, which is then analyzed using **Google Gemini AI** to provide:
- Resume Score (1–10)
- Suitable Job Roles
- Improvement Suggestions
- Missing Skills
- Extracted Contact Info & Work Highlights

---

## 📦 Tech Stack

- **Backend:** Node.js, Express, Multer, pdfreader, @google/generative-ai

---

## 🚀 Features

- Upload a `.pdf` resume file
- Extract raw text from PDF using `pdfreader`
- Send text to **Google Gemini** via OpenAI-style prompt
- Get AI-generated resume review
- Display response on frontend beautifully
