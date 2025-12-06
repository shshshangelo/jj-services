# Vercel Deployment Guide

## ✅ Yes, emails will work on Vercel!

Vercel doesn't support PHP, but I've created a **Node.js serverless function** that will send emails to your HostGator Titan email.

## Setup Steps

### 1. Install Dependencies

```bash
npm install
```

This will install `nodemailer` which is needed for sending emails.

### 2. Set Environment Variables in Vercel

After deploying to Vercel, you need to add these environment variables in your Vercel dashboard:

1. Go to your project on Vercel
2. Click **Settings** → **Environment Variables**
3. Add these variables:

```
SMTP_HOST=mail.jj-limoservices.com
SMTP_PORT=587
SMTP_USERNAME=alerts@jj-limoservices.com
SMTP_PASSWORD=Sherlyjoe28
FROM_EMAIL=noreply@jj-limoservices.com
TO_EMAIL=alerts@jj-limoservices.com
```

**⚠️ Important:** Never commit passwords to git! Use Vercel's environment variables.

### 3. Deploy to Vercel

```bash
# Install Vercel CLI (if not already installed)
npm i -g vercel

# Deploy
vercel

# Or use the Vercel dashboard to connect your GitHub repo
```

### 4. How It Works

- **Contact form** → Calls `/api/contact`
- **Vercel serverless function** → Sends email via SMTP to HostGator
- **Email arrives** → In your `alerts@jj-limoservices.com` inbox

## File Structure

```
api/
  contact.js          ← Vercel serverless function (Node.js)
public/
  contact.php         ← For HostGator deployment (PHP)
src/
  components/
    ContactPage.jsx   ← Automatically detects Vercel vs HostGator
```

## How ContactPage Detects Platform

The `ContactPage.jsx` automatically:
- **On Vercel** → Uses `/api/contact` (serverless function)
- **On HostGator** → Uses `/contact.php` (PHP)
- **Local development** → Tries `/api/contact` first, falls back to PHP server

## Testing

1. **Deploy to Vercel**
2. **Add environment variables** (see step 2 above)
3. **Submit the contact form**
4. **Check your email** at `alerts@jj-limoservices.com`

## Troubleshooting

### Emails not arriving?

1. **Check Vercel logs:**
   - Go to Vercel dashboard → Your project → Functions → View logs
   - Look for any errors

2. **Verify environment variables:**
   - Make sure all SMTP variables are set correctly
   - Check that password is correct

3. **Check spam folder:**
   - Emails might be filtered as spam

4. **Test SMTP connection:**
   - Verify HostGator SMTP settings are correct
   - Port 587 (STARTTLS) or 465 (SSL)

## Security Notes

✅ **Good:** Environment variables are secure (not in code)  
✅ **Good:** Passwords are stored in Vercel (encrypted)  
❌ **Bad:** Don't commit `.env` files with passwords  
❌ **Bad:** Don't put passwords in code files

## Both Options Available

You now have **two deployment options**:

1. **Vercel** → Uses `/api/contact` (Node.js serverless function)
2. **HostGator** → Uses `/contact.php` (PHP script)

Both will send emails to your HostGator Titan email! 🎉

