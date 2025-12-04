import React, { useState } from "react";
import BookingConfirmationModal from "./BookingConfirmationModal";

export default function Step6_Review({ back, data }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleConfirmClick = () => {
    // Show a short loading state to simulate processing before showing confirmation
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsModalOpen(true);
    }, 1200);
  };

  const formatTime = (time) => {
    if (!time) return "—";
    const [hStr, mStr] = time.split(":");
    const h = parseInt(hStr, 10);
    if (Number.isNaN(h)) return time;
    const suffix = h >= 12 ? "PM" : "AM";
    const hour12 = h % 12 === 0 ? 12 : h % 12;
    return `${hour12}:${mStr} ${suffix}`;
  };

  return (
    <>
      <div className="step-card">
        <h2 className="step-title">Review Your Booking</h2>
        <p className="step-subtitle">
          Please double‑check all trip and contact details below. If something looks wrong, go back
          and edit it before you confirm your booking. Payment is collected by J&amp;J Limo Services
          on the day of your trip.
        </p>

        <div className="review-section">
          <h3 className="review-section-title">Trip Details</h3>
          <div className="review-row">
            <strong>Pickup:</strong> {data.pickup || (data.pickupCoords ? `${data.pickupCoords.lat.toFixed(6)}, ${data.pickupCoords.lng.toFixed(6)}` : "—")}
          </div>
          <div className="review-row">
            <strong>Dropoff:</strong> {data.dropoff || (data.dropoffCoords ? `${data.dropoffCoords.lat.toFixed(6)}, ${data.dropoffCoords.lng.toFixed(6)}` : "—")}
          </div>
          <div className="review-row">
            <strong>Distance:</strong>{" "}
            {data.distanceKm ? `${data.distanceKm.toFixed(1)} km` : "—"}
          </div>
          <div className="review-row"><strong>Date:</strong> {data.date || "—"}</div>
          <div className="review-row"><strong>Time:</strong> {formatTime(data.time)}</div>
       
          <div className="review-row"><strong>Vehicle:</strong> {data.vehicle || "—"}</div>
          <div className="review-row"><strong>Passengers:</strong> {data.passengers}</div>
        </div>

        <div className="review-section">
          <h3 className="review-section-title">Contact Information</h3>
          <div className="review-row"><strong>Name:</strong> {data.customerName || "—"}</div>
          <div className="review-row"><strong>Phone:</strong> {data.phone || "—"}</div>
          <div className="review-row"><strong>Email:</strong> {data.email || "—"}</div>
        </div>

        <div className="total-box">
          <div>
            <strong>Estimated fare (distance-based)</strong>
            <div className="muted">
              Calculated from your trip distance (km) and selected vehicle.</div>
          </div>
          <div className="total-value">${data.price || 0}</div>
        </div>

        <div className="btn-row">
          <button className="back-btn" onClick={back} disabled={isSubmitting}>
            Back
          </button>
          <button
            className="next-btn"
            onClick={handleConfirmClick}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Confirming..." : "Confirm"}
          </button>
        </div>
      </div>

      {isSubmitting && (
        <div className="page-loading-overlay">
          <div className="page-loading-card">
            <div className="page-loading-spinner" />
            <p>Confirming your booking…</p>
          </div>
        </div>
      )}

      <BookingConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        bookingData={data}
      />
    </>
  );
}
