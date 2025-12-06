# PHP Contact Form Setup

## Development Setup

To test the PHP contact form locally, you have two options:

### Option 1: Run Both Servers Together (Recommended)

```bash
npm run start:dev
```

This will start both the React dev server and PHP server automatically.

### Option 2: Run Servers Separately

**Terminal 1 - PHP Server:**
```bash
npm run php:server
```
This starts PHP server on `http://localhost:8000`

**Terminal 2 - React Dev Server:**
```bash
npm start
```
This starts React on `http://localhost:3000`

## Requirements

- PHP must be installed on your system
  - Windows: Download from https://windows.php.net/download/
  - Mac: `brew install php`
  - Linux: `sudo apt-get install php`

## Production

When deployed to a server with PHP support (like cPanel, shared hosting, etc.), the contact form will work automatically. The PHP file is located in the `public` folder and will be accessible at `/contact.php`.

## Troubleshooting

If you see "Failed to send message":
1. Make sure PHP is installed: `php --version`
2. Make sure the PHP server is running on port 8000 (for development)
3. Check browser console (F12) for error messages
4. In production, ensure your hosting supports PHP and the `mail()` function is enabled

