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
          @page {
            size: auto;
            margin: 12mm;
          }
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
            height: 100%;
            page-break-after: avoid;
            page-break-inside: avoid;
            display: flex;
            flex-direction: column;
          }
          .no-print {
            display: none !important;
          }
        }
        .booking-confirmation-template {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          background: white;
          color: #0f172a;
          font-family: 'Inter', 'Arial', sans-serif;
          display: flex;
          flex-direction: column;
          min-height: fit-content;
        }
        .confirmation-header {
          text-align: center;
          border-bottom: 2px solid #0b6cf2;
          padding-bottom: 15px;
          margin-bottom: 15px;
          flex-shrink: 0;
        }
        .confirmation-logo {
          max-width: 120px;
          height: auto;
          margin-bottom: 10px;
        }
        .confirmation-title {
          font-size: 24px;
          font-weight: 800;
          color: #0f172a;
          margin: 5px 0;
        }
        .confirmation-subtitle {
          font-size: 13px;
          color: #64748b;
          margin: 3px 0;
        }
        .confirmation-ref {
          background: #f0f9ff;
          border: 2px solid #0b6cf2;
          border-radius: 6px;
          padding: 10px;
          margin: 12px 0;
          text-align: center;
        }
        .confirmation-ref-label {
          font-size: 10px;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 3px;
        }
        .confirmation-ref-number {
          font-size: 18px;
          font-weight: 700;
          color: #0b6cf2;
          font-family: 'Courier New', monospace;
        }
        .confirmation-section {
          margin: 12px 0;
          page-break-inside: avoid;
          flex-shrink: 0;
        }
        .confirmation-section-title {
          font-size: 16px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 8px;
          padding-bottom: 6px;
          border-bottom: 2px solid #e2e8f0;
        }
        .confirmation-row {
          display: flex;
          justify-content: space-between;
          padding: 6px 0;
          border-bottom: 1px solid #f1f5f9;
        }
        .confirmation-row:last-child {
          border-bottom: none;
        }
        .confirmation-label {
          font-weight: 600;
          color: #64748b;
          font-size: 12px;
          flex: 0 0 40%;
        }
        .confirmation-value {
          color: #0f172a;
          font-size: 12px;
          flex: 1;
          text-align: right;
        }
        .confirmation-footer {
          margin-top: auto;
          padding-top: 15px;
          border-top: 2px solid #0b6cf2;
          text-align: center;
          page-break-inside: avoid;
          flex-shrink: 0;
        }
        .confirmation-footer-title {
          font-size: 14px;
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 8px;
        }
        .confirmation-footer-info {
          font-size: 11px;
          color: #64748b;
          line-height: 1.5;
          margin: 4px 0;
        }
        .confirmation-footer-info a {
          color: #0b6cf2;
          text-decoration: none;
        }
        .confirmation-note {
          background: #f8fafc;
          border-left: 3px solid #0b6cf2;
          padding: 12px;
          margin: 12px 0;
          border-radius: 6px;
          page-break-inside: avoid;
          flex-shrink: 0;
        }
        .confirmation-note-title {
          font-weight: 700;
          color: #0f172a;
          margin-bottom: 6px;
          font-size: 13px;
        }
        .confirmation-note-text {
          font-size: 11px;
          color: #64748b;
          line-height: 1.5;
          margin: 0;
        }
        @media print {
          .booking-confirmation-template {
            padding: 12mm;
            max-width: 100%;
            width: 100%;
            box-sizing: border-box;
          }
          .confirmation-header {
            padding-bottom: 8px;
            margin-bottom: 8px;
          }
          .confirmation-logo {
            max-width: 90px;
            margin-bottom: 6px;
          }
          .confirmation-title {
            font-size: 18px;
            margin: 2px 0;
          }
          .confirmation-subtitle {
            font-size: 10px;
            margin: 1px 0;
          }
          .confirmation-ref {
            padding: 8px;
            margin: 8px 0;
          }
          .confirmation-ref-label {
            font-size: 9px;
          }
          .confirmation-ref-number {
            font-size: 16px;
          }
          .confirmation-section {
            margin: 8px 0;
          }
          .confirmation-section-title {
            font-size: 14px;
            margin-bottom: 6px;
            padding-bottom: 4px;
          }
          .confirmation-row {
            padding: 3px 0;
          }
          .confirmation-label,
          .confirmation-value {
            font-size: 11px;
          }
          .confirmation-note {
            padding: 10px;
            margin: 8px 0;
          }
          .confirmation-note-title {
            font-size: 12px;
            margin-bottom: 4px;
          }
          .confirmation-note-text {
            font-size: 10px;
          }
          .confirmation-footer {
            margin-top: 10px;
            padding-top: 8px;
          }
          .confirmation-footer-title {
            font-size: 12px;
            margin-bottom: 6px;
          }
          .confirmation-footer-info {
            font-size: 10px;
            margin: 3px 0;
          }
        }
        
        /* Auto-adjust for different paper sizes */
        @media print and (min-width: 210mm) {
          /* A4 and larger */
          .booking-confirmation-template {
            padding: 15mm;
          }
        }
        
        @media print and (max-width: 216mm) {
          /* Letter size and smaller */
          .booking-confirmation-template {
            padding: 10mm;
          }
        }
      `}</style>

      <div className="confirmation-header">
        <img 
          src="/assets/web-logo.png" 
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
          <span className="confirmation-value">{bookingData.phone ? `+1 ${bookingData.phone}` : "—"}</span>
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

