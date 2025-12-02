import React from "react";

export default function Step2_DateTime({ next, back, data, setData }) {
  const today = new Date().toISOString().split("T")[0];

  const getPassengersSelectValue = () => {
    if (!data.passengers || data.passengers < 1) return "";
    if (data.passengers >= 1 && data.passengers <= 6) return data.passengers;
    return "other";
  };

  const handlePassengersSelect = (e) => {
    const value = e.target.value;
    if (value === "") {
      // user selected placeholder — clear to empty (no default)
      setData({ passengers: "" });
      return;
    }

    if (value === "other") {
      // Keep existing passengers value, just switch UI to custom input
      if (!data.passengers || data.passengers <= 6) {
        setData({ passengers: 7 });
      }
    } else {
      setData({ passengers: Number(value) });
    }
  };

  const handleCustomPassengers = (e) => {
    const raw = e.target.value.replace(/\D/g, "");
    const num = raw ? parseInt(raw, 10) : "";
    setData({ passengers: num === "" ? "" : Math.max(1, num) });
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

      <input
        type="date"
        className="input-field"
        value={data.date}
        min={today}
        onChange={handleDateChange}
      />
      {data.date && !isValidFutureDate() && (
        <p className="location-error">Please choose today or a future date.</p>
      )}

      <input
        type="time"
        className="input-field"
        value={data.time}
        onChange={(e) => setData({ time: e.target.value })}
      />
      {data.time && isValidFutureDate() && !isValidFutureDateTime() && (
        <p className="location-error">Please choose a time in the future.</p>
      )}

      <label className="label">Passengers</label>
      <select
        className="input-field"
        value={getPassengersSelectValue()}
        onChange={handlePassengersSelect}
      >
        <option value="">Select number of passengers</option>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
        <option value={6}>6</option>
        <option value="other">Other...</option>
      </select>

      {getPassengersSelectValue() === "other" && (
        <>
          <label className="label">Custom Passengers</label>
          <input
            type="number"
            min={1}
            className="input-field"
            value={data.passengers && data.passengers > 6 ? data.passengers : ""}
            onChange={handleCustomPassengers}
            placeholder="Enter number of passengers"
          />
        </>
      )}

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
