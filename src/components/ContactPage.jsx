import React, { useState } from "react";
import "./BookingConfirmationModal.css";

function ContactSuccessModal({ isOpen, onClose, name }) {
  if (!isOpen) return null;

  const firstName = (name || "").trim().split(" ")[0] || "guest";

  const handleOkay = () => {
    onClose();
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
            Your message has been sent successfully. Our team will review it and contact you shortly.
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
    const cleaned = value.replace(/[^a-zA-Z.\-\s]/g, "");
    return cleaned.replace(/\b([a-zA-Z])([a-zA-Z.]*)/g, (_, first, rest) => {
      return first.toUpperCase() + rest.toLowerCase();
    });
  };

  const formatEmail = (value) => {
    const noSpaces = value.replace(/\s+/g, "");
    return noSpaces.replace(/[^a-zA-Z0-9@._-]/g, "");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "name") {
      setFormData((prev) => ({ ...prev, name: formatFullName(value) }));
      return;
    }

    if (name === "email") {
      setFormData((prev) => ({ ...prev, email: formatEmail(value) }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // PHONE FORMATTER OUTSIDE handleSubmit (correct)
  const handlePhoneChange = (e) => {
    let digits = e.target.value.replace(/\D/g, "").slice(0, 10);
    let formatted = "";

    if (digits.length > 0) {
      if (digits.length <= 3) {
        formatted = "(" + digits;
      } else if (digits.length <= 6) {
        formatted = "(" + digits.slice(0, 3) + ") " + digits.slice(3);
      } else {
        formatted =
          "(" + digits.slice(0, 3) + ") " + digits.slice(3, 6) + "-" + digits.slice(6);
      }
    }

    setFormData((prev) => ({ ...prev, phone: formatted }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const phoneDigits = formData.phone.replace(/\D/g, "");
    if (!formData.name.trim() || !formData.email.trim() || phoneDigits.length !== 10 || !formData.message.trim() || isSubmitting) {
      if (phoneDigits.length !== 10) {
        alert("Please enter a complete 10-digit phone number.");
      }
      return;
    }

    setIsSubmitting(true);

    // Detect if running on localhost for development
    const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const apiUrl = isLocalhost 
      ? 'http://localhost:8000/api/send-email.php' 
      : 'https://jj-limoservices.com/api/send-email.php';

    // Include +1 prefix in phone number when sending
    const phoneWithPrefix = phoneDigits.length === 10 ? `+1${phoneDigits}` : formData.phone;
    
    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...formData,
        phone: phoneWithPrefix
      })
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (data.success) {
          setSubmittedName(formData.name);
          setIsModalOpen(true);
          setFormData({ name: "", email: "", phone: "", message: "" });
        } else {
          const errorMsg = data.error || "Unknown error occurred";
          alert(`Failed to send message: ${errorMsg}`);
          console.error("Email error:", errorMsg);
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        alert(`Error sending message: ${err.message}`);
      })
      .finally(() => setIsSubmitting(false));
  };

  const phoneDigits = formData.phone.replace(/\D/g, "");
  const isFormComplete =
    formData.name.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.message.trim() !== "" &&
    phoneDigits.length === 10;

  // Contact Map Component with Google Maps (static embed - no API key needed)
  const ContactMap = () => {
    const address = "2 Watson Avenue, West Orange, NJ 07052";
    // Use Google Maps embed URL (no API key required for basic embed)
    const encodedAddress = encodeURIComponent(address);
    const mapUrl = `https://www.google.com/maps?q=${encodedAddress}&output=embed`;

    return (
      <div className="contact-map-container">
        <h2 style={{ textAlign: 'center', marginBottom: '24px', fontSize: '24px', fontWeight: 700, color: 'var(--accent)' }}>
          Find Us
        </h2>
        <div className="contact-map" style={{ height: '400px', borderRadius: '16px', overflow: 'hidden' }}>
          <iframe
            width="100%"
            height="100%"
            style={{ border: 0, borderRadius: '16px' }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={mapUrl}
            title="J&J Limo Services Location"
          ></iframe>
        </div>
      </div>
    );
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
              <label>Name {formData.name.trim() === '' && <span style={{ color: 'red' }}>*</span>}</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                required
              />
            </div>

            <div className="form-group">
              <label>Email {formData.email.trim() === '' && <span style={{ color: 'red' }}>*</span>}</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                required
              />
            </div>

            <div className="form-group">
              <label>Phone {phoneDigits.length !== 10 && <span style={{ color: 'red' }}>*</span>}</label>
              <div className="phone-input-wrapper">
                <span className="phone-prefix">+1</span>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  placeholder="(555) 123-4567"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Message {formData.message.trim() === '' && <span style={{ color: 'red' }}>*</span>}</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                placeholder="Tell us how we can help you..."
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="submit-btn"
              disabled={!isFormComplete || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="button-spinner"></span>
                  Sending...
                </>
              ) : (
                "Send Message"
              )}
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
              <p className="info-note">24/7 Available</p>
            </div>

            <div className="info-card">
              <div className="info-icon">✉️</div>
              <h3>Email</h3>
              <p>
                <a href="mailto:alerts@jj-limoservices.com">alerts@jj-limoservices.com</a>
              </p>
              <p className="info-note">We'll respond within 24 hours</p>
            </div>

            <div className="info-card">
              <div className="info-icon">📍</div>
              <h3>Location</h3>
              <p>2 Watson Avenue</p>
              <p>West Orange, NJ 07052</p>
            </div>
          </div>
        </div>

        <div className="contact-info-centered">
          <ContactMap />
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
    </div>
  );
}
