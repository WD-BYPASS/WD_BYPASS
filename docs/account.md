---
title: Account
layout: doc
---

# Account Management

## Getting Started

To manage your account, you need to be logged in. If you're not logged in, please visit the [login page](/login).

## Account Information

Your account contains:
- **Username**: Your unique identifier in the system
- **Display Name**: How your name appears to others
- **Email**: Your contact email address
- **Linked Accounts**: OAuth providers connected to your account

## Linking Multiple Accounts

You can link both GitHub and Google accounts to your WD_BYPASS account. This provides:
- **Flexibility**: Login with either provider
- **Backup**: If one provider is unavailable, use the other
- **Security**: Multiple authentication options

### How to Link Accounts

1. Visit your account page (link below)
2. Click "Link GitHub Account" or "Link Google Account"
3. Authorize the provider
4. Your account will be linked automatically

### How to Unlink Accounts

1. Visit your account page
2. Find the linked account you want to remove
3. Click the "Unlink" button
4. Confirm the action

**Note**: You cannot unlink your only authentication method. You must have at least one provider linked to your account.

## Account Security

- Your session is secured with HTTP-only cookies
- We never store your OAuth provider passwords
- You can logout at any time from the account page
- Sessions expire after 24 hours of inactivity

## Accessing Your Account

The account management interface is available after logging in. You'll need to run the backend server to access it:

```bash
npm run server
```

Then visit the account page in your browser while logged in.

## Privacy

We collect and store only the minimum information necessary:
- Username from your OAuth provider
- Email address (if provided by the provider)
- Display name
- OAuth tokens (stored securely for authentication)

We never share your information with third parties.

## Support

If you have issues with your account, please contact support at: support@wdbypass.publicvm.com
