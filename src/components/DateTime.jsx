import React from "react";

export default function DateTime({ next, back, data, setData }) {
  const today = new Date().toISOString().split("T")[0];

  const handlePassengersChange = (e) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 2); // Limit to 2 digits
    const num = raw ? parseInt(raw, 10) : "";
    // Limit to maximum 50
    const maxPassengers = num === "" ? "" : Math.min(50, Math.max(1, num));
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
    // Only accept values from the date picker (format: YYYY-MM-DD)
    const value = e.target.value;
    if (!value) {
      setData({ date: "" });
      return;
    }
    // Validate format - should be YYYY-MM-DD from picker
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
      setData({ date: value });
    } else {
      // If invalid format, revert to previous value
      e.target.value = data.date || "";
    }
  };

  const handleTimeChange = (e) => {
    // Only accept values from the time picker (format: HH:MM)
    const value = e.target.value;
    if (!value) {
      setData({ time: "" });
      return;
    }
    // Validate format - should be HH:MM from picker
    if (/^\d{2}:\d{2}$/.test(value)) {
      setData({ time: value });
    } else {
      // If invalid format, revert to previous value
      e.target.value = data.time || "";
    }
  };

  return (
    <div className="step-card">
      <h2 className="step-title">Select Date & Time</h2>
      <p className="step-subtitle">
        Choose the date and time for your trip, then tell us how many passengers will be traveling.
        We'll only let you continue if the time is in the future.
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
        onKeyDown={(e) => {
          // Prevent typing - only allow navigation and picker opening
          if (e.key !== 'Tab' && e.key !== 'Enter' && !e.key.startsWith('Arrow') && e.key !== 'Escape') {
            e.preventDefault();
          }
        }}
        onInput={(e) => {
          // Prevent manual input - only allow picker selection
          const value = e.target.value;
          if (value && !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
            e.target.value = data.date || "";
          }
        }}
        onPaste={(e) => {
          e.preventDefault();
        }}
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
        onChange={handleTimeChange}
        onKeyDown={(e) => {
          // Prevent typing - only allow navigation and picker opening
          if (e.key !== 'Tab' && e.key !== 'Enter' && !e.key.startsWith('Arrow') && e.key !== 'Escape') {
            e.preventDefault();
          }
        }}
        onInput={(e) => {
          // Prevent manual input - only allow picker selection
          const value = e.target.value;
          if (value && !/^\d{2}:\d{2}$/.test(value)) {
            e.target.value = data.time || "";
          }
        }}
        onPaste={(e) => {
          e.preventDefault();
        }}
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
        max={50}
        className="input-field"
        value={data.passengers || ""}
        onChange={handlePassengersChange}
        inputMode="numeric"
        pattern="[0-9]*"
        onKeyDown={(e) => {
          // Prevent non-numeric characters like minus, plus, exponent, and dot
          const blockedKeys = ['e', 'E', '+', '-', '.', ','];
          if (blockedKeys.includes(e.key)) {
            e.preventDefault();
          }
        }}
        placeholder="Enter number of passengers (max 50)"
      />

      <div className="btn-row">
        <button className="back-btn" onClick={back}>Back</button>
        <button
          className="next-btn"
          onClick={next}
          disabled={
            !isValidFutureDateTime() ||
            !data.passengers ||
            Number(data.passengers) <= 0 ||
            Number(data.passengers) > 50
          }
        >
          Next
        </button>
      </div>
    </div>
  );
}

