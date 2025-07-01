# 💰 Crypto Tracker App - Backend (MERN + CoinGecko API)

This is the backend for a Crypto Tracker App built using Node.js, Express, MongoDB, and the CoinGecko API. It includes features like user authentication, market data, portfolio tracking, coin comparison, and crypto news updates.

---

## Tech Stack

- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- CoinGecko Public API
- Axios
- bcryptjs

---

## Folder Structure

- config/db.js — MongoDB connection setup
- models/ — Mongoose models (User, Portfolio)
- controllers/ — Request logic for auth, portfolio, market, compare
- routes/ — Express routes for each module
- middleware/ — JWT token middleware
- utils/ — CoinGecko API utility

---

## Authentication Routes

1. POST `/api/auth/signup`  
   Request Body: `{ "name": "Ayush", "email": "test@mail.com", "password": "123456" }`  
   Response: `{ user info, JWT token }`

2. POST `/api/auth/login`  
   Request Body: `{ "email": "test@mail.com", "password": "123456" }`  
   Response: `{ user info, JWT token }`

---

## Market Routes

1. GET `/api/market/trending`  
   Get trending coins from CoinGecko

2. GET `/api/market/top`  
   Get top 10 coins by market cap

3. GET `/api/market/coin/:id`  
   Get full data of a specific coin (example: `bitcoin`, `ethereum`)

4. GET `/api/market/chart/:id?days=7`  
   Get chart data (price history) for coin — days can be 1, 7, 30, etc.

5. GET `/api/market/global`  
   Get latest status updates / news from CoinGecko

---

Token required in header:  
`Authorization: Bearer <JWT_TOKEN>`

1. POST `/api/portfolio`  
    Add coin to user's portfolio  
    Body:{
   "coinId": "bitcoin",
   "amount": 1.2,
   "buyPrice": 25000
   }

2. GET `/api/portfolio`  
   Get all coins in user's portfolio with:
- Current price
- Total value
- Profit/Loss

3. DELETE `/api/portfolio/:id`  
   Remove a coin from user's portfolio

---

## Compare Coins

1. GET `/api/compare?coins=bitcoin,ethereum`  
   Compare two or more coins by ID  
   Response contains:
- Price
- Market cap
- Volume
- Circulating supply
- 24h price change %

---

## 🌐 CoinGecko API Used

No API key required — all requests made from backend to:
`https://api.coingecko.com/api/v3`

Used endpoints:

- `/coins/markets`
- `/coins/{id}`
- `/coins/{id}/market_chart`
- `/search/trending`
- `/status_updates`

---
