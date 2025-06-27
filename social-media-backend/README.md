## 📘 Social Media API – README Summary

### 🛠 Simple Folder Structure Explained
```
root/
- index.js   → Main server file (entry point)
- .env   → Environment variables
- package.json  → Node dependencies and scripts

- config/
   - db.js   → MongoDB database connection setup

- controllers/  → Business logic for each feature
   - authController.js   → Register and login
   - userController.js   → Profile, follow, search
   - postController.js   → Post create, like, save, stats
   - commentController.js→ Comment CRUD

- models/    → Mongoose schemas
   - User.js  → User model
   - Post.js  → Post model
   - Comment.js    → Comment model

- routes/   → All route definitions
   - authRoutes.js   → Routes for auth (register/login)
   - userRoutes.js   → Routes for user actions
   - postRoutes.js   → Routes for posts
   - commentRoutes.js   → Routes for comments

- middlewares/
   - authMiddleware.js  → Protect routes using JWT

- utils/
    - cloudinary.js  → Cloudinary config for image upload
```

### 🔍 Key Features Explained
- **User Registration & Login:** Secure auth with JWT and bcrypt hashing
- **Protected Routes:** Only logged-in users can access user/post/comment actions
- **Profile Management:** View & update profile, follow/unfollow users
- **Post System:** Create posts with text/image, edit/delete own posts
- **Like/Save Posts:** Toggle likes & save posts to your profile
- **Get Stats:** View total likes & comments on a post
- **Comment System:** Add, update, and delete your own comments
- **Image Upload:** Use multer & Cloudinary to store post images
- **Search Users:** Find users by profile name (case-insensitive)

### 🔐 Authentication Endpoints
- POST `/api/auth/register` → `register`
- POST `/api/auth/login` → `login`

### 👤 User Endpoints
- GET `/api/users/me` → `getMyProfile`
- PUT `/api/users/me` → `updateProfile`
- GET `/api/users/:id` → `getUserById`
- PUT `/api/users/:id/follow` → `followUser`
- PUT `/api/users/:id/unfollow` → `unfollowUser`
- GET `/api/users/search/:name` → `searchUsersByName`

### 📝 Post Endpoints
- POST `/api/posts` → `createPost`
- GET `/api/posts` → `getAllPosts`
- GET `/api/posts/:id` → `getPostById`
- PUT `/api/posts/:id` → `updatePost`
- DELETE `/api/posts/:id` → `deletePost`
- PUT `/api/posts/:id/like` → `toggleLike`
- PUT `/api/posts/:id/save` → `toggleSavePost`
- GET `/api/posts/:id/stats` → `getPostStats`
- GET `/api/posts/saved/me` → `getMySavedPosts`

### 💬 Comment Endpoints
- POST `/api/comments/:postId` → `createComment`
- GET `/api/comments/:postId` → `getCommentsForPost`
- PUT `/api/comments/:id` → `updateComment`
- DELETE `/api/comments/:id` → `deleteComment`

### 📦 Install Dependencies
```
npm install express mongoose dotenv bcryptjs jsonwebtoken multer multer-storage-cloudinary cloudinary cors
```
