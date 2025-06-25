## 💬 Real-Time Chat Application

A full-stack **real-time chat application** supporting:

- 🔹 One-to-One Chat
- 🔹 Group Chat
- 🔹 File Sharing (images, docs, media)
- 🔹 User Authentication (JWT)
- 🔹 Real-Time Messaging (via Socket.IO)

---

## Folder Structure

real-time-chat-app/
├── config/ # MongoDB connection setup
├── controllers/ # Core business logic for chat, auth, users
├── middleware/ # Authentication middleware (JWT verification)
├── models/ # Mongoose schemas (User, Message, Chat)
├── routes/ # Express routes (auth, chat, message)
├── uploads/ # Folder to store uploaded files
├── .env # Environment variables
├── multer.js # File upload configuration
├── index.js # Main server entry point
└── README.md # Project documentation
