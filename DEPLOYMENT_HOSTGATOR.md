# HostGator Deployment Guide

## Step 1: Build Your React App

Run this command to create fresh build files:

```bash
npm run build
```

This creates a `build/` folder with all your compiled React files.

## Step 2: Upload Files to HostGator

### Folder Structure on HostGator (public_html)

Your HostGator `public_html` folder should look like this:

```
public_html/
├── index.html              (from build folder)
├── .htaccess               (from build folder - IMPORTANT for routing!)
├── assets/                 (from build/assets)
├── static/                 (from build/static)
├── favicon.ico             (from build)
├── manifest.json           (from build)
├── robots.txt              (from build)
├── sitemap.xml             (from build)
├── api/
│   └── send-email.php      (from your project root/api/)
└── PHPMailer/
    └── src/
        ├── PHPMailer.php
        ├── SMTP.php
        └── Exception.php
        (and other PHPMailer files)
```

### Upload Instructions

#### Option A: Using cPanel File Manager

1. **Login to cPanel** on HostGator
2. **Open File Manager**
3. **Navigate to `public_html`** folder
4. **Upload React Build Files:**
   - Upload everything from your local `build/` folder to `public_html/`
   - This includes: `index.html`, `.htaccess`, `assets/`, `static/`, `favicon.ico`, etc.
   - **IMPORTANT**: Make sure `.htaccess` is uploaded (it may be hidden - enable "Show Hidden Files" in File Manager)

5. **Create `api` folder:**
   - In `public_html`, create a new folder named `api`
   - Upload `api/send-email.php` to `public_html/api/`

6. **Upload PHPMailer:**
   - Upload the entire `PHPMailer/` folder to `public_html/`
   - Make sure the structure is: `public_html/PHPMailer/src/PHPMailer.php`

#### Option B: Using FTP (FileZilla, etc.)

1. **Connect to your HostGator FTP**
   - Host: `ftp.yourdomain.com` or your server IP
   - Username: Your cPanel username
   - Password: Your cPanel password
   - Port: 21

2. **Upload files in this order:**
   ```
   Upload build/* → public_html/
   Upload api/send-email.php → public_html/api/
   Upload PHPMailer/ → public_html/PHPMailer/
   ```

## Step 3: Verify File Permissions

In cPanel File Manager, set these permissions:

- **PHP files**: `644` (readable by web server)
- **Folders**: `755` (executable by web server)
- **PHPMailer folder**: `755`

To set permissions in cPanel:
1. Right-click the file/folder
2. Select "Change Permissions"
3. Set the numeric value

## Step 4: Test Your Deployment

1. **Visit your website**: `https://jj-limoservices.com`
2. **Test the contact form:**
   - Fill out the form
   - Submit it
   - Check that emails are sent

3. **Test PHP directly** (optional):
   - Visit: `https://jj-limoservices.com/api/send-email.php`
   - You should see an error (expected - it needs POST data)
   - This confirms PHP is working

## Important Notes

### PHP Path Structure

The `send-email.php` file uses:
```php
require '../PHPMailer/src/PHPMailer.php';
```

This means:
- `api/send-email.php` is in `public_html/api/`
- `PHPMailer/` must be in `public_html/` (one level up from `api/`)

### React App API URL

Your React app automatically detects the environment:
- **Localhost**: Uses `http://localhost:8000/api/send-email.php`
- **Production**: Uses `https://jj-limoservices.com/api/send-email.php`

No changes needed - it works automatically!

### If PHP Doesn't Work

1. **Check PHP version**: HostGator usually has PHP 7.4+ (should work)
2. **Check file paths**: Make sure `PHPMailer/` is in the right location
3. **Check permissions**: PHP files need to be readable (644)
4. **Check error logs**: In cPanel → Error Logs

## Quick Checklist

- [ ] Run `npm run build`
- [ ] Upload all files from `build/` to `public_html/` (including `.htaccess`)
- [ ] Create `api/` folder in `public_html/`
- [ ] Upload `send-email.php` to `public_html/api/`
- [ ] Upload `PHPMailer/` folder to `public_html/`
- [ ] Set file permissions (644 for files, 755 for folders)
- [ ] Test the contact form
- [ ] Verify emails are received
- [ ] Test page refreshes on routes like `/about`, `/contact`, etc. (should not show 404)

## Troubleshooting

### "404 Not Found" for API
- Check that `api/send-email.php` exists in `public_html/api/`
- Verify the file name is exactly `send-email.php` (case-sensitive)

### "PHPMailer not found" error
- Verify `PHPMailer/` folder is in `public_html/` (not inside `api/`)
- Check the folder structure: `public_html/PHPMailer/src/PHPMailer.php`

### Emails not sending
- Check SMTP credentials in `send-email.php`
- Verify HostGator allows outbound SMTP connections
- Check cPanel Error Logs for specific error messages

### Use the Diagnostic Script
1. **Upload `api/diagnose.php`** to `public_html/api/`
2. **Visit**: `https://jj-limoservices.com/api/diagnose.php`
3. **Review the report** - it will tell you exactly what's missing
4. **Fix any issues** shown in red
5. **Re-test** until all checks pass

### Common Issues and Solutions

#### Issue: "PHPMailer library not found"
**Solution:**
1. Make sure you uploaded the entire `PHPMailer/` folder
2. Verify the structure: `public_html/PHPMailer/src/PHPMailer.php`
3. Check file permissions (should be 644 for files, 755 for folders)

#### Issue: "Failed to send message" error
**Possible causes:**
1. **PHPMailer not uploaded** - Use `diagnose.php` to check
2. **SMTP credentials wrong** - Verify username/password in `send-email.php`
3. **HostGator blocking SMTP** - Contact HostGator support
4. **PHP extensions missing** - Check `diagnose.php` for missing extensions

#### Issue: "Undelivered Mail Returned to Sender"
**This usually means:**
- Customer's email address is invalid or doesn't exist
- Customer's email server is rejecting the message
- This is NOT a problem with your server setup

**Solution:**
- The business email should still be sent successfully
- Customer confirmation email failures are logged but don't break the form
- Check cPanel Error Logs for specific rejection reasons

#### Issue: "404 Error when refreshing pages like /about, /contact, etc."
**This happens because:**
- React Router uses client-side routing
- When you refresh `/about`, the server looks for a file at that path
- The file doesn't exist because React handles routing on the client side

**Solution:**
1. Make sure `.htaccess` file is uploaded to `public_html/`
2. The `.htaccess` file redirects all requests to `index.html` so React Router can handle them
3. In cPanel File Manager, enable "Show Hidden Files" to see `.htaccess`
4. Verify `.htaccess` is in `public_html/` (same folder as `index.html`)
5. If `.htaccess` is missing, upload it from your `build/` folder
6. After uploading, test by refreshing pages like `/about` or `/contact`

