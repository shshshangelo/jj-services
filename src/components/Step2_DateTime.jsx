import React from "react";

export default function Step2_DateTime({ next, back, data, setData }) {
  return (
    <div className="step-card">
      <h2 className="step-title">Select Date & Time</h2>

      <input
        type="date"
        className="input-field"
        value={data.date}
        onChange={(e) => setData({ date: e.target.value })}
      />

      <input
        type="time"
        className="input-field"
        value={data.time}
        onChange={(e) => setData({ time: e.target.value })}
      />

      <label className="label">Passengers</label>
      <select
        className="input-field"
        value={data.passengers}
        onChange={(e) => setData({ passengers: Number(e.target.value) })}
      >
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
      </select>

      <div className="btn-row">
        <button className="back-btn" onClick={back}>Back</button>
        <button
          className="next-btn"
          onClick={next}
          disabled={!data.date || !data.time}
        >
          Next
        </button>
      </div>
    </div>
  );
}
