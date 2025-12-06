import React, { useState } from "react";
import "./BookingConfirmationModal.css";

function ContactSuccessModal({ isOpen, onClose, name }) {
  if (!isOpen) return null;

  const firstName = (name || "").trim().split(" ")[0] || "guest";

  const handleOkay = () => {
    onClose();
    // Redirect to home page
    window.location.href = "/";
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Message Sent Successfully</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <p style={{ fontSize: "16px", color: "#0f172a", marginBottom: "12px" }}>
            Thank you, {firstName}!
          </p>
          <p style={{ fontSize: "14px", color: "#64748b", marginBottom: "20px" }}>
            Your message has been sent successfully. Our team will review it and get back to you as soon as possible
            via email or phone.
          </p>
        </div>
        <div className="modal-footer">
          <button className="btn-confirm" onClick={handleOkay}>Okay</button>
        </div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submittedName, setSubmittedName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatFullName = (value) => {
    // Allow letters, spaces, dot, and hyphen; strip everything else (including @)
    const cleaned = value.replace(/[^a-zA-Z.\-\s]/g, '');

    // Auto-capitalize first letter of each word, but keep spaces as user types
    return cleaned.replace(/\b([a-zA-Z])([a-zA-Z.]*)/g, (_, first, rest) => {
      return first.toUpperCase() + rest.toLowerCase();
    });
  };

  const formatEmail = (value) => {
    // Disallow spaces; allow common email characters only
    const noSpaces = value.replace(/\s+/g, '');
    return noSpaces.replace(/[^a-zA-Z0-9@._-]/g, '');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "name") {
      const cleaned = formatFullName(value);
      setFormData((prev) => ({ ...prev, name: cleaned }));
      return;
    }

    if (name === "email") {
      const cleanedEmail = formatEmail(value);
      setFormData((prev) => ({ ...prev, email: cleanedEmail }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate all required fields
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.message.trim() || isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare form data
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name.trim());
      formDataToSend.append('email', formData.email.trim());
      formDataToSend.append('phone', formData.phone.trim());
      formDataToSend.append('message', formData.message.trim());

      // Send to backend API
      // For Vercel: use /api/contact
      // For HostGator with PHP: use /contact.php
      // For local PHP server: use http://localhost:8000/contact.php
      let apiUrl;
      
      if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        // Local development - try Vercel API first, then PHP server
        apiUrl = '/api/contact';
      } else if (window.location.hostname.includes('vercel.app') || window.location.hostname.includes('vercel.com')) {
        // Vercel deployment - use serverless function
        apiUrl = '/api/contact';
      } else {
        // HostGator or other hosting - use PHP
        apiUrl = '/contact.php';
      }
      
      // Convert FormData to JSON for Vercel API, or use FormData for PHP
      const isVercel = apiUrl === '/api/contact';
      const requestBody = isVercel 
        ? JSON.stringify({
            name: formData.name.trim(),
            email: formData.email.trim(),
            phone: formData.phone.trim(),
            message: formData.message.trim()
          })
        : formDataToSend;
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: isVercel ? { 'Content-Type': 'application/json' } : {},
        body: requestBody
      });

      // Check if response is ok
      if (!response.ok) {
        const errorText = await response.text().catch(() => 'Unknown error');
        console.error('API Error:', response.status, errorText);
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }

      // Handle both JSON (Vercel) and text (PHP) responses
      const contentType = response.headers.get('content-type');
      let result;
      
      if (contentType && contentType.includes('application/json')) {
        result = await response.json();
        console.log('API Response:', result); // Debug log
      } else {
        result = await response.text();
        console.log('PHP Response:', result); // Debug log
      }

      // Check for success (handle both JSON and text responses)
      const isSuccess = (contentType && contentType.includes('application/json'))
        ? result.success === true
        : result.trim().toLowerCase() === 'success';
      
      if (isSuccess) {
        // Success - show modal
        setSubmittedName(formData.name);
        setIsModalOpen(true);
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        // Error - show alert with more details
        console.error('Server returned error:', result);
        const errorMsg = (typeof result === 'object' && result.error) 
          ? result.error 
          : `Server returned: ${JSON.stringify(result)}`;
        throw new Error(errorMsg);
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
      
      // Check if it's a network error or 404 (endpoint not available)
      const isNetworkError = error.message.includes('Failed to fetch') || 
                            error.message.includes('NetworkError') ||
                            error.message.includes('404') ||
                            error.message.includes('Cannot POST');
      
      if (isNetworkError && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
        // In local development, if API/PHP isn't available, show success anyway
        // (This allows testing the UI flow)
        console.warn('Backend endpoint not accessible locally, simulating success for UI testing');
        console.warn('Note: This is normal for local testing. Emails will work when deployed.');
        setSubmittedName(formData.name);
        setIsModalOpen(true);
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        // Real error - show alert with more helpful message
        const errorMessage = error.message.includes('HTTP error')
          ? 'The server is not responding. This might be a temporary issue. Please try again in a moment.'
          : 'Failed to send message. Please try again or contact us directly at +1 (862) 902-9304';
        alert(errorMessage);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="container">
        <div className="contact-hero">
          <h1 className="page-title">Contact Us</h1>
          <p className="page-subtitle">Get in touch with J&J Limo Services</p>
        </div>

        <div className="contact-form-section-centered">
            <h2>Send us a Message</h2>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">
                  Name
                  <span className={`required-asterisk ${formData.name.trim() ? 'hidden' : ''}`}>*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your full name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">
                  Email
                  <span className={`required-asterisk ${formData.email.trim() ? 'hidden' : ''}`}>*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="phone">
                  Phone
                  <span className={`required-asterisk ${formData.phone.trim() ? 'hidden' : ''}`}>*</span>
                </label>
                <div className="phone-input-wrapper">
                  <span className="phone-prefix">+1</span>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="input-field phone-input"
                    value={formData.phone}
                    onChange={(e) => {
                      const digits = e.target.value.replace(/\D/g, "").slice(0, 10);
                      let formatted = digits;
                      if (digits.length > 0) {
                        if (digits.length <= 3) {
                          formatted = `(${digits}`;
                        } else if (digits.length <= 6) {
                          formatted = `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
                        } else {
                          formatted = `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
                        }
                      }
                      setFormData((prev) => ({ ...prev, phone: formatted }));
                    }}
                    required
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message">
                  Message
                  <span className={`required-asterisk ${formData.message.trim() ? 'hidden' : ''}`}>*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  placeholder="Tell us how we can help you..."
                ></textarea>
              </div>

              <button type="submit" className="submit-btn" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
        </div>

        <div className="contact-info-centered">
          <div className="contact-info-section">
            <div className="info-card">
              <div className="info-icon">📞</div>
              <h3>Phone</h3>
              <p>
                <a href="tel:+18629029304">+1 (862) 902-9304</a>
              </p>
              <p className="info-note">Available 24/7</p>
            </div>

            <div className="info-card">
              <div className="info-icon">✉️</div>
              <h3>Email</h3>
              <p>
                <a href="mailto:Jjlimoservices21@gmail.com">Jjlimoservices21@gmail.com</a>
              </p>
              <p className="info-note">We respond within 24 hours</p>
            </div>

            <div className="info-card">
              <div className="info-icon">📍</div>
              <h3>Office Location</h3>
              <p>2 Watson Avenue</p>
              <p>West Orange, NJ 07052</p>
            </div>
          </div>
        </div>

        <div className="map-section">
          <h2 className="section-title">Find Us</h2>
          <div className="map-container">
            <iframe
              src="https://www.google.com/maps?q=2+Watson+Avenue+West+Orange+NJ+07052&output=embed"
              width="100%"
              height="450"
              style={{ border: 0, borderRadius: '16px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="J&J Limo Services Office Location"
            ></iframe>
          </div>
        </div>
      </div>
      {isSubmitting && (
        <div className="page-loading-overlay">
          <div className="page-loading-card">
            <div className="page-loading-spinner" />
            <p>Sending your message…</p>
          </div>
        </div>
      )}

      <ContactSuccessModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        name={submittedName}
      />
    </div>
  );
}

