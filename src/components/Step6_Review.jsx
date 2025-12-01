import React, { useState } from "react";
import BookingConfirmationModal from "./BookingConfirmationModal";

export default function Step6_Review({ back, data }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

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

        <div className="review-section">
          <h3 className="review-section-title">Trip Details</h3>
          <div className="review-row">
            <strong>Pickup:</strong> {data.pickup || (data.pickupCoords ? `${data.pickupCoords.lat.toFixed(6)}, ${data.pickupCoords.lng.toFixed(6)}` : "—")}
          </div>
          <div className="review-row">
            <strong>Dropoff:</strong> {data.dropoff || (data.dropoffCoords ? `${data.dropoffCoords.lat.toFixed(6)}, ${data.dropoffCoords.lng.toFixed(6)}` : "—")}
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
        </div>

        <div className="btn-row">
          <button className="back-btn" onClick={back}>Back</button>
          <button className="next-btn" onClick={() => setIsModalOpen(true)}>Confirm Booking</button>
        </div>
      </div>

      <BookingConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        bookingData={data}
      />
    </>
  );
}
