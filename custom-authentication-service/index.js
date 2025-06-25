import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import passport from 'passport';
import session from 'express-session';
import './config/passport.js';
import protectedRoutes from './routes/protectedRoutes.js';

dotenv.config();
connectDB()

const PORT = process.env.PORT || 5000

const app = express();
app.use(express.json());

// Serve frontend from public/
app.use(express.static('public'));

// Session + Passport
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/auth', authRoutes);
app.use('/protected', protectedRoutes);

app.listen(PORT, () =>
  console.log(` Server running at http://localhost:${process.env.PORT}`)
);
