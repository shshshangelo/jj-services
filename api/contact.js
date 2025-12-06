// Vercel serverless function for contact form
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Get form data
  const { name, email, phone, message } = req.body;

  // Validate required fields
  if (!name || !email || !phone || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  try {
    // Create SMTP transporter for HostGator
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'mail.jj-limoservices.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USERNAME || 'alerts@jj-limoservices.com',
        pass: process.env.SMTP_PASSWORD || '',
      },
      tls: {
        rejectUnauthorized: false // For HostGator compatibility
      }
    });

    // Email content
    const mailOptions = {
      from: process.env.FROM_EMAIL || 'noreply@jj-limoservices.com',
      to: process.env.TO_EMAIL || 'alerts@jj-limoservices.com',
      replyTo: email,
      subject: 'New Contact Form Message from J&J Limo Services',
      text: `New contact form submission:\n\n` +
            `Name: ${name}\n` +
            `Email: ${email}\n` +
            `Phone: ${phone}\n` +
            `Message:\n${message}\n`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    // Return success
    return res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    
    // Log error but don't expose details to client
    return res.status(500).json({ 
      error: 'Failed to send email. Please try again later.' 
    });
  }
}

