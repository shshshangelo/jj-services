import React, { useState } from "react";

function ContactSuccessModal({ isOpen, onClose, name }) {
  if (!isOpen) return null;

  const firstName = (name || "").trim().split(" ")[0] || "guest";

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Message Sent</h2>
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
          <button className="btn-confirm" onClick={onClose}>Okay</button>
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

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "name") {
      // Allow only letters and spaces; silently strip anything else
      const cleaned = value.replace(/[^a-zA-Z\s]/g, "");
      setFormData((prev) => ({ ...prev, name: cleaned }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      return;
    }
    // Here you would typically send the formData to your backend or email service
    console.log("Contact form submitted:", formData);

    setSubmittedName(formData.name);
    setIsModalOpen(true);
    setFormData({ name: "", email: "", phone: "", message: "" });
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
                <label htmlFor="name">Name</label>
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
                <label htmlFor="email">Email</label>
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
                <label htmlFor="phone">Phone</label>
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
                <label htmlFor="message">Message</label>
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

              <button type="submit" className="submit-btn">
                Send Message
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
      <ContactSuccessModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        name={submittedName}
      />
    </div>
  );
}

