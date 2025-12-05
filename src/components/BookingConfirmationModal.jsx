import React, { useState } from "react";
import "./BookingConfirmationModal.css";

export default function BookingConfirmationModal({ isOpen, onClose, bookingData }) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const formatTime = (time) => {
    if (!time) return "—";
    const [hStr = '', mStr = ''] = time.split(":");
    if (hStr === '' || mStr === '') return time;
    return `${hStr.padStart(2, '0')}:${mStr.padStart(2, '0')}`;
  };

  const handleConfirm = () => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    // Simulate processing/loading before showing success state
    setTimeout(() => {
      console.log("Booking confirmed:", bookingData);
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  const handleSuccessClose = () => {
    setIsSuccess(false);
    onClose();
    window.location.href = "/";
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {!isSuccess ? (
          <>
            <div className="modal-header">
              <h2>Confirm Your Booking</h2>
              <button className="modal-close" onClick={onClose}>×</button>
            </div>
            
            <div className="modal-body">
              <div className="confirmation-section">
                <h3>Booking Details</h3>
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
                  <span className="confirmation-value">{bookingData.date || "—"}</span>
                </div>
                <div className="confirmation-row">
                  <span className="confirmation-label">Time:</span>
                  <span className="confirmation-value">{formatTime(bookingData.time)}</span>
                </div>
                <div className="confirmation-row">
                  <span className="confirmation-label">Vehicle:</span>
                  <span className="confirmation-value">{bookingData.vehicle || "—"}</span>
                </div>
                <div className="confirmation-row">
                  <span className="confirmation-label">Passengers:</span>
                  <span className="confirmation-value">{bookingData.passengers ? bookingData.passengers : "—"}</span>
                </div>
              </div>

              <div className="confirmation-section">
                <h3>Contact Information</h3>
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

              <div className="confirmation-note" style={{ background: "#f0f9ff", border: "2px solid #0b6cf2", borderRadius: "12px", padding: "20px", marginTop: "20px" }}>
                <p style={{ margin: "0 0 12px 0", fontWeight: 600, color: "#0f172a", fontSize: "16px" }}>
                  Pricing & Payment:
                </p>
                <p style={{ margin: "16px 0 0 0", fontSize: "14px", color: "#64748b", lineHeight: "1.6" }}>
                  By confirming, you agree to our{" "}
                  <a
                    href="/terms"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#0b6cf2", fontWeight: 600 }}
                  >
                    terms and conditions
                  </a>
                  . A confirmation text or call will follow shortly.
                </p>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-cancel" onClick={onClose} disabled={isSubmitting}>
                Cancel
              </button>
              <button className="btn-confirm" onClick={handleConfirm} disabled={isSubmitting}>
                {isSubmitting ? "Confirming..." : "Confirm Booking"}
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="modal-header">
              <h2>Booking Successful</h2>
            </div>
            <div className="modal-body">
              <p style={{ fontSize: "16px", color: "#0f172a", marginBottom: "12px" }}>
                Thank you, {bookingData.customerName || "guest"}!
              </p>
              <p style={{ fontSize: "14px", color: "#64748b", marginBottom: "20px" }}>
                Your booking has been successfully submitted. Our team will contact you shortly to confirm all details.
                Please also check your email and SMS for a confirmation message.
              </p>
            </div>
            <div className="modal-footer">
              <button className="btn-confirm" onClick={handleSuccessClose}>Okay</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
