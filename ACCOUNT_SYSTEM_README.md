# WD_BYPASS Account System

This directory contains the backend server for the WD_BYPASS account system with GitHub and Google OAuth integration.

## Features

- **GitHub OAuth Login**: Users can login using their GitHub accounts
- **Google OAuth Login**: Users can login using their Google accounts
- **Account Linking**: Users can link multiple OAuth providers to a single account
- **Session Management**: Secure session handling with express-session
- **SQLite Database**: Lightweight database for storing user accounts and linked providers

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy the `.env.example` file to `.env`:

```bash
cp .env.example .env
```

Then edit `.env` and fill in your OAuth credentials:

#### GitHub OAuth Setup

1. Go to https://github.com/settings/developers
2. Click "New OAuth App"
3. Fill in the details:
   - Application name: WD_BYPASS
   - Homepage URL: http://localhost:5173
   - Authorization callback URL: http://localhost:3000/auth/github/callback
4. Copy the Client ID and Client Secret to your `.env` file

#### Google OAuth Setup

1. Go to https://console.cloud.google.com/apis/credentials
2. Create a new project or select an existing one
3. Click "Create Credentials" > "OAuth client ID"
4. Choose "Web application"
5. Add authorized redirect URIs:
   - http://localhost:3000/auth/google/callback
6. Copy the Client ID and Client Secret to your `.env` file

### 3. Start the Server

```bash
npm run server
```

The server will start on port 3000 (or the port specified in your `.env` file).

### 4. Start the Frontend

In a separate terminal:

```bash
npm run dev
```

The frontend will start on port 5173.

## API Endpoints

### Authentication Routes

- `GET /auth/github` - Initiate GitHub OAuth flow
- `GET /auth/github/callback` - GitHub OAuth callback
- `GET /auth/google` - Initiate Google OAuth flow
- `GET /auth/google/callback` - Google OAuth callback
- `GET /auth/logout` - Logout user

### Account Linking Routes (requires authentication)

- `GET /auth/link/github` - Link GitHub account to existing user
- `GET /auth/link/github/callback` - GitHub linking callback
- `GET /auth/link/google` - Link Google account to existing user
- `GET /auth/link/google/callback` - Google linking callback

### Account Management Routes (requires authentication)

- `GET /account` - Get account information and linked accounts
- `PUT /account` - Update account information
- `DELETE /account/link/:provider` - Unlink a provider account

### Public Routes

- `GET /api/health` - Health check
- `GET /api/user` - Get current user (returns 401 if not authenticated)

## Database Schema

### Users Table

- `id` - Auto-increment primary key
- `username` - Unique username
- `email` - User email (optional)
- `display_name` - Display name
- `created_at` - Account creation timestamp
- `updated_at` - Last update timestamp

### Linked Accounts Table

- `id` - Auto-increment primary key
- `user_id` - Foreign key to users table
- `provider` - OAuth provider (github, google)
- `provider_id` - Provider's user ID
- `provider_username` - Username on the provider
- `provider_email` - Email on the provider
- `access_token` - OAuth access token
- `refresh_token` - OAuth refresh token (if available)
- `profile_data` - JSON data of full provider profile
- `linked_at` - Timestamp when account was linked

## Security Features

- CSRF protection via session cookies
- HTTP-only cookies
- Secure cookies in production
- Session secret configuration
- Foreign key constraints in database

## Development

For development with auto-reload:

```bash
npm install -g nodemon
npm run server:dev
```

## Production Deployment

1. Set `NODE_ENV=production` in your `.env` file
2. Update OAuth callback URLs to your production domain
3. Use a strong `SESSION_SECRET`
4. Enable HTTPS (required for secure cookies)
5. Configure CORS for your production frontend URL

## Troubleshooting

### OAuth Errors

- Ensure callback URLs match exactly in both provider settings and `.env`
- Check that CLIENT_ID and CLIENT_SECRET are correct
- Verify that the OAuth app is not restricted to specific users/organizations

### Database Errors

- The database will be created automatically in the `data` directory
- Ensure the `data` directory exists and is writable
- Delete the database file to reset all accounts (for development only)

### CORS Errors

- Update `FRONTEND_URL` in `.env` to match your frontend URL
- For production, configure appropriate CORS origins
