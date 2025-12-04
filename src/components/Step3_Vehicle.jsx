import React from "react";

// December 2025 example SRP: base + per‑km rate by vehicle type
const FARE_TABLE = {
  Sedan: { base: 35, perKm: 2.25 },
  SUV: { base: 45, perKm: 2.75 },
  Executive: { base: 60, perKm: 3.25 },
  Bus: { base: 90, perKm: 3.75 }
};

const vehicles = [
  {
    name: "Sedan",
    img: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  },
  {
    name: "SUV",
    img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  },
  {
    name: "Executive",
    img: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  },
  {
    name: "Bus",
    img: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  }
];

function calculateFare(vehicleName, distanceKm) {
  const km = Math.max(0, distanceKm || 0);
  const config = FARE_TABLE[vehicleName];
  if (!config) return 0;
  const raw = config.base + config.perKm * km;
  return Math.round(raw); // round to nearest USD
}

export default function Step3_Vehicle({ next, back, data, setData }) {
  const handleVehicleSelect = (vehicle) => {
    // Set vehicle and distance-based SRP price
    const distanceKm = data.distanceKm || 0;
    const price = calculateFare(vehicle.name, distanceKm);
    setData({
      vehicle: vehicle.name,
      price
    });
  };

  return (
    <div className="step-card">
      <h2 className="step-title">Choose Your Vehicle</h2>
      <p className="step-subtitle">
        Select the vehicle type that best fits your group and comfort level. Your estimated fare is
        calculated automatically from the distance and the vehicle you choose.
      </p>

      <div className="vehicle-grid">
        {vehicles.map((v) => (
          <div
            key={v.name}
            className={`vehicle-card ${data.vehicle === v.name ? 'selected' : ''}`}
            onClick={() => handleVehicleSelect(v)}
          >
            <img src={v.img} alt={v.name} className="vehicle-img" loading="lazy" decoding="async" />
            <div className="vehicle-name">{v.name}</div>
          </div>
        ))}
      </div>

      <div className="btn-row">
        <button className="back-btn" onClick={back}>Back</button>
        <button className="next-btn" onClick={next} disabled={!data.vehicle}>Next</button>
      </div>
    </div>
  );
}
