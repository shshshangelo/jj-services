# HostGator Email Setup Guide

## Problem
The PHP `mail()` function often doesn't work reliably on HostGator, especially with Titan Email. Emails may not be delivered.

## Solutions

### Solution 1: Update Email Settings in cPanel (Recommended)

1. **Log into HostGator cPanel**
2. Go to **Email Routing** (under Email section)
3. Set it to **"Local Mail Exchanger"** if you're using HostGator email
4. Go to **Email Accounts** and verify `alerts@jj-limoservices.com` exists

### Solution 2: Use SMTP with PHPMailer (Most Reliable)

1. **Install PHPMailer via Composer:**
   ```bash
   composer require phpmailer/phpmailer
   ```

2. **Update `public/contact.php`** to use the SMTP version:
   - Rename `contact_smtp.php` to `contact.php` (after configuring it)
   - Update the SMTP credentials in the file:
     - `$mail->Host = 'mail.jj-limoservices.com';`
     - `$mail->Username = 'alerts@jj-limoservices.com';`
     - `$mail->Password = 'YOUR_EMAIL_PASSWORD';`

### Solution 3: Check Contact Submissions Log

The current `contact.php` now logs all submissions to `public/contact_submissions.txt` as a backup. Even if email fails, you can check this file for submissions.

**To view submissions:**
- Access via FTP: `public/contact_submissions.txt`
- Or add a simple PHP viewer page to read the log

### Solution 4: Verify DNS/MX Records

Make sure your domain has correct MX records for Titan Email:
- **MX Record 1:** Priority 10, `mx1.titan.email`
- **MX Record 2:** Priority 20, `mx2.titan.email`
- **SPF Record:** `v=spf1 include:spf.titan.email ~all`

### Solution 5: Test Email Delivery

1. Send a test email from your HostGator email account to `alerts@jj-limoservices.com`
2. Check spam/junk folders
3. Verify email routing settings in cPanel

## Quick Fix: Check Log File

The current setup logs all submissions to `contact_submissions.txt` in the public folder. Even if emails aren't being delivered, you can:

1. Access via FTP: `public/contact_submissions.txt`
2. Or create a simple admin page to view submissions

## Recommended Action

1. **Immediate:** Check `public/contact_submissions.txt` for any submissions
2. **Short-term:** Verify email routing in cPanel
3. **Long-term:** Install PHPMailer and use SMTP (most reliable)

## Contact HostGator Support

If issues persist:
- **Phone:** 866-96-GATOR (866-964-2867)
- **Live Chat:** Available 24/7 in cPanel
- **Email:** support@hostgator.com

## Testing

After making changes, test the contact form and check:
1. Browser console for any errors
2. `contact_submissions.txt` log file
3. Your email inbox (and spam folder)

