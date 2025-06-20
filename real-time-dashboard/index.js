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
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, 'public')));


// WebSocket Connection
io.on('connection', socket => {
  console.log('Client connected:', socket.id);

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});


// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
