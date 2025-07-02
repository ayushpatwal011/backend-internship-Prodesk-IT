# 📸 Social Media Backend (MERN Stack)

A complete backend for a social media app using **Node.js, Express, MongoDB, JWT**, and more.

---

## 🚀 Features

- ✅ User Registration & Login (with JWT auth)
- ✅ User Profile Management (update, view, followers/following)
- ✅ Create, Like, Comment, Delete Post
- ✅ Save & Share Posts
- ✅ Get All Posts & User Feed
- ✅ Protected Routes with JWT

---

📡 API Endpoints
✅ AUTH
POST /api/auth/register – Register new user

POST /api/auth/login – Login and receive token

✅ USER
GET /api/users/me – Get current user profile

PUT /api/users/update – Update profile

GET /api/users/:id – Get user by ID

POST /api/users/follow/:id – Follow user

POST /api/users/unfollow/:id – Unfollow user

✅ POSTS
POST /api/posts/ – Create new post

GET /api/posts/ – Get all posts (feed)

GET /api/posts/user/:userId – Get user's posts

PUT /api/posts/like/:id – Like/Unlike post

PUT /api/posts/comment/:id – Comment on post

PUT /api/posts/save/:id – Save/Unsave post

PUT /api/posts/share/:id – Share post

DELETE /api/posts/:id – Delete post

