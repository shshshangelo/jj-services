import React from "react";

export default function Step5_CustomerInfo({ next, back, data, setData }) {
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

  const handlePhoneBlur = (e) => {
    const phoneNumber = e.target.value.replace(/\D/g, '');
    if (phoneNumber.length === 10) {
      // Format as +1 (XXX) XXX-XXXX
      const formatted = `+1 (${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6)}`;
      setData({ phone: formatted });
    }
  };

  return (
    <div className="step-card">
      <h2 className="step-title">Your Contact Information</h2>
      <p className="step-subtitle">We'll use this to confirm your booking</p>

      <label className="label">Full Name *</label>
      <input
        type="text"
        className="input-field"
        value={data.customerName || ''}
        onChange={(e) => setData({ customerName: e.target.value })}
        placeholder="Enter your full name"
        required
      />

      <label className="label">Phone Number *</label>
      <div className="phone-input-wrapper">
        <span className="phone-prefix">+1</span>
        <input
          type="tel"
          className="input-field phone-input"
          value={data.phone || ''}
          onChange={handlePhoneChange}
          onBlur={handlePhoneBlur}
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
          disabled={!data.customerName || !data.phone || data.phone.replace(/\D/g, '').length < 10}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
