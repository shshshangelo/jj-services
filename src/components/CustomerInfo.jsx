import React from "react";

export default function CustomerInfo({ next, back, data, setData }) {
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

  const formatPhoneNumber = (value) => {
    // Remove all non-digits
    const phoneNumber = value.replace(/\D/g, '');
    
    // Limit to 10 digits (US phone number)
    const phoneNumberDigits = phoneNumber.slice(0, 10);
    
    // Format as (XXX) XXX-XXXX
    if (phoneNumberDigits.length === 0) {
      return '';
    } else if (phoneNumberDigits.length <= 3) {
      return `(${phoneNumberDigits}`;
    } else if (phoneNumberDigits.length <= 6) {
      return `(${phoneNumberDigits.slice(0, 3)}) ${phoneNumberDigits.slice(3)}`;
    } else {
      return `(${phoneNumberDigits.slice(0, 3)}) ${phoneNumberDigits.slice(3, 6)}-${phoneNumberDigits.slice(6)}`;
    }
  };

  const handlePhoneChange = (e) => {
    const formatted = formatPhoneNumber(e.target.value);
    setData({ phone: formatted });
  };

  return (
    <div className="step-card">
      <h2 className="step-title">Your Contact Information</h2>
      <p className="step-subtitle">
        Enter your full name, email, and mobile number. We&apos;ll use this information only to
        send your booking confirmation and contact you about this trip.
      </p>

      <label className="label">
        Full Name
        <span className={`required-asterisk ${data.customerName?.trim() ? 'hidden' : ''}`}>*</span>
      </label>
      <input
        type="text"
        className="input-field"
        value={data.customerName || ''}
        onChange={(e) => {
          const formatted = formatFullName(e.target.value);
          setData({ customerName: formatted });
        }}
        placeholder="Enter your full name"
        required
      />

      <label className="label">
        Email
        <span className={`required-asterisk ${data.email?.trim() ? 'hidden' : ''}`}>*</span>
      </label>
      <input
        type="email"
        className="input-field"
        value={data.email || ''}
        onChange={(e) => {
          const cleaned = formatEmail(e.target.value);
          setData({ email: cleaned });
        }}
        placeholder="your.email@example.com"
        required
      />

      <label className="label">
        Phone Number
        <span className={`required-asterisk ${data.phone?.trim() ? 'hidden' : ''}`}>*</span>
      </label>
      <div className="phone-input-wrapper">
        <span className="phone-prefix">+1</span>
        <input
          type="tel"
          className="input-field phone-input"
          value={data.phone || ''}
          onChange={handlePhoneChange}
          placeholder="(555) 123-4567"
          maxLength={17}
          required
        />
      </div>
      <small className="input-hint">US phone number format: +1 (XXX) XXX-XXXX</small>

      <div className="btn-row">
        <button className="back-btn" onClick={back}>Back</button>
        <button 
          className="next-btn" 
          onClick={next}
          disabled={
            !data.customerName ||
            !data.phone ||
            data.phone.replace(/\D/g, '').length < 10 ||
            !data.email ||
            !data.email.includes('@')
          }
        >
          Continue
        </button>
      </div>
    </div>
  );
}

