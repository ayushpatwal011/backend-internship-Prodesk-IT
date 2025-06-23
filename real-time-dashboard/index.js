import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import metricRoutes from './routes/metricRoutes.js';
import { dbConnection } from './config/db.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// Variables
const PORT = process.env.PORT || 5000;
let activeUsers = 0


// MongoDB Connection
dbConnection();

  // Middleware
app.use(cors());
app.use(express.json());

// Socket.IO into req
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Routes
app.use('/api/metrics', metricRoutes);

// Serve frontend

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});


// Socket logic
io.on("connection", (socket) => {
  activeUsers++;
  console.log("User connected", activeUsers);

  io.emit("activeUsers", activeUsers);
  

  socket.on("disconnect", () => {
    activeUsers--;
    console.log("User disconnected", activeUsers);
    io.emit("activeUsers", activeUsers);
  });
});

// Start server
server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
