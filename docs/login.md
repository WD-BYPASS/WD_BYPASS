---
title: Login
layout: doc
---

# Login to WD_BYPASS

To use the WD_BYPASS account system, please login with one of the following providers:

<div style="max-width: 500px; margin: 50px auto; padding: 40px; background: var(--vp-c-bg-soft); border-radius: 12px;">
  <div style="display: flex; flex-direction: column; gap: 15px;">
    <a href="/auth/github" style="display: flex; align-items: center; justify-content: center; gap: 12px; padding: 14px 24px; background: #24292e; color: white; border-radius: 8px; text-decoration: none; font-weight: 500; transition: all 0.3s;">
      Login with GitHub
    </a>
    <a href="/auth/google" style="display: flex; align-items: center; justify-content: center; gap: 12px; padding: 14px 24px; background: #4285f4; color: white; border-radius: 8px; text-decoration: none; font-weight: 500; transition: all 0.3s;">
      Login with Google
    </a>
  </div>
  <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid var(--vp-c-divider); text-align: center; color: var(--vp-c-text-2); font-size: 14px;">
    By logging in, you agree to our Terms of Service and NDA.
  </div>
</div>

**Note**: These links will work when you have the backend server running. See the setup instructions below.

## Account Features

- **Secure Authentication**: Login with your existing GitHub or Google account
- **Account Linking**: Link multiple authentication providers to a single account
- **Profile Management**: Manage your account information and linked providers
- **Session Security**: Secure session management with HTTP-only cookies

## How It Works

1. Click on one of the login buttons above
2. Authorize WD_BYPASS to access your basic profile information
3. You'll be redirected back to the site, logged in
4. You can then link additional accounts from your account page

## Privacy

We only access basic profile information (username, email) from your OAuth providers. We never see or store your passwords. Your data is stored securely and used only for authentication purposes.
