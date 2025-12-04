# WD_BYPASS Account System - Quick Start Guide

This guide will help you get the account system up and running in minutes.

## Prerequisites

- Node.js (v14 or higher)
- npm
- A GitHub account (for GitHub OAuth)
- A Google account (for Google OAuth)

## Quick Setup (5 minutes)

### Step 1: Install Dependencies (1 minute)

```bash
npm install
```

### Step 2: Set Up OAuth Apps (3 minutes)

#### GitHub OAuth App

1. Visit: https://github.com/settings/developers
2. Click "New OAuth App"
3. Fill in:
   - **Application name**: WD_BYPASS Local Dev
   - **Homepage URL**: `http://localhost:5173`
   - **Callback URL**: `http://localhost:3000/auth/github/callback`
4. Click "Register application"
5. Click "Generate a new client secret"
6. Copy both the **Client ID** and **Client Secret**

#### Google OAuth App

1. Visit: https://console.cloud.google.com/apis/credentials
2. Create a new project (or select existing)
3. Click "Create Credentials" → "OAuth client ID"
4. If prompted, configure the consent screen (use "External" for testing)
5. Choose "Web application"
6. Add redirect URI: `http://localhost:3000/auth/google/callback`
7. Click "Create"
8. Copy both the **Client ID** and **Client Secret**

### Step 3: Configure Environment (1 minute)

1. Copy the example file:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and paste your credentials:
   ```env
   GITHUB_CLIENT_ID=your_github_client_id_here
   GITHUB_CLIENT_SECRET=your_github_client_secret_here
   GOOGLE_CLIENT_ID=your_google_client_id_here
   GOOGLE_CLIENT_SECRET=your_google_client_secret_here
   ```

### Step 4: Start the Servers (30 seconds)

**Terminal 1 - Backend Server:**
```bash
npm run server
```

**Terminal 2 - Frontend (VitePress):**
```bash
npm run dev
```

### Step 5: Test It Out!

1. Open your browser to `http://localhost:5173`
2. Click on "Login" in the navigation
3. Choose GitHub or Google
4. Authorize the app
5. You're logged in! 🎉

## What You Can Do Now

### Login & Account Management

- **Login Page**: http://localhost:5173/login
- **Account Page**: http://localhost:5173/account (requires login)

### Try These Features

1. **Login with GitHub**
   - Go to login page
   - Click "Login with GitHub"
   - Authorize and you're in!

2. **Link Another Account**
   - Login first
   - Go to account page
   - Click "Link Google Account"
   - Now you can login with either!

3. **View Your Profile**
   - Check your username
   - See linked accounts
   - View member since date

4. **Unlink Accounts**
   - Go to account page
   - Click "Unlink" next to any linked account
   - (Must keep at least one!)

## API Testing

Test the API endpoints:

```bash
# Health check
curl http://localhost:3000/api/health

# Get CSRF token
curl http://localhost:3000/api/csrf-token

# Get current user (requires login)
curl http://localhost:3000/api/user --cookie-jar cookies.txt
```

## Common Issues & Solutions

### "OAuth Error" - Callback URL Mismatch
✅ **Solution**: Make sure callback URLs in your OAuth apps match exactly:
- GitHub: `http://localhost:3000/auth/github/callback`
- Google: `http://localhost:3000/auth/google/callback`

### "Cannot GET /auth/github"
✅ **Solution**: Make sure the backend server is running on port 3000

### CORS Errors
✅ **Solution**: Both servers must be running (frontend on 5173, backend on 3000)

### Rate Limited
✅ **Solution**: Wait 15 minutes or restart the server

## File Structure

```
WD_BYPASS/
├── server/               # Backend server
│   ├── index.js         # Main server file
│   ├── config/          # Passport OAuth strategies
│   ├── routes/          # API routes
│   ├── database/        # Database module
│   └── middleware/      # Auth middleware
├── docs/                # Frontend pages
│   ├── login.md         # Login page
│   └── account.md       # Account management page
├── data/                # SQLite database (created automatically)
└── .env                 # Your OAuth credentials
```

## Next Steps

- Read the full documentation: `ACCOUNT_SYSTEM_README.md`
- Customize the login page styling
- Add more OAuth providers
- Deploy to production

## Need Help?

- Check the logs in your terminal
- Read `ACCOUNT_SYSTEM_README.md` for detailed docs
- Email: support@wdbypass.publicvm.com

## Security Notes

- ⚠️ **Never commit `.env` file** (it contains secrets)
- 🔒 **Change SESSION_SECRET** before production
- 🌐 **Use HTTPS** in production
- 🚀 **Update callback URLs** for production domain

Happy coding! 🚀
