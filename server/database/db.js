const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '../../data/accounts.db');
let db = null;

function init() {
  db = new Database(dbPath);
  
  // Create users table
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      email TEXT,
      display_name TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
  
  // Create linked accounts table
  db.exec(`
    CREATE TABLE IF NOT EXISTS linked_accounts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      provider TEXT NOT NULL,
      provider_id TEXT NOT NULL,
      provider_username TEXT,
      provider_email TEXT,
      access_token TEXT,
      refresh_token TEXT,
      profile_data TEXT,
      linked_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      UNIQUE(provider, provider_id)
    )
  `);
  
  console.log('Database initialized successfully');
}

function getUserById(id) {
  const stmt = db.prepare('SELECT * FROM users WHERE id = ?');
  return stmt.get(id);
}

function getUserByUsername(username) {
  const stmt = db.prepare('SELECT * FROM users WHERE username = ?');
  return stmt.get(username);
}

function createUser(username, email, displayName) {
  const stmt = db.prepare(`
    INSERT INTO users (username, email, display_name)
    VALUES (?, ?, ?)
  `);
  const result = stmt.run(username, email, displayName);
  return result.lastInsertRowid;
}

function updateUser(id, updates) {
  const fields = [];
  const values = [];
  
  if (updates.email !== undefined) {
    fields.push('email = ?');
    values.push(updates.email);
  }
  if (updates.display_name !== undefined) {
    fields.push('display_name = ?');
    values.push(updates.display_name);
  }
  
  fields.push('updated_at = CURRENT_TIMESTAMP');
  values.push(id);
  
  const stmt = db.prepare(`
    UPDATE users SET ${fields.join(', ')}
    WHERE id = ?
  `);
  return stmt.run(...values);
}

function getLinkedAccount(provider, providerId) {
  const stmt = db.prepare(`
    SELECT * FROM linked_accounts
    WHERE provider = ? AND provider_id = ?
  `);
  return stmt.get(provider, providerId);
}

function getLinkedAccounts(userId) {
  const stmt = db.prepare(`
    SELECT id, provider, provider_username, provider_email, linked_at
    FROM linked_accounts
    WHERE user_id = ?
  `);
  return stmt.all(userId);
}

function linkAccount(userId, provider, providerData) {
  const stmt = db.prepare(`
    INSERT INTO linked_accounts (
      user_id, provider, provider_id, provider_username,
      provider_email, access_token, refresh_token, profile_data
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);
  
  const result = stmt.run(
    userId,
    provider,
    providerData.id,
    providerData.username,
    providerData.email,
    providerData.accessToken,
    providerData.refreshToken || null,
    JSON.stringify(providerData.profile)
  );
  
  return result.lastInsertRowid;
}

function unlinkAccount(userId, provider) {
  const stmt = db.prepare(`
    DELETE FROM linked_accounts
    WHERE user_id = ? AND provider = ?
  `);
  return stmt.run(userId, provider);
}

function findOrCreateUserFromProvider(provider, providerData) {
  // Check if this provider account is already linked
  const linkedAccount = getLinkedAccount(provider, providerData.id);
  
  if (linkedAccount) {
    // User exists, return the user
    return getUserById(linkedAccount.user_id);
  }
  
  // Create new user with unique username
  let username = providerData.username || providerData.email?.split('@')[0] || `${provider}_${providerData.id}`;
  let suffix = 0;
  
  // Ensure username is unique
  while (getUserByUsername(username)) {
    suffix++;
    username = `${providerData.username || providerData.email?.split('@')[0] || provider}_${suffix}`;
  }
  
  const displayName = providerData.displayName || providerData.username || username;
  
  const userId = createUser(username, providerData.email, displayName);
  
  // Link the provider account
  linkAccount(userId, provider, providerData);
  
  return getUserById(userId);
}

module.exports = {
  init,
  getUserById,
  getUserByUsername,
  createUser,
  updateUser,
  getLinkedAccount,
  getLinkedAccounts,
  linkAccount,
  unlinkAccount,
  findOrCreateUserFromProvider
};
