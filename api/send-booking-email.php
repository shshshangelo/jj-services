<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Resolve PHPMailer paths
$phpmailerPath = dirname(__DIR__) . '/PHPMailer/src/PHPMailer.php';
$smtpPath = dirname(__DIR__) . '/PHPMailer/src/SMTP.php';
$exceptionPath = dirname(__DIR__) . '/PHPMailer/src/Exception.php';

if (!file_exists($phpmailerPath)) {
    // Fallback to relative path if deployed differently
    $phpmailerPath = __DIR__ . '/../PHPMailer/src/PHPMailer.php';
    $smtpPath = __DIR__ . '/../PHPMailer/src/SMTP.php';
    $exceptionPath = __DIR__ . '/../PHPMailer/src/Exception.php';
}

if (!file_exists($phpmailerPath)) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "error" => "PHPMailer not found"
    ]);
    exit;
}

require $phpmailerPath;
require $smtpPath;
require $exceptionPath;

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

$required = [
    'customerName',
    'email',
    'phone',
    'pickup',
    'dropoff',
    'date',
    'time',
    'vehicle',
    'passengers'
];

foreach ($required as $field) {
    if (empty($data[$field])) {
        echo json_encode(["success" => false, "error" => "Missing required field: $field"]);
        exit;
    }
}

$customerName = htmlspecialchars(strip_tags($data['customerName']), ENT_QUOTES, 'UTF-8');
$customerEmail = filter_var($data['email'], FILTER_VALIDATE_EMAIL) ? $data['email'] : null;
$rawPhone = htmlspecialchars(strip_tags($data['phone']), ENT_QUOTES, 'UTF-8');
$phoneDigits = preg_replace('/\D/', '', $rawPhone);
if (strlen($phoneDigits) === 10) {
    $formattedPhone = '+1 (' . substr($phoneDigits, 0, 3) . ') ' . substr($phoneDigits, 3, 3) . '-' . substr($phoneDigits, 6, 4);
} elseif (strlen($phoneDigits) === 11 && substr($phoneDigits, 0, 1) === '1') {
    $formattedPhone = '+1 (' . substr($phoneDigits, 1, 3) . ') ' . substr($phoneDigits, 4, 3) . '-' . substr($phoneDigits, 7, 4);
} else {
    $formattedPhone = $rawPhone;
}
$pickup = htmlspecialchars(strip_tags($data['pickup']), ENT_QUOTES, 'UTF-8');
$dropoff = htmlspecialchars(strip_tags($data['dropoff']), ENT_QUOTES, 'UTF-8');
$date = htmlspecialchars(strip_tags($data['date']), ENT_QUOTES, 'UTF-8');
$time = htmlspecialchars(strip_tags($data['time']), ENT_QUOTES, 'UTF-8');
$vehicle = htmlspecialchars(strip_tags($data['vehicle']), ENT_QUOTES, 'UTF-8');
$passengers = htmlspecialchars(strip_tags((string) $data['passengers']), ENT_QUOTES, 'UTF-8');
$distanceKm = isset($data['distanceKm']) ? floatval($data['distanceKm']) : 0;
$price = isset($data['price']) ? floatval($data['price']) : 0;
$addons = isset($data['addons']) && is_array($data['addons']) ? $data['addons'] : [];
$bookingRef = !empty($data['bookingRef']) ? htmlspecialchars(strip_tags($data['bookingRef']), ENT_QUOTES, 'UTF-8') : '—';

try {
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = 'smtp.titan.email';
    $mail->SMTPAuth = true;
    $mail->Username = 'alerts@jj-limoservices.com';
    $mail->Password = 'j4Ex4Z@wASJ37Z2';
    $mail->SMTPSecure = 'ssl';
    $mail->Port = 465;
    $mail->CharSet = 'UTF-8';
    $mail->SMTPDebug = 0;

    $mail->setFrom('alerts@jj-limoservices.com', 'J&J Limo Services');
    $mail->addAddress('alerts@jj-limoservices.com');
    if ($customerEmail) {
        $mail->addReplyTo($customerEmail, $customerName);
    }

    $mail->isHTML(true);
    $mail->Subject = "New Booking Request - {$vehicle} - Ref {$bookingRef}";

    $addonsList = !empty($addons) ? '<ul>' . implode('', array_map(fn($a) => '<li>' . htmlspecialchars(strip_tags($a), ENT_QUOTES, 'UTF-8') . '</li>', $addons)) . '</ul>' : 'None';
    $distanceDisplay = $distanceKm > 0 ? number_format($distanceKm, 2) . ' km' : '—';
    $priceDisplay = $price > 0 ? '$' . number_format($price, 2) : '—';

    // Format time with AM/PM for business email
    $businessFormattedTime = "—";
    if ($time) {
        $parts = explode(":", $time);
        if (count($parts) >= 2) {
            $h = intval($parts[0]);
            $m = $parts[1];
            $suffix = $h >= 12 ? "PM" : "AM";
            $hour12 = ($h % 12 === 0) ? 12 : ($h % 12);
            $businessFormattedTime = "{$hour12}:{$m} {$suffix}";
        }
    }

    // Format date with day of week for business email
    $businessFormattedDate = "—";
    if ($date) {
        try {
            $dateObj = new DateTime($date);
            $businessFormattedDate = $dateObj->format('l, F j, Y'); // e.g., "Monday, February 15, 2025"
        } catch (Exception $e) {
            $businessFormattedDate = $date;
        }
    }

    $htmlBody = "
    <!doctype html>
    <html>
      <head>
        <meta charset='UTF-8'>
        <style>
          body { font-family: Arial, sans-serif; background:#f5f5f5; padding:20px; color:#0f172a; }
          .card { background:#ffffff; border-radius:10px; padding:24px; max-width:640px; margin:0 auto; box-shadow:0 10px 30px rgba(0,0,0,0.08); }
          h1 { margin:0 0 8px; font-size:24px; }
          .muted { color:#64748b; margin:0 0 16px; }
          .section { margin:20px 0; }
          .row { display:flex; justify-content:space-between; margin:8px 0; }
          .label { font-weight:600; color:#0f172a; }
          .value { color:#0f172a; text-align:right; }
          .pill { display:inline-block; padding:6px 10px; border-radius:999px; background:#eef2ff; color:#4338ca; font-weight:600; font-size:13px; }
          ul { margin:6px 0 0 16px; }
          .footer { margin-top:24px; font-size:12px; color:#94a3b8; text-align:center; }
        </style>
      </head>
      <body>
        <div class='card'>
          <h1>New Booking Request</h1>
          <p class='muted'>A customer just submitted a booking request. Details are below.</p>

          <div class='section' style='margin-top:8px;'>
            <div class='row'><span class='label'>Booking #</span><span class='value'>{$bookingRef}</span></div>
          </div>

          <div class='section'>
            <div class='row'><span class='label'>Passenger</span><span class='value'>{$customerName}</span></div>
            <div class='row'><span class='label'>Phone</span><span class='value'>{$formattedPhone}</span></div>
            <div class='row'><span class='label'>Email</span><span class='value'>" . ($customerEmail ? "<a href='mailto:{$customerEmail}'>{$customerEmail}</a>" : '—') . "</span></div>
          </div>

          <div class='section'>
            <div class='row'><span class='label'>Vehicle</span><span class='value'><span class='pill'>{$vehicle}</span></span></div>
            <div class='row'><span class='label'>Passengers</span><span class='value'>{$passengers}</span></div>
            <div class='row'><span class='label'>Date</span><span class='value'>{$businessFormattedDate}</span></div>
            <div class='row'><span class='label'>Time</span><span class='value'>{$businessFormattedTime}</span></div>
            <div class='row'><span class='label'>Pickup</span><span class='value'>{$pickup}</span></div>
            <div class='row'><span class='label'>Dropoff</span><span class='value'>{$dropoff}</span></div>
            <div class='row'><span class='label'>Distance</span><span class='value'>{$distanceDisplay}</span></div>
            <div class='row'><span class='label'>Quoted Fare</span><span class='value'>{$priceDisplay}</span></div>
          </div>

          <div class='footer'>This notification was generated by jj-limoservices.com</div>
        </div>
      </body>
    </html>";

    $textBody = "New Booking Request\n\n"
      . "Booking #: {$bookingRef}\n"
      . "Passenger: {$customerName}\n"
      . "Phone: {$formattedPhone}\n"
      . "Email: " . ($customerEmail ?: '—') . "\n"
      . "Vehicle: {$vehicle}\n"
      . "Passengers: {$passengers}\n"
      . "Date: {$businessFormattedDate}\n"
      . "Time: {$businessFormattedTime}\n"
      . "Pickup: {$pickup}\n"
      . "Dropoff: {$dropoff}\n"
      . "Distance: {$distanceDisplay}\n"
      . "Quoted Fare: {$priceDisplay}\n";

    $mail->Body = $htmlBody;
    $mail->AltBody = $textBody;
    $mail->send();

    // Confirmation email to customer (optional)
    if ($customerEmail) {
        try {
            $customerMail = new PHPMailer(true);
            $customerMail->isSMTP();
            $customerMail->Host = 'smtp.titan.email';
            $customerMail->SMTPAuth = true;
            $customerMail->Username = 'alerts@jj-limoservices.com';
            $customerMail->Password = 'j4Ex4Z@wASJ37Z2';
            $customerMail->SMTPSecure = 'ssl';
            $customerMail->Port = 465;
            $customerMail->CharSet = 'UTF-8';
            $customerMail->SMTPDebug = 0;

            $customerMail->setFrom('alerts@jj-limoservices.com', 'J&J Limo Services');
            $customerMail->addAddress($customerEmail, $customerName);
            $customerMail->addReplyTo('alerts@jj-limoservices.com', 'J&J Limo Services');
            $customerMail->isHTML(true);
            $customerMail->Subject = "Your Booking Request (Ref {$bookingRef}) - J&J Limo Services";

            // Format time with AM/PM for email
            $emailFormattedTime = "—";
            if ($time) {
                $parts = explode(":", $time);
                if (count($parts) >= 2) {
                    $h = intval($parts[0]);
                    $m = $parts[1];
                    $suffix = $h >= 12 ? "PM" : "AM";
                    $hour12 = ($h % 12 === 0) ? 12 : ($h % 12);
                    $emailFormattedTime = "{$hour12}:{$m} {$suffix}";
                }
            }

            // Format date with day of week for email
            $emailFormattedDate = "—";
            if ($date) {
                try {
                    $dateObj = new DateTime($date);
                    $emailFormattedDate = $dateObj->format('l, F j, Y'); // e.g., "Monday, February 15, 2025"
                } catch (Exception $e) {
                    $emailFormattedDate = $date;
                }
            }

            $customerMail->Body = "
            <!doctype html>
            <html>
              <body style='margin:0; padding:0; background:#0b1220; font-family: \"Inter\", Arial, sans-serif; color:#0f172a;'>
                <table role='presentation' width='100%' cellspacing='0' cellpadding='0' style='background:#0b1220; padding:24px 0;'>
                  <tr>
                    <td align='center'>
                      <table role='presentation' width='640' cellspacing='0' cellpadding='0' style='background:#ffffff; border-radius:16px; overflow:hidden; box-shadow:0 15px 40px rgba(0,0,0,0.12);'>
                        <tr>
                          <td style='background:linear-gradient(135deg,#0b6cf2,#094cb8); padding:24px 28px; color:#ffffff;'>
                            <div style='font-size:14px; opacity:0.9;'>J&J Limo Services</div>
                            <div style='font-size:22px; font-weight:800; margin-top:6px;'>Thank you for your booking request</div>
                            <div style='font-size:14px; opacity:0.9; margin-top:6px;'>Booking #: {$bookingRef}</div>
                            <div style='font-size:14px; opacity:0.9; margin-top:6px;'>We received your details and will confirm shortly.</div>
                          </td>
                        </tr>
                        <tr>
                          <td style='padding:28px; background:#ffffff;'>
                            <table role='presentation' width='100%' cellspacing='0' cellpadding='0' style='font-size:15px; color:#0f172a; line-height:1.6;'>
                              <tr>
                                <td style='padding:10px 0; font-weight:700;'>Trip Details</td>
                              </tr>
                              <tr><td style='padding:6px 0;'><strong>Vehicle:</strong> {$vehicle}</td></tr>
                              <tr><td style='padding:6px 0;'><strong>Date / Time:</strong> {$emailFormattedDate} at {$emailFormattedTime}</td></tr>
                              <tr><td style='padding:6px 0;'><strong>Pickup:</strong> {$pickup}</td></tr>
                              <tr><td style='padding:6px 0;'><strong>Dropoff:</strong> {$dropoff}</td></tr>
                              <tr><td style='padding:6px 0;'><strong>Passengers:</strong> {$passengers}</td></tr>
                              <tr><td style='padding:6px 0;'><strong>Distance:</strong> {$distanceDisplay}</td></tr>
                              <tr><td style='padding:6px 0;'><strong>Quoted Fare:</strong> {$priceDisplay}</td></tr>
                            </table>
                            <div style='margin-top:20px; padding:16px; background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; font-size:14px; color:#475569;'>
                              Need to update anything? Reply to this email or contact us using the information below.
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td style='padding:18px 28px; background:#f8fafc; font-size:14px; color:#64748b; text-align:center; line-height:1.8;'>
                            <div style='font-size:16px; font-weight:700; color:#0f172a; margin-bottom:4px;'>J&J Limo Services</div>
                            <div style='font-size:13px; color:#64748b; margin-bottom:8px;'>Luxury Transportation You Can Trust</div>
                            <div style='font-size:13px; color:#64748b;'>Phone: +1 (862) 902-9304</div>
                            <div style='font-size:13px; color:#64748b;'>Email: alerts@jj-limoservices.com</div>
                            <div style='font-size:13px; color:#64748b;'>Website: jj-limoservices.com</div>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </body>
            </html>";

            $customerMail->AltBody =
              "Thank you for your booking request!\n\n" .
              "Booking #: {$bookingRef}\n" .
              "Vehicle: {$vehicle}\n" .
              "Date/Time: {$emailFormattedDate} at {$emailFormattedTime}\n" .
              "Pickup: {$pickup}\n" .
              "Dropoff: {$dropoff}\n" .
              "Passengers: {$passengers}\n" .
              "Distance: {$distanceDisplay}\n" .
              "Quoted Fare: {$priceDisplay}\n";

            // Generate booking confirmation HTML attachment
            // Format time
            $formattedTime = "—";
            if ($time) {
                $parts = explode(":", $time);
                if (count($parts) >= 2) {
                    $h = intval($parts[0]);
                    $m = $parts[1];
                    $suffix = $h >= 12 ? "PM" : "AM";
                    $hour12 = ($h % 12 === 0) ? 12 : ($h % 12);
                    $formattedTime = "{$hour12}:{$m} {$suffix}";
                }
            }

            // Format date
            $formattedDate = "—";
            if ($date) {
                try {
                    $dateObj = new DateTime($date);
                    $formattedDate = $dateObj->format('l, F j, Y');
                } catch (Exception $e) {
                    $formattedDate = $date;
                }
            }

            $currentDate = date('F j, Y');
            $currentTime = date('g:i A');
            $distanceDisplay = $distanceKm > 0 ? number_format($distanceKm, 2) . ' km' : '—';
            $phoneDisplay = $formattedPhone ?: '—';

            $confirmationHTML = "<!DOCTYPE html>
<html>
<head>
  <meta charset='UTF-8'>
  <title>Booking Confirmation - {$bookingRef}</title>
  <style>
    body { font-family: 'Inter', Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; background: white; color: #0f172a; }
    .confirmation-header { text-align: center; border-bottom: 2px solid #0b6cf2; padding-bottom: 15px; margin-bottom: 20px; }
    .confirmation-title { font-size: 24px; font-weight: 800; color: #0f172a; margin: 10px 0; }
    .confirmation-subtitle { font-size: 14px; color: #64748b; margin: 5px 0; }
    .confirmation-ref { background: #f0f9ff; border: 2px solid #0b6cf2; border-radius: 12px; padding: 16px; margin: 20px 0; text-align: center; }
    .confirmation-ref-label { font-size: 12px; color: #64748b; margin-bottom: 5px; }
    .confirmation-ref-number { font-size: 20px; font-weight: 700; color: #0b6cf2; font-family: monospace; }
    .confirmation-section { margin: 20px 0; }
    .confirmation-section-title { font-size: 18px; font-weight: 700; color: #0f172a; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid #e2e8f0; }
    .confirmation-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #f1f5f9; }
    .confirmation-label { font-weight: 600; color: #0f172a; }
    .confirmation-value { color: #0f172a; text-align: right; }
    .confirmation-note { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; margin: 20px 0; }
    .confirmation-note-title { font-size: 16px; font-weight: 700; color: #0f172a; margin-bottom: 8px; }
    .confirmation-note-text { font-size: 14px; color: #64748b; line-height: 1.6; }
    .confirmation-footer { margin-top: 30px; padding-top: 20px; border-top: 2px solid #e2e8f0; }
    .confirmation-footer-title { font-size: 16px; font-weight: 700; color: #0f172a; margin-bottom: 12px; }
    .confirmation-footer-info { font-size: 14px; color: #64748b; margin: 6px 0; }
    @media print { @page { margin: 12mm; } }
  </style>
</head>
<body>
  <div class='confirmation-header'>
    <h1 class='confirmation-title'>Booking Confirmation</h1>
    <p class='confirmation-subtitle'>Luxury Transportation You Can Trust</p>
  </div>

  <div class='confirmation-ref'>
    <div class='confirmation-ref-label'>Booking Reference Number</div>
    <div class='confirmation-ref-number'>{$bookingRef}</div>
  </div>

  <div class='confirmation-section'>
    <h2 class='confirmation-section-title'>Trip Details</h2>
    <div class='confirmation-row'>
      <span class='confirmation-label'>Pickup Location:</span>
      <span class='confirmation-value'>" . htmlspecialchars($pickup, ENT_QUOTES, 'UTF-8') . "</span>
    </div>
    <div class='confirmation-row'>
      <span class='confirmation-label'>Dropoff Location:</span>
      <span class='confirmation-value'>" . htmlspecialchars($dropoff, ENT_QUOTES, 'UTF-8') . "</span>
    </div>
    <div class='confirmation-row'>
      <span class='confirmation-label'>Date:</span>
      <span class='confirmation-value'>{$formattedDate}</span>
    </div>
    <div class='confirmation-row'>
      <span class='confirmation-label'>Time:</span>
      <span class='confirmation-value'>{$formattedTime}</span>
    </div>
    <div class='confirmation-row'>
      <span class='confirmation-label'>Vehicle Type:</span>
      <span class='confirmation-value'>" . htmlspecialchars($vehicle, ENT_QUOTES, 'UTF-8') . "</span>
    </div>
    <div class='confirmation-row'>
      <span class='confirmation-label'>Number of Passengers:</span>
      <span class='confirmation-value'>" . htmlspecialchars($passengers, ENT_QUOTES, 'UTF-8') . "</span>
    </div>
    <div class='confirmation-row'>
      <span class='confirmation-label'>Distance:</span>
      <span class='confirmation-value'>{$distanceDisplay}</span>
    </div>
    <div class='confirmation-row'>
      <span class='confirmation-label'>Total Fare:</span>
      <span class='confirmation-value'>{$priceDisplay}</span>
    </div>
  </div>

  <div class='confirmation-section'>
    <h2 class='confirmation-section-title'>Contact Information</h2>
    <div class='confirmation-row'>
      <span class='confirmation-label'>Name:</span>
      <span class='confirmation-value'>" . htmlspecialchars($customerName, ENT_QUOTES, 'UTF-8') . "</span>
    </div>
    <div class='confirmation-row'>
      <span class='confirmation-label'>Phone:</span>
      <span class='confirmation-value'>{$phoneDisplay}</span>
    </div>
    <div class='confirmation-row'>
      <span class='confirmation-label'>Email:</span>
      <span class='confirmation-value'>" . htmlspecialchars($customerEmail ?: '—', ENT_QUOTES, 'UTF-8') . "</span>
    </div>
  </div>

  <div class='confirmation-note'>
    <div class='confirmation-note-title'>Important Information</div>
    <p class='confirmation-note-text'>
      If any changes are needed, please contact us. Please keep this confirmation for your records.
    </p>
  </div>

  <div class='confirmation-footer'>
    <div class='confirmation-footer-title'>Contact Us</div>
    <div class='confirmation-footer-info'>
      <strong>Phone:</strong> <a href='tel:+18629029304'>+1 (862) 902-9304</a>
    </div>
    <div class='confirmation-footer-info'>
      <strong>Email:</strong> <a href='mailto:alerts@jj-limoservices.com'>alerts@jj-limoservices.com</a>
    </div>
    <div class='confirmation-footer-info'>
      <strong>Official Website:</strong> <a href='https://jj-limoservices.com'>jj-limoservices.com</a>
    </div>
    <div class='confirmation-footer-info' style='margin-top: 20px; font-size: 12px; color: #94a3b8;'>
      Confirmation generated on {$currentDate} at {$currentTime}
    </div>
  </div>
</body>
</html>";

            // Generate JPEG attachment from HTML
            $jpegFilename = "Booking-Confirmation-{$bookingRef}.jpg";
            $jpegGenerated = false;
            
            // Try to use wkhtmltoimage if available (requires installation)
            $wkhtmltoimagePath = null;
            $possiblePaths = [
                '/usr/local/bin/wkhtmltoimage',
                '/usr/bin/wkhtmltoimage',
                'wkhtmltoimage' // If in PATH
            ];
            
            foreach ($possiblePaths as $path) {
                if ($path === 'wkhtmltoimage') {
                    // Check if command exists in PATH
                    $output = [];
                    $returnVar = 0;
                    @exec('which wkhtmltoimage 2>&1', $output, $returnVar);
                    if ($returnVar === 0 && !empty($output)) {
                        $wkhtmltoimagePath = trim($output[0]);
                        break;
                    }
                } elseif (file_exists($path) && is_executable($path)) {
                    $wkhtmltoimagePath = $path;
                    break;
                }
            }
            
            if ($wkhtmltoimagePath) {
                try {
                    // Create temporary HTML file
                    $tempHtmlFile = sys_get_temp_dir() . '/booking_' . $bookingRef . '_' . time() . '.html';
                    file_put_contents($tempHtmlFile, $confirmationHTML);
                    
                    // Create temporary output file
                    $tempJpegFile = sys_get_temp_dir() . '/booking_' . $bookingRef . '_' . time() . '.jpg';
                    
                    // Convert HTML to JPEG using wkhtmltoimage
                    $command = escapeshellarg($wkhtmltoimagePath) . 
                               ' --width 800 --format jpg --quality 90' .
                               ' ' . escapeshellarg($tempHtmlFile) .
                               ' ' . escapeshellarg($tempJpegFile) . ' 2>&1';
                    
                    $output = [];
                    $returnVar = 0;
                    exec($command, $output, $returnVar);
                    
                    if ($returnVar === 0 && file_exists($tempJpegFile)) {
                        $jpegContent = file_get_contents($tempJpegFile);
                        if ($jpegContent && strlen($jpegContent) > 0) {
                            $customerMail->addStringAttachment($jpegContent, $jpegFilename, 'base64', 'image/jpeg');
                            $jpegGenerated = true;
                            error_log("JPEG generated successfully for booking {$bookingRef}");
                        }
                        @unlink($tempJpegFile);
                    } else {
                        error_log("wkhtmltoimage failed: " . implode("\n", $output));
                    }
                    
                    @unlink($tempHtmlFile);
                } catch (Exception $jpegError) {
                    error_log("JPEG generation failed for booking {$bookingRef}: " . $jpegError->getMessage());
                }
            } else {
                error_log("wkhtmltoimage not found. For JPEG attachments, install wkhtmltopdf package.");
            }
            
            // Fallback: Generate simple JPEG using GD library if available
            if (!$jpegGenerated && function_exists('imagecreatetruecolor') && function_exists('imagestring')) {
                try {
                    // Create a simple text-based JPEG image
                    $width = 800;
                    $height = 1000;
                    $image = imagecreatetruecolor($width, $height);
                    
                    // Colors
                    $white = imagecolorallocate($image, 255, 255, 255);
                    $black = imagecolorallocate($image, 0, 0, 0);
                    $blue = imagecolorallocate($image, 11, 108, 242);
                    
                    // Fill background
                    imagefilledrectangle($image, 0, 0, $width, $height, $white);
                    
                    // Add text (simplified version)
                    $y = 50;
                    $lineHeight = 30;
                    $fontSize = 4;
                    
                    imagestring($image, $fontSize, 50, $y, "Booking Confirmation - {$bookingRef}", $blue);
                    $y += $lineHeight * 2;
                    imagestring($image, $fontSize, 50, $y, "Vehicle: {$vehicle}", $black);
                    $y += $lineHeight;
                    imagestring($image, $fontSize, 50, $y, "Date: {$emailFormattedDate} at {$emailFormattedTime}", $black);
                    $y += $lineHeight;
                    imagestring($image, $fontSize, 50, $y, "Pickup: " . substr($pickup, 0, 60), $black);
                    $y += $lineHeight;
                    imagestring($image, $fontSize, 50, $y, "Dropoff: " . substr($dropoff, 0, 60), $black);
                    $y += $lineHeight;
                    imagestring($image, $fontSize, 50, $y, "Passengers: {$passengers}", $black);
                    $y += $lineHeight;
                    imagestring($image, $fontSize, 50, $y, "Distance: {$distanceDisplay}", $black);
                    $y += $lineHeight;
                    imagestring($image, $fontSize, 50, $y, "Total Fare: {$priceDisplay}", $blue);
                    
                    // Output to buffer
                    ob_start();
                    imagejpeg($image, null, 90);
                    $jpegContent = ob_get_clean();
                    imagedestroy($image);
                    
                    if ($jpegContent && strlen($jpegContent) > 0) {
                        $customerMail->addStringAttachment($jpegContent, $jpegFilename, 'base64', 'image/jpeg');
                        $jpegGenerated = true;
                        error_log("Simple JPEG generated using GD library for booking {$bookingRef}");
                    }
                } catch (Exception $gdError) {
                    error_log("GD library JPEG generation failed: " . $gdError->getMessage());
                }
            }
            
            // Final fallback: If JPEG generation failed, don't attach anything
            // (User requested JPEG, not HTML)
            if (!$jpegGenerated) {
                error_log("JPEG generation unavailable for booking {$bookingRef}. Install wkhtmltopdf or enable GD library for image generation.");
            }

            $customerMail->send();
        } catch (Exception $e) {
            error_log("Customer booking confirmation failed: " . $e->getMessage());
        }
    }

    echo json_encode(["success" => true]);
} catch (Exception $e) {
    error_log("Booking email send failed: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(["success" => false, "error" => "Failed to send booking email."]);
}
?>

