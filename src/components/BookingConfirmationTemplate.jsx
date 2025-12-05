import React from "react";

export default function BookingConfirmationTemplate({ bookingData, bookingRef }) {
  const formatTime = (time) => {
    if (!time) return "—";
    const [hStr = '', mStr = ''] = time.split(":");
    if (hStr === '' || mStr === '') return time;
    const h = parseInt(hStr, 10);
    if (Number.isNaN(h)) return time;
    const suffix = h >= 12 ? "PM" : "AM";
    const hour12 = h % 12 === 0 ? 12 : h % 12;
    return `${hour12}:${mStr} ${suffix}`;
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } catch {
      return dateStr;
    }
  };

  const currentDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="booking-confirmation-template" id="booking-confirmation-template">
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .booking-confirmation-template,
          .booking-confirmation-template * {
            visibility: visible;
          }
          .booking-confirmation-template {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          .no-print {
            display: none !important;
          }
        }
        .booking-confirmation-template {
          max-width: 800px;
          margin: 0 auto;
          padding: 40px;
          background: white;
          color: #0f172a;
          font-family: 'Inter', 'Arial', sans-serif;
        }
        .confirmation-header {
          text-align: center;
          border-bottom: 3px solid #0b6cf2;
          padding-bottom: 30px;
          margin-bottom: 30px;
        }
        .confirmation-logo {
          max-width: 200px;
          height: auto;
          margin-bottom: 20px;
        }
        .confirmation-title {
          font-size: 32px;
          font-weight: 800;
          color: #0f172a;
          margin: 10px 0;
        }
        .confirmation-subtitle {
          font-size: 16px;
          color: #64748b;
          margin: 5px 0;
        }
        .confirmation-ref {
          background: #f0f9ff;
          border: 2px solid #0b6cf2;
          border-radius: 8px;
          padding: 15px;
          margin: 20px 0;
          text-align: center;
        }
        .confirmation-ref-label {
          font-size: 12px;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 5px;
        }
        .confirmation-ref-number {
          font-size: 24px;
          font-weight: 700;
          color: #0b6cf2;
          font-family: 'Courier New', monospace;
        }
        .confirmation-section {
          margin: 30px 0;
        }
        .confirmation-section-title {
          font-size: 20px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 15px;
          padding-bottom: 10px;
          border-bottom: 2px solid #e2e8f0;
        }
        .confirmation-row {
          display: flex;
          justify-content: space-between;
          padding: 12px 0;
          border-bottom: 1px solid #f1f5f9;
        }
        .confirmation-row:last-child {
          border-bottom: none;
        }
        .confirmation-label {
          font-weight: 600;
          color: #64748b;
          font-size: 14px;
          flex: 0 0 40%;
        }
        .confirmation-value {
          color: #0f172a;
          font-size: 14px;
          flex: 1;
          text-align: right;
        }
        .confirmation-footer {
          margin-top: 40px;
          padding-top: 30px;
          border-top: 3px solid #0b6cf2;
          text-align: center;
        }
        .confirmation-footer-title {
          font-size: 18px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 15px;
        }
        .confirmation-footer-info {
          font-size: 14px;
          color: #64748b;
          line-height: 1.8;
          margin: 8px 0;
        }
        .confirmation-footer-info a {
          color: #0b6cf2;
          text-decoration: none;
        }
        .confirmation-note {
          background: #f8fafc;
          border-left: 4px solid #0b6cf2;
          padding: 20px;
          margin: 30px 0;
          border-radius: 8px;
        }
        .confirmation-note-title {
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 10px;
          font-size: 16px;
        }
        .confirmation-note-text {
          font-size: 14px;
          color: #64748b;
          line-height: 1.6;
          margin: 0;
        }
        @media print {
          .booking-confirmation-template {
            padding: 20px;
          }
        }
      `}</style>

      <div className="confirmation-header">
        <img 
          src="/assets/logo.svg" 
          alt="J&J Limo Services Logo" 
          className="confirmation-logo"
        />
        <h1 className="confirmation-title">Booking Confirmation</h1>
        <p className="confirmation-subtitle">J&J Limo Services</p>
        <p className="confirmation-subtitle">Premium Ground Transportation</p>
      </div>

      <div className="confirmation-ref">
        <div className="confirmation-ref-label">Booking Reference Number</div>
        <div className="confirmation-ref-number">{bookingRef}</div>
      </div>

      <div className="confirmation-section">
        <h2 className="confirmation-section-title">Trip Details</h2>
        <div className="confirmation-row">
          <span className="confirmation-label">Pickup Location:</span>
          <span className="confirmation-value">
            {bookingData.pickup || (bookingData.pickupCoords ? `${bookingData.pickupCoords.lat.toFixed(6)}, ${bookingData.pickupCoords.lng.toFixed(6)}` : "—")}
          </span>
        </div>
        <div className="confirmation-row">
          <span className="confirmation-label">Dropoff Location:</span>
          <span className="confirmation-value">
            {bookingData.dropoff || (bookingData.dropoffCoords ? `${bookingData.dropoffCoords.lat.toFixed(6)}, ${bookingData.dropoffCoords.lng.toFixed(6)}` : "—")}
          </span>
        </div>
        <div className="confirmation-row">
          <span className="confirmation-label">Date:</span>
          <span className="confirmation-value">{formatDate(bookingData.date) || "—"}</span>
        </div>
        <div className="confirmation-row">
          <span className="confirmation-label">Time:</span>
          <span className="confirmation-value">{formatTime(bookingData.time)}</span>
        </div>
        <div className="confirmation-row">
          <span className="confirmation-label">Vehicle Type:</span>
          <span className="confirmation-value">{bookingData.vehicle || "—"}</span>
        </div>
        <div className="confirmation-row">
          <span className="confirmation-label">Number of Passengers:</span>
          <span className="confirmation-value">{bookingData.passengers || "—"}</span>
        </div>
      </div>

      <div className="confirmation-section">
        <h2 className="confirmation-section-title">Contact Information</h2>
        <div className="confirmation-row">
          <span className="confirmation-label">Name:</span>
          <span className="confirmation-value">{bookingData.customerName || "—"}</span>
        </div>
        <div className="confirmation-row">
          <span className="confirmation-label">Phone:</span>
          <span className="confirmation-value">{bookingData.phone || "—"}</span>
        </div>
        <div className="confirmation-row">
          <span className="confirmation-label">Email:</span>
          <span className="confirmation-value">{bookingData.email || "—"}</span>
        </div>
      </div>

      <div className="confirmation-note">
        <div className="confirmation-note-title">Important Information</div>
        <p className="confirmation-note-text">
          Our driver will contact you directly to discuss the total payment amount and confirm all booking details. 
          Payment will be arranged directly with you before your trip. Please keep this confirmation for your records.
        </p>
      </div>

      <div className="confirmation-footer">
        <div className="confirmation-footer-title">Contact Us</div>
        <div className="confirmation-footer-info">
          <strong>Phone:</strong> <a href="tel:+18629029304">+1 (862) 902-9304</a>
        </div>
        <div className="confirmation-footer-info">
          <strong>Email:</strong> <a href="mailto:Jjlimoservices21@gmail.com">Jjlimoservices21@gmail.com</a>
        </div>
        <div className="confirmation-footer-info">
          <strong>Service:</strong> 24/7 Available
        </div>
        <div className="confirmation-footer-info" style={{ marginTop: '20px', fontSize: '12px', color: '#94a3b8' }}>
          Confirmation generated on {currentDate}
        </div>
      </div>
    </div>
  );
}

