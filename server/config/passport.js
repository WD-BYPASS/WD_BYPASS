const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const db = require('../database/db');

// GitHub Strategy
if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
  passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL || 'http://localhost:3000/auth/github/callback',
    passReqToCallback: true
  },
  function(req, accessToken, refreshToken, profile, done) {
    try {
      const providerData = {
        id: profile.id,
        username: profile.username,
        email: profile.emails?.[0]?.value,
        displayName: profile.displayName,
        accessToken: accessToken,
        refreshToken: refreshToken,
        profile: profile._json
      };
      
      // Check if user is already logged in (for account linking)
      if (req.user) {
        // Link this GitHub account to existing user
        const existing = db.getLinkedAccount('github', providerData.id);
        if (existing && existing.user_id !== req.user.id) {
          return done(null, false, { message: 'This GitHub account is already linked to another user' });
        }
        
        if (!existing) {
          db.linkAccount(req.user.id, 'github', providerData);
        }
        return done(null, req.user);
      }
      
      // Find or create user
      const user = db.findOrCreateUserFromProvider('github', providerData);
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }));
}

// Google Strategy
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:3000/auth/google/callback',
    passReqToCallback: true
  },
  function(req, accessToken, refreshToken, profile, done) {
    try {
      const providerData = {
        id: profile.id,
        username: profile.emails?.[0]?.value?.split('@')[0],
        email: profile.emails?.[0]?.value,
        displayName: profile.displayName,
        accessToken: accessToken,
        refreshToken: refreshToken,
        profile: profile._json
      };
      
      // Check if user is already logged in (for account linking)
      if (req.user) {
        // Link this Google account to existing user
        const existing = db.getLinkedAccount('google', providerData.id);
        if (existing && existing.user_id !== req.user.id) {
          return done(null, false, { message: 'This Google account is already linked to another user' });
        }
        
        if (!existing) {
          db.linkAccount(req.user.id, 'google', providerData);
        }
        return done(null, req.user);
      }
      
      // Find or create user
      const user = db.findOrCreateUserFromProvider('google', providerData);
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }));
}

module.exports = passport;
