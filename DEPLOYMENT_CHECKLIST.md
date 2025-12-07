# Quick Deployment Checklist

## ✅ Pre-Deployment

- [ ] Run `npm run build` to create fresh build files
- [ ] Test locally with `npm start` and `php -S localhost:8000`

## 📤 Upload to HostGator (cPanel)

### Step 1: Upload React Build Files
- [ ] Upload everything from `build/` folder to `public_html/`
  - `index.html`
  - `assets/` folder
  - `static/` folder
  - `favicon.ico`
  - `manifest.json`
  - `robots.txt`
  - `sitemap.xml`

### Step 2: Create API Folder
- [ ] Create `api/` folder in `public_html/`
- [ ] Upload `api/send-email.php` to `public_html/api/`
- [ ] Upload `api/test-email.php` to `public_html/api/` (optional, for testing)
- [ ] Upload `api/diagnose.php` to `public_html/api/` (for troubleshooting)

### Step 3: Upload PHPMailer
- [ ] Upload the entire `PHPMailer/` folder to `public_html/`
- [ ] Verify structure: `public_html/PHPMailer/src/PHPMailer.php` exists

### Step 4: Set File Permissions
- [ ] PHP files: Set to `644` (readable by web server)
- [ ] Folders: Set to `755` (executable by web server)
- [ ] PHPMailer folder: Set to `755`

## 🧪 Testing

### Step 1: Run Diagnostic
- [ ] Visit: `https://jj-limoservices.com/api/diagnose.php`
- [ ] Check that all items show ✓ (green)
- [ ] Fix any ✗ (red) errors

### Step 2: Test Email
- [ ] Visit: `https://jj-limoservices.com/api/test-email.php`
- [ ] Check your email inbox for test email
- [ ] If it fails, check the error message

### Step 3: Test Contact Form
- [ ] Visit: `https://jj-limoservices.com`
- [ ] Go to Contact page
- [ ] Fill out and submit the form
- [ ] Check that you receive the email
- [ ] Check that customer receives confirmation email

## 🔍 Troubleshooting

If something doesn't work:

1. **Run the diagnostic**: `https://jj-limoservices.com/api/diagnose.php`
2. **Check cPanel Error Logs**: cPanel → Error Logs
3. **Verify file structure** matches the expected layout
4. **Check file permissions** are correct
5. **Contact HostGator support** if SMTP is blocked

## 📁 Expected File Structure on Server

```
public_html/
├── index.html
├── assets/
│   └── (all image files)
├── static/
│   ├── css/
│   └── js/
├── favicon.ico
├── manifest.json
├── robots.txt
├── sitemap.xml
├── api/
│   ├── send-email.php
│   ├── test-email.php
│   └── diagnose.php
└── PHPMailer/
    └── src/
        ├── PHPMailer.php
        ├── SMTP.php
        └── Exception.php
```

## ⚠️ Important Notes

- **PHPMailer must be in `public_html/PHPMailer/`** (not inside `api/`)
- **All PHP files must be readable** (permission 644)
- **All folders must be executable** (permission 755)
- **Test with `diagnose.php` first** before using the contact form

