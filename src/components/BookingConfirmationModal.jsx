import React from "react";
import "./BookingConfirmationModal.css";

export default function BookingConfirmationModal({ isOpen, onClose, bookingData }) {
  if (!isOpen) return null;

  const handleConfirm = () => {
    // Here you would typically send the booking data to your backend
    console.log("Booking confirmed:", bookingData);
    alert("Booking confirmed! You will receive a confirmation email shortly.");
    onClose();
    // Optionally redirect to home or booking success page
    window.location.href = "/";
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
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
              <span className="confirmation-value">{bookingData.time || "—"}</span>
            </div>
            <div className="confirmation-row">
              <span className="confirmation-label">Vehicle:</span>
              <span className="confirmation-value">{bookingData.vehicle || "—"}</span>
            </div>
            <div className="confirmation-row">
              <span className="confirmation-label">Passengers:</span>
              <span className="confirmation-value">{bookingData.passengers || 1}</span>
            </div>
            <div className="confirmation-row">
              <span className="confirmation-label">Extras:</span>
              <span className="confirmation-value">
                {bookingData.addons && bookingData.addons.length > 0 
                  ? bookingData.addons.join(", ") 
                  : "None"}
              </span>
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
          </div>

          <div className="confirmation-total">
            <div className="total-row">
              <span className="total-label">Total Amount (US SRP):</span>
              <span className="total-amount">${bookingData.price || 0}</span>
            </div>
          </div>

          <div className="confirmation-note">
            <p>By confirming, you agree to our terms and conditions. A confirmation email will be sent to you shortly.</p>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-cancel" onClick={onClose}>Cancel</button>
          <button className="btn-confirm" onClick={handleConfirm}>Confirm Booking</button>
        </div>
      </div>
    </div>
  );
}
