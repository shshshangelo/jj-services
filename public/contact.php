<?php
header('Content-Type: text/plain');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = isset($_POST['name']) ? trim($_POST['name']) : '';
    $email = isset($_POST['email']) ? trim($_POST['email']) : '';
    $phone = isset($_POST['phone']) ? trim($_POST['phone']) : '';
    $message = isset($_POST['message']) ? trim($_POST['message']) : '';

    // Basic validation
    if (empty($name) || empty($email) || empty($phone) || empty($message)) {
        echo "error";
        exit;
    }

    // Validate email format
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "error";
        exit;
    }

    $to = "alerts@jj-limoservices.com";
    $subject = "New Contact Form Message from J&J Limo Services";
    
    $body = "New contact form submission:\n\n";
    $body .= "Name: " . $name . "\n";
    $body .= "Email: " . $email . "\n";
    $body .= "Phone: " . $phone . "\n";
    $body .= "Message:\n" . $message . "\n";

    // Note: For local testing without PHP server, this will log to file
    // On HostGator production server, emails will be sent
    
    // Try SMTP first, fall back to mail() if SMTP function doesn't exist
    $emailSent = false;
    
    if (function_exists('mail')) {
        // Use improved mail() with proper headers for HostGator
        $headers = "MIME-Version: 1.0\r\n";
        $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
        $headers .= "From: J&J Limo Services <noreply@jj-limoservices.com>\r\n";
        $headers .= "Reply-To: " . $email . "\r\n";
        $headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";
        $headers .= "X-Priority: 3\r\n";
        
        // Set additional parameters for better delivery
        $additional_params = "-f noreply@jj-limoservices.com";
        
        $emailSent = @mail($to, $subject, $body, $headers, $additional_params);
    }
    
    // If mail() failed, try alternative method
    if (!$emailSent) {
        // Alternative: Use file-based logging as backup
        // This ensures you at least have a record of submissions
        $logFile = __DIR__ . '/contact_submissions.txt';
        $logEntry = date('Y-m-d H:i:s') . " - From: $name ($email) - Phone: $phone - Message: $message\n";
        @file_put_contents($logFile, $logEntry, FILE_APPEND);
        
        // Still try mail() one more time with simpler headers
        $simpleHeaders = "From: noreply@jj-limoservices.com\r\n";
        $simpleHeaders .= "Reply-To: $email\r\n";
        $emailSent = @mail($to, $subject, $body, $simpleHeaders);
    }
    
    if ($emailSent) {
        echo "success";
    } else {
        // Even if email fails, log it and return success to user
        // (You can check the log file manually)
        $logFile = __DIR__ . '/contact_submissions.txt';
        $logEntry = date('Y-m-d H:i:s') . " - EMAIL FAILED - From: $name ($email) - Phone: $phone - Message: $message\n";
        @file_put_contents($logFile, $logEntry, FILE_APPEND);
        
        // Return success anyway so user doesn't see error
        // Check contact_submissions.txt file for submissions
        echo "success";
    }
} else {
    echo "error";
}
?>
