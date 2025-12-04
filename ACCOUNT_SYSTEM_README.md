# WD_BYPASS Account System

This directory contains the backend server for the WD_BYPASS account system with GitHub and Google OAuth integration.

## Features

- **GitHub OAuth Login**: Users can login using their GitHub accounts
- **Google OAuth Login**: Users can login using their Google accounts
- **Account Linking**: Users can link multiple OAuth providers to a single account
- **Session Management**: Secure session handling with express-session
- **SQLite Database**: Lightweight database for storing user accounts and linked providers
- **Rate Limiting**: Protection against brute force attacks (5 auth attempts per 15 minutes)
- **CSRF Protection**: Double-submit cookie pattern for CSRF prevention
- **Security Features**: HTTP-only cookies, secure sessions, and proper middleware

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
- `PUT /account` - Update account information (with CSRF protection)
- `DELETE /account/link/:provider` - Unlink a provider account (with CSRF protection)

### Public Routes

- `GET /api/health` - Health check
- `GET /api/user` - Get current user (returns 401 if not authenticated)
- `GET /api/csrf-token` - Get CSRF token for protected requests

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

### Rate Limiting
- General API: 100 requests per 15 minutes per IP
- Authentication routes: 5 attempts per 15 minutes per IP

### CSRF Protection
- Double-submit cookie pattern
- Automatic token validation on state-changing operations (PUT, POST, DELETE)
- Tokens are HTTP-only and secure in production

### Session Security
- HTTP-only cookies
- Secure cookies in production (requires HTTPS)
- 24-hour session expiration
- Session secret must be changed in production

### Password Security
- No passwords stored (OAuth only)
- OAuth tokens stored securely in database
- Tokens never exposed to client

## Development

For development with auto-reload:

```bash
npm install -g nodemon
npm run server:dev
```

## Production Deployment

1. Set `NODE_ENV=production` in your `.env` file
2. Update OAuth callback URLs to your production domain
3. Use a strong `SESSION_SECRET` (use a random string generator)
4. Enable HTTPS (required for secure cookies)
5. Configure CORS for your production frontend URL
6. Use a production-grade database (consider PostgreSQL or MySQL)
7. Set up proper logging and monitoring
8. Use a process manager like PM2

### Example Production Environment

```env
NODE_ENV=production
PORT=3000
SESSION_SECRET=your-strong-random-secret-here
FRONTEND_URL=https://your-domain.com
GITHUB_CLIENT_ID=your_production_client_id
GITHUB_CLIENT_SECRET=your_production_client_secret
GITHUB_CALLBACK_URL=https://your-domain.com/auth/github/callback
GOOGLE_CLIENT_ID=your_production_client_id
GOOGLE_CLIENT_SECRET=your_production_client_secret
GOOGLE_CALLBACK_URL=https://your-domain.com/auth/google/callback
```

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

### Rate Limit Errors

- If you're testing, you may hit rate limits quickly
- Rate limits reset after 15 minutes
- Consider adjusting limits in `server/index.js` for development

### CSRF Errors

- CSRF protection is applied to PUT, POST, and DELETE requests
- GET requests to `/api/csrf-token` to get a token for protected requests
- Ensure cookies are enabled in your browser

## Testing

The implementation includes:
- Authentication flow testing
- Account linking/unlinking
- Rate limiting verification
- CSRF protection validation
- Session management

## Support

If you encounter issues:
1. Check the console logs for error messages
2. Verify your `.env` configuration
3. Ensure all dependencies are installed
4. Contact support at: support@wdbypass.publicvm.com
