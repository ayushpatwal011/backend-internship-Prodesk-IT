# 📚 MERN Bookstore Inventory System – Backend

A complete backend for a Bookstore Inventory System built using the MERN stack (MongoDB, Express.js, Node.js).  
Supports CRUD operations, filtering, image upload, authentication, and wishlist functionality.

---

🔐 Auth
POST /api/auth/register
Request: username, email, password, isAdmin
Response: success, message

POST /api/auth/login
Request: email, password
Response: success, token (use in Authorization header as Bearer token)

📚 Books
GET /api/books
Query params: search, category, language, sort (asc/desc), page, limit, minPrice, maxPrice
Response: total, books[]

GET /api/books/:id
Get book details by ID
Response: book object

POST /api/books (Admin only)
Headers: Authorization Bearer token
Request: title, author, description, price, stock, pages, category, language, frontPageImage
Response: success, created book

PUT /api/books/:id (Admin only)
Headers: Authorization Bearer token
Request: fields to update (e.g., stock or price)
Response: updated book

DELETE /api/books/:id (Admin only)
Headers: Authorization Bearer token
Response: success message

POST /api/books/upload (Admin only)
Headers: Authorization Bearer token
Form data: image file
Response: uploaded image URL (Cloudinary)

❤️ Wishlist
POST /api/users/favorites/:bookId
Headers: Authorization Bearer token
Response: success, updated favorites list

GET /api/users/favorites
Headers: Authorization Bearer token
Response: user's favorite books list

🔐 Authentication Note