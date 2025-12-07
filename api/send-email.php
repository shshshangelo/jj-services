<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Use __DIR__ to get absolute path - works on both localhost and production
$phpmailerPath = dirname(__DIR__) . '/PHPMailer/src/PHPMailer.php';
$smtpPath = dirname(__DIR__) . '/PHPMailer/src/SMTP.php';
$exceptionPath = dirname(__DIR__) . '/PHPMailer/src/Exception.php';

// Check if files exist before requiring
if (!file_exists($phpmailerPath)) {
    // Try alternative path (in case PHPMailer is in same directory as api)
    $phpmailerPath = __DIR__ . '/../PHPMailer/src/PHPMailer.php';
    $smtpPath = __DIR__ . '/../PHPMailer/src/SMTP.php';
    $exceptionPath = __DIR__ . '/../PHPMailer/src/Exception.php';
    
    if (!file_exists($phpmailerPath)) {
        http_response_code(500);
        echo json_encode([
            "success" => false, 
            "error" => "PHPMailer library not found. Please ensure PHPMailer folder is uploaded to the server.",
            "debug" => [
                "tried_path_1" => dirname(__DIR__) . '/PHPMailer/src/PHPMailer.php',
                "tried_path_2" => __DIR__ . '/../PHPMailer/src/PHPMailer.php',
                "current_dir" => __DIR__,
                "parent_dir" => dirname(__DIR__)
            ]
        ]);
        exit;
    }
}

require $phpmailerPath;
require $smtpPath;
require $exceptionPath;

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

if (!$data || empty($data['name']) || empty($data['email']) || empty($data['phone']) || empty($data['message'])) {
    echo json_encode(["success" => false, "error" => "Missing required fields"]);
    exit;
}

$name = htmlspecialchars(strip_tags($data['name']), ENT_QUOTES, 'UTF-8');
$email = htmlspecialchars(strip_tags($data['email']), ENT_QUOTES, 'UTF-8');
$phone = htmlspecialchars(strip_tags($data['phone']), ENT_QUOTES, 'UTF-8');
$message = htmlspecialchars(strip_tags($data['message']), ENT_QUOTES, 'UTF-8');

// Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(["success" => false, "error" => "Invalid email address"]);
    exit;
}

// Format phone number - ensure it has +1 prefix
$phoneDigits = preg_replace('/\D/', '', $phone);
if (strlen($phoneDigits) === 10) {
    // Format as +1 (XXX) XXX-XXXX
    $formattedPhone = '+1 (' . substr($phoneDigits, 0, 3) . ') ' . substr($phoneDigits, 3, 3) . '-' . substr($phoneDigits, 6, 4);
} elseif (strlen($phoneDigits) === 11 && substr($phoneDigits, 0, 1) === '1') {
    // Already has country code
    $formattedPhone = '+1 (' . substr($phoneDigits, 1, 3) . ') ' . substr($phoneDigits, 4, 3) . '-' . substr($phoneDigits, 7, 4);
} else {
    // Keep original if format is unexpected
    $formattedPhone = $phone;
}

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host = 'smtp.titan.email';
    $mail->SMTPAuth = true;
    $mail->Username = 'alerts@jj-limoservices.com';
    $mail->Password = 'j4Ex4Z@wASJ37Z2';
    $mail->SMTPSecure = 'ssl';
    $mail->Port = 465;
    $mail->SMTPDebug = 0; // Set to 2 for debugging, 0 for production
    $mail->CharSet = 'UTF-8';
    
    // Important: From address MUST match authenticated username
    $mail->setFrom('alerts@jj-limoservices.com', 'J&J Limo Services');
    $mail->addAddress('alerts@jj-limoservices.com');
    $mail->addReplyTo($email, $name);
    
    // Add headers to help with delivery
    $mail->addCustomHeader('X-Mailer', 'PHPMailer');
    $mail->addCustomHeader('X-Priority', '3');
    
    $mail->isHTML(true);
    $mail->Subject = "Contact Us Form Submission";
    
    // Create HTML email body
    $htmlBody = '
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f5f5f5;
            }
            .email-container {
                background-color: #ffffff;
                border-radius: 8px;
                padding: 30px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            .header {
                text-align: center;
                margin-bottom: 30px;
                padding-bottom: 20px;
                border-bottom: 2px solid #e0e0e0;
            }
            .header h1 {
                color: #0f172a;
                margin: 0 0 10px 0;
                font-size: 24px;
            }
            .content {
                margin-bottom: 30px;
            }
            .field {
                margin-bottom: 15px;
                padding: 10px;
                background-color: #f9f9f9;
                border-radius: 4px;
            }
            .field-label {
                font-weight: bold;
                color: #0f172a;
                margin-bottom: 5px;
                font-size: 14px;
            }
            .field-value {
                color: #333;
                font-size: 14px;
            }
            .message-box {
                margin-top: 20px;
                padding: 15px;
                background-color: #f0f8ff;
                border-left: 4px solid #2563eb;
                border-radius: 4px;
            }
            .message-label {
                font-weight: bold;
                color: #2563eb;
                margin-bottom: 10px;
                font-size: 14px;
            }
            .message-text {
                color: #333;
                white-space: pre-wrap;
                font-size: 14px;
                line-height: 1.6;
            }
            .footer {
                text-align: center;
                margin-top: 30px;
                padding-top: 20px;
                border-top: 2px solid #e0e0e0;
            }
            .company-name {
                font-size: 24px;
                font-weight: bold;
                color: #0f172a;
                margin: 20px 0 10px 0;
                letter-spacing: 1px;
            }
            .company-tagline {
                color: #64748b;
                font-size: 14px;
                margin-bottom: 10px;
                font-style: italic;
            }
            .footer-text {
                color: #666;
                font-size: 12px;
                margin-top: 15px;
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <div class="header">
                <h1>New Message</h1>
                <p style="color: #64748b; font-size: 14px; margin: 5px 0 0 0;">Contact Form Submission</p>
            </div>
            
            <div class="content">
                <div class="field">
                    <div class="field-label">Name:</div>
                    <div class="field-value">' . $name . '</div>
                </div>
                
                <div class="field">
                    <div class="field-label">Email:</div>
                    <div class="field-value"><a href="mailto:' . $email . '">' . $email . '</a></div>
                </div>
                
                <div class="field">
                    <div class="field-label">Phone:</div>
                    <div class="field-value"><a href="tel:' . $formattedPhone . '">' . $formattedPhone . '</a></div>
                </div>
                
                <div class="message-box">
                    <div class="message-label">Message:</div>
                    <div class="message-text">' . nl2br($message) . '</div>
                </div>
            </div>
            
            <div class="footer">
                <div class="company-name">J&J Limo Services</div>
                <div class="company-tagline">Luxury Transportation You Can Trust</div>
                <div class="company-number">+1 (862) 902-9304</div>
                <div class="footer-text">
                    This message was sent through the contact form on jj-limoservices.com<br>
                    <br>
                    <a href="https://jj-limoservices.com" style="color: #2563eb; text-decoration: none;"><br>
                    Visit our website</a>
                </div>
            </div>
        </div>
    </body>
    </html>
    ';
    
    // Plain text version for email clients that don't support HTML
    $textBody = "New Contact Form Submission\n\n";
    $textBody .= "Name: $name\n";
    $textBody .= "Email: $email\n";
    $textBody .= "Phone: $formattedPhone\n\n";
    $textBody .= "Message:\n$message";
    
    $mail->Body = $htmlBody;
    $mail->AltBody = $textBody;

    // Send email to business
    $mail->send();
    
    // Now send a confirmation copy to the customer
    $customerMail = new PHPMailer(true);
    $customerMail->isSMTP();
    $customerMail->Host = 'smtp.titan.email';
    $customerMail->SMTPAuth = true;
    $customerMail->Username = 'alerts@jj-limoservices.com';
    $customerMail->Password = 'j4Ex4Z@wASJ37Z2';
    $customerMail->SMTPSecure = 'ssl';
    $customerMail->Port = 465;
    $customerMail->SMTPDebug = 0; // Set to 2 for debugging, 0 for production
    $customerMail->CharSet = 'UTF-8';
    
    $customerMail->setFrom('alerts@jj-limoservices.com', 'J&J Limo Services');
    $customerMail->addAddress($email, $name);
    $customerMail->addReplyTo('alerts@jj-limoservices.com', 'J&J Limo Services');
    
    $customerMail->isHTML(true);
    $customerMail->Subject = "Thank You for Contacting J&J Limo Services";
    
    // Customer confirmation email template
    $customerHtmlBody = '
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <style>
            body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f5f5f5;
            }
            .email-container {
                background-color: #ffffff;
                border-radius: 8px;
                padding: 30px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            .header {
                text-align: center;
                margin-bottom: 30px;
                padding-bottom: 20px;
                border-bottom: 2px solid #e0e0e0;
            }
            .header h1 {
                color: #0f172a;
                margin: 0 0 10px 0;
                font-size: 24px;
            }
            .greeting {
                color: #333;
                font-size: 16px;
                margin-bottom: 20px;
            }
            .message-box {
                background-color: #f0f8ff;
                border-left: 4px solid #2563eb;
                border-radius: 4px;
                padding: 15px;
                margin: 20px 0;
            }
            .message-label {
                font-weight: bold;
                color: #2563eb;
                margin-bottom: 10px;
                font-size: 14px;
            }
            .message-text {
                color: #333;
                white-space: pre-wrap;
                font-size: 14px;
                line-height: 1.6;
            }
            .info-box {
                background-color: #f9f9f9;
                border-radius: 4px;
                padding: 15px;
                margin: 20px 0;
            }
            .info-box p {
                margin: 8px 0;
                font-size: 14px;
                color: #333;
            }
            .footer {
                text-align: center;
                margin-top: 30px;
                padding-top: 20px;
                border-top: 2px solid #e0e0e0;
            }
            .company-name {
                font-size: 24px;
                font-weight: bold;
                color: #0f172a;
                margin: 20px 0 10px 0;
                letter-spacing: 1px;
            }
            .company-tagline {
                color: #64748b;
                font-size: 14px;
                margin-bottom: 10px;
                font-style: italic;
            }
            .contact-info {
                color: #666;
                font-size: 13px;
                margin-top: 15px;
            }
            .contact-info a {
                color: #2563eb;
                text-decoration: none;
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <div class="header">
                <h1>Thank You for Contacting Us!</h1>
            </div>
            
            <div class="greeting">
                <p>Dear ' . $name . ',</p>
                <p>Thank you for reaching out to J&J Limo Services. We have successfully received your message and will get back to you as soon as possible, typically within 24 hours.</p>
            </div>
            
            <div class="message-box">
                <div class="message-label">Your Message:</div>
                <div class="message-text">' . nl2br($message) . '</div>
            </div>
            
            <div class="info-box">
                <p><strong>Your Contact Information:</strong></p>
                <p>Name: ' . $name . '</p>
                <p>Email: ' . $email . '</p>
                <p>Phone: ' . $formattedPhone . '</p>
            </div>
            
            <p style="color: #333; font-size: 14px; margin-top: 20px;">
                If you have any urgent questions or need immediate assistance, please feel free to call us directly at <a href="tel:+18629029304" style="color: #2563eb; text-decoration: none;">+1 (862) 902-9304</a>. We are available 24/7 to assist you.
            </p>
            
            <div class="footer">
                <div class="company-name">J&J Limo Services</div>
                <div class="company-tagline">Luxury Transportation You Can Trust</div>
                <div class="contact-info">
                    <p>Phone: <a href="tel:+18629029304">+1 (862) 902-9304</a></p>
                    <p>Email: <a href="mailto:alerts@jj-limoservices.com">alerts@jj-limoservices.com</a></p>
                    <p>Website: <a href="https://jj-limoservices.com">jj-limoservices.com</a></p>
                </div>
            </div>
        </div>
    </body>
    </html>
    ';
    
    $customerTextBody = "Thank You for Contacting J&J Limo Services\n\n";
    $customerTextBody .= "Dear $name,\n\n";
    $customerTextBody .= "Thank you for reaching out to J&J Limo Services. We have successfully received your message and will get back to you as soon as possible, typically within 24 hours.\n\n";
    $customerTextBody .= "Your Message:\n$message\n\n";
    $customerTextBody .= "Your Contact Information:\n";
    $customerTextBody .= "Name: $name\n";
    $customerTextBody .= "Email: $email\n";
    $customerTextBody .= "Phone: $formattedPhone\n\n";
    $customerTextBody .= "If you have any urgent questions, please call us at +1 (862) 902-9304. We are available 24/7.\n\n";
    $customerTextBody .= "J&J Limo Services\n";
    $customerTextBody .= "Luxury Transportation You Can Trust\n";
    $customerTextBody .= "Phone: +1 (862) 902-9304\n";
    $customerTextBody .= "Email: alerts@jj-limoservices.com\n";
    $customerTextBody .= "Website: https://jj-limoservices.com\n";
    
    $customerMail->Body = $customerHtmlBody;
    $customerMail->AltBody = $customerTextBody;
    
    // Send customer confirmation (don't fail if this fails - business email is more important)
    // Only send if email is valid and not the same as business email (to avoid loops)
    if (filter_var($email, FILTER_VALIDATE_EMAIL) && $email !== 'alerts@jj-limoservices.com') {
        try {
            $customerMail->send();
        } catch (Exception $customerException) {
            // Log but don't fail the whole request if customer email fails
            // This is common if customer email is invalid or their server rejects it
            error_log("Customer confirmation email failed (non-critical): " . $customerMail->ErrorInfo);
        }
    } else {
        // Skip customer email if invalid or same as business email
        error_log("Skipping customer confirmation email - invalid address or same as business email");
    }
    
    echo json_encode(["success" => true]);
} catch (Exception $e) {
    // Return detailed error for debugging
    $errorMessage = $mail->ErrorInfo ? $mail->ErrorInfo : $e->getMessage();
    
    // Log to error log (checkable in cPanel)
    error_log("Email send error: " . $errorMessage);
    error_log("Exception: " . $e->getMessage());
    error_log("File: " . $e->getFile() . " Line: " . $e->getLine());
    
    // Return user-friendly error (don't expose sensitive details in production)
    $userError = "Failed to send message. Please try again or contact us directly.";
    
    // In development, include more details
    $isDevelopment = (strpos($_SERVER['HTTP_HOST'], 'localhost') !== false || 
                     strpos($_SERVER['HTTP_HOST'], '127.0.0.1') !== false);
    
    echo json_encode([
        "success" => false, 
        "error" => $isDevelopment ? $errorMessage : $userError,
        "debug" => $isDevelopment ? [
            "exception" => $e->getMessage(),
            "file" => $e->getFile(),
            "line" => $e->getLine(),
            "phpmailer_error" => $mail->ErrorInfo
        ] : null
    ]);
}
?>

