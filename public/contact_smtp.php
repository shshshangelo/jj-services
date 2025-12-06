<?php
/**
 * SMTP-based contact form handler for HostGator
 * This version uses PHPMailer-style SMTP (requires PHPMailer library)
 * 
 * To use this, you need to install PHPMailer via Composer:
 * composer require phpmailer/phpmailer
 * 
 * Or download PHPMailer manually and include it
 */

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

    // Check if PHPMailer is available
    if (file_exists(__DIR__ . '/../vendor/autoload.php')) {
        require_once __DIR__ . '/../vendor/autoload.php';
        
        use PHPMailer\PHPMailer\PHPMailer;
        use PHPMailer\PHPMailer\Exception;
        
        $mail = new PHPMailer(true);
        
        try {
            // SMTP Configuration for HostGator
            $mail->isSMTP();
            $mail->Host = 'mail.jj-limoservices.com'; // Your HostGator mail server
            $mail->SMTPAuth = true;
            // Load config if available, otherwise use defaults
            $configFile = __DIR__ . '/contact_config.php';
            if (file_exists($configFile)) {
                $config = require $configFile;
                $mail->Username = $config['smtp_username'];
                $mail->Password = $config['smtp_password'];
                $mail->Host = $config['smtp_host'];
                $mail->Port = $config['smtp_port'];
            } else {
                // Fallback - UPDATE THESE or create contact_config.php
                $mail->Username = 'alerts@jj-limoservices.com';
                $mail->Password = 'YOUR_PASSWORD_HERE'; // ⚠️ Don't commit passwords!
            }
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // or ENCRYPTION_SMTPS for SSL
            $mail->Port = 587; // or 465 for SSL
            
            // Recipients
            $mail->setFrom('noreply@jj-limoservices.com', 'J&J Limo Services');
            $mail->addAddress('alerts@jj-limoservices.com', 'J&J Limo Services');
            $mail->addReplyTo($email, $name);
            
            // Content
            $mail->isHTML(false);
            $mail->Subject = 'New Contact Form Message from J&J Limo Services';
            $mail->Body = "New contact form submission:\n\n";
            $mail->Body .= "Name: " . $name . "\n";
            $mail->Body .= "Email: " . $email . "\n";
            $mail->Body .= "Phone: " . $phone . "\n";
            $mail->Body .= "Message:\n" . $message . "\n";
            
            $mail->send();
            echo "success";
        } catch (Exception $e) {
            error_log("PHPMailer Error: " . $mail->ErrorInfo);
            echo "error";
        }
    } else {
        // PHPMailer not available, fall back to regular mail()
        echo "error";
    }
} else {
    echo "error";
}
?>

