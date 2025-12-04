const express = require('express');
const db = require('../database/db');
const { ensureAuthenticated } = require('../middleware/auth');

const router = express.Router();

// Get account information
router.get('/', ensureAuthenticated, (req, res) => {
  const linkedAccounts = db.getLinkedAccounts(req.user.id);
  res.json({
    user: req.user,
    linkedAccounts: linkedAccounts
  });
});

// Update account information
router.put('/', ensureAuthenticated, (req, res) => {
  try {
    const { email, display_name } = req.body;
    const updates = {};
    
    // Validate email format if provided
    if (email !== undefined) {
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ error: 'Invalid email format' });
      }
      updates.email = email;
    }
    
    // Validate display name if provided
    if (display_name !== undefined) {
      if (display_name && (display_name.length < 1 || display_name.length > 100)) {
        return res.status(400).json({ error: 'Display name must be between 1 and 100 characters' });
      }
      // Sanitize display name (remove potentially dangerous characters)
      if (display_name && /[<>\"']/.test(display_name)) {
        return res.status(400).json({ error: 'Display name contains invalid characters' });
      }
      updates.display_name = display_name;
    }
    
    db.updateUser(req.user.id, updates);
    
    const updatedUser = db.getUserById(req.user.id);
    res.json({ user: updatedUser });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update account' });
  }
});

// Unlink a provider account
router.delete('/link/:provider', ensureAuthenticated, (req, res) => {
  try {
    const { provider } = req.params;
    const linkedAccounts = db.getLinkedAccounts(req.user.id);
    
    // Don't allow unlinking if it's the only linked account
    if (linkedAccounts.length <= 1) {
      return res.status(400).json({ 
        error: 'Cannot unlink the only authentication method' 
      });
    }
    
    db.unlinkAccount(req.user.id, provider);
    res.json({ message: `${provider} account unlinked successfully` });
  } catch (error) {
    res.status(500).json({ error: 'Failed to unlink account' });
  }
});

module.exports = router;
