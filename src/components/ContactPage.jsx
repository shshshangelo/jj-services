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

  const handleSubmit = (e) => {
    e.preventDefault();

    // Double-check all fields are complete (button should be disabled, but extra safety)
    const phoneDigits = formData.phone.replace(/\D/g, "");
    if (!formData.name.trim() || !formData.email.trim() || phoneDigits.length !== 10 || !formData.message.trim() || isSubmitting) {
      if (phoneDigits.length !== 10) {
        alert("Please enter a complete 10-digit phone number.");
      }
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission (no backend)
    setTimeout(() => {
      console.log("Contact form submitted:", formData);
      
      setSubmittedName(formData.name);
      setIsModalOpen(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
      setIsSubmitting(false);
    }, 1200);
  };

  // Phone formatting — ALL WITH ( )
  const handlePhoneChange = (e) => {
    let digits = e.target.value.replace(/\D/g, "").slice(0, 10);
    let formatted = "";

    if (digits.length > 0) {
      if (digits.length <= 3) {
        formatted = "(" + digits;
      } 
      else if (digits.length <= 6) {
        formatted = "(" + digits.slice(0, 3) + ") " + digits.slice(3);
      } 
      else {
        formatted = "(" + digits.slice(0, 3) + ") " + digits.slice(3, 6) + "-" + digits.slice(6);
      }
    }

    setFormData((prev) => ({ ...prev, phone: formatted }));
  };

  // Check if form is complete - all fields filled and phone has exactly 10 digits
  const phoneDigits = formData.phone.replace(/\D/g, "");
  const isFormComplete =
    formData.name.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.message.trim() !== "" &&
    phoneDigits.length === 10;

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
              <label>Name <span style={{ color: 'red' }}>*</span></label>
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
              <label>Email <span style={{ color: 'red' }}>*</span></label>
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
              <label>Phone <span style={{ color: 'red' }}>*</span></label>
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
              <label>Message <span style={{ color: 'red' }}>*</span></label>
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
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
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
