import express from 'express';
import dotenv from 'dotenv';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';
import {dbConnection} from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import chatRoutes from './routes/chatRoutes.js';

dotenv.config();

// db connection
dbConnection();

const PORT = process.env.PORT || 5000

// Middlewares
const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'))

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});


// Soket io
io.on('connection', (socket) => {
  console.log(' New user connected', socket.id);

  socket.on('joinRoom', (roomId) => socket.join(roomId));

  socket.on('sendMessage', (msg) => {
    io.to(msg.chatId).emit('receiveMessage', msg);
  });

  socket.on('disconnect', () => console.log(' User disconnected', socket.id));
});

server.listen(PORT, () => console.log(` Server running on ${PORT}`));
