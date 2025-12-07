# Security Notes

## Sensitive Files

⚠️ **IMPORTANT**: The following files contain sensitive information and should be handled carefully:

- `api/send-email.php` - Contains SMTP password and email credentials
  - **Action Required**: Consider moving credentials to `api/config.php` (gitignored)
  - See `api/config.example.php` for template

## Best Practices

1. **Never commit sensitive data** to version control
2. Use environment variables or config files for credentials
3. Keep `api/config.php` in `.gitignore` (already configured)
4. Use `api/config.example.php` as a template for other developers

## If credentials were already committed

If you've already committed sensitive data to git:

1. Remove the file from git history:
   ```bash
   git rm --cached api/send-email.php
   ```

2. Or use git filter-branch to remove sensitive data from history

3. Change your passwords/API keys immediately

4. Consider using a config file approach (see `api/config.example.php`)

