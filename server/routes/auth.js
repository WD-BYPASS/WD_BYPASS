const express = require('express');
const passport = require('../config/passport');
const { ensureAuthenticated } = require('../middleware/auth');

const router = express.Router();

// GitHub authentication
router.get('/github', passport.authenticate('github', { 
  scope: ['user:email'] 
}));

router.get('/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login?error=github_auth_failed' }),
  (req, res) => {
    // Successful authentication
    res.redirect(process.env.FRONTEND_URL || 'http://localhost:5173');
  }
);

// GitHub account linking (for already logged in users)
router.get('/link/github', ensureAuthenticated, passport.authenticate('github', { 
  scope: ['user:email'] 
}));

router.get('/link/github/callback', 
  ensureAuthenticated,
  passport.authenticate('github', { failureRedirect: '/account?error=github_link_failed' }),
  (req, res) => {
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    res.redirect(frontendUrl + '/account?success=github_linked');
  }
);

// Google authentication
router.get('/google', passport.authenticate('google', { 
  scope: ['profile', 'email'] 
}));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login?error=google_auth_failed' }),
  (req, res) => {
    // Successful authentication
    res.redirect(process.env.FRONTEND_URL || 'http://localhost:5173');
  }
);

// Google account linking (for already logged in users)
router.get('/link/google', ensureAuthenticated, passport.authenticate('google', { 
  scope: ['profile', 'email'] 
}));

router.get('/link/google/callback', 
  ensureAuthenticated,
  passport.authenticate('google', { failureRedirect: '/account?error=google_link_failed' }),
  (req, res) => {
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    res.redirect(frontendUrl + '/account?success=google_linked');
  }
);

// Logout
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: 'Logout failed' });
    }
    res.redirect(process.env.FRONTEND_URL || 'http://localhost:5173');
  });
});

module.exports = router;
