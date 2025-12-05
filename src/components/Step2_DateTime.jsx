import React from "react";

export default function Step2_DateTime({ next, back, data, setData }) {
  const today = new Date().toISOString().split("T")[0];

  const handlePassengersChange = (e) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 2); // Limit to 2 digits
    const num = raw ? parseInt(raw, 10) : "";
    // Limit to maximum 99
    const maxPassengers = num === "" ? "" : Math.min(99, Math.max(1, num));
    setData({ passengers: maxPassengers });
  };

  const isValidFutureDate = () => {
    if (!data.date) return false;
    const picked = new Date(data.date);
    if (Number.isNaN(picked.getTime())) return false;
    const todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0);
    picked.setHours(0, 0, 0, 0);
    return picked >= todayDate;
  };

  const isValidFutureDateTime = () => {
    if (!isValidFutureDate() || !data.time) return false;
    const [hStr, mStr] = data.time.split(":");
    const h = parseInt(hStr, 10);
    const m = parseInt(mStr, 10);
    if (Number.isNaN(h) || Number.isNaN(m)) return false;

    const picked = new Date(data.date);
    if (Number.isNaN(picked.getTime())) return false;
    picked.setHours(h, m, 0, 0);

    const now = new Date();
    return picked >= now;
  };

  const handleDateChange = (e) => {
    // Sanitize date input and ensure year component is max 4 digits.
    const raw = String(e.target.value || "");
    if (!raw) return setData({ date: "" });

    // Allow digits and dashes only
    const cleaned = raw.replace(/[^0-9-]/g, "");

    let normalized = cleaned;

    if (cleaned.includes("-")) {
      const parts = cleaned.split("-").map((p) => p);
      parts[0] = (parts[0] || "").slice(0, 4); // year
      if (parts.length > 1) parts[1] = (parts[1] || "").slice(0, 2); // month
      if (parts.length > 2) parts[2] = (parts[2] || "").slice(0, 2); // day
      // Rebuild but keep trailing parts if present
      normalized = parts.filter((p, i) => p !== "" || i === 0).join("-");
    } else {
      // digits-only input: try to map YYYYMMDD -> YYYY-MM-DD progressively
      const digits = cleaned;
      if (digits.length <= 4) {
        normalized = digits.slice(0, 4); // partial year
      } else if (digits.length <= 6) {
        normalized = `${digits.slice(0,4)}-${digits.slice(4)}`; // YYYY-MM
      } else {
        normalized = `${digits.slice(0,4)}-${digits.slice(4,6)}-${digits.slice(6,8)}`; // YYYY-MM-DD
      }
    }

    setData({ date: normalized });
  };

  return (
    <div className="step-card">
      <h2 className="step-title">Select Date & Time</h2>
      <p className="step-subtitle">
        Choose the date and time for your trip, then tell us how many passengers will be traveling.
        We’ll only let you continue if the time is in the future.
      </p>

      <label className="label">
        Date
        <span className={`required-asterisk ${data.date ? 'hidden' : ''}`}>*</span>
      </label>
      <input
        type="date"
        className="input-field"
        value={data.date}
        min={today}
        onChange={handleDateChange}
      />
      {data.date && !isValidFutureDate() && (
        <p className="location-error">Please select today or a future date.</p>
      )}

      <label className="label">
        Time
        <span className={`required-asterisk ${data.time ? 'hidden' : ''}`}>*</span>
      </label>
      <input
        type="time"
        className="input-field"
        value={data.time}
        onChange={(e) => setData({ time: e.target.value })}
      />
      {data.time && isValidFutureDate() && !isValidFutureDateTime() && (
        <p className="location-error">Please select a time in the future.</p>
      )}

      <label className="label">
        Passengers
        <span className={`required-asterisk ${data.passengers ? 'hidden' : ''}`}>*</span>
      </label>
      <input
        type="number"
        min={1}
        max={99}
        className="input-field"
        value={data.passengers || ""}
        onChange={handlePassengersChange}
        placeholder="Enter number of passengers"
      />

      <div className="btn-row">
        <button className="back-btn" onClick={back}>Back</button>
        <button
          className="next-btn"
          onClick={next}
          disabled={!isValidFutureDateTime()}
        >
          Next
        </button>
      </div>
    </div>
  );
}
