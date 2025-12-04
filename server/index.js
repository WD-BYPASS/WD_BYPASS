const express = require('express');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const accountRoutes = require('./routes/account');
const db = require('./database/db');

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize database
db.init();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET || 'wd-bypass-secret-key-change-in-production',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// Passport serialization
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const user = db.getUserById(id);
  done(null, user);
});

// Routes
app.use('/auth', authRoutes);
app.use('/account', accountRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'WD_BYPASS Account System API' });
});

// Current user endpoint
app.get('/api/user', (req, res) => {
  if (req.isAuthenticated()) {
    const linkedAccounts = db.getLinkedAccounts(req.user.id);
    res.json({
      user: req.user,
      linkedAccounts: linkedAccounts
    });
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`WD_BYPASS Account System server running on port ${PORT}`);
});
