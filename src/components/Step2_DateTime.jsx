import React from "react";

export default function Step2_DateTime({ next, back, data, setData }) {
  const today = new Date().toISOString().split("T")[0];

  const getPassengersSelectValue = () => {
    if (!data.passengers || data.passengers < 1) return 1;
    if (data.passengers >= 1 && data.passengers <= 6) return data.passengers;
    return "other";
  };

  const handlePassengersSelect = (e) => {
    const value = e.target.value;
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
    setData({ passengers: num === "" ? 1 : Math.max(1, num) });
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

  return (
    <div className="step-card">
      <h2 className="step-title">Select Date & Time</h2>

      <input
        type="date"
        className="input-field"
        value={data.date}
        min={today}
        onChange={(e) => setData({ date: e.target.value })}
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
