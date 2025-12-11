import React from "react";

const VEHICLE_RATES = {
  Sedan: 6.50,
  SUV: 8.50,
  Executive: 10.50,
  "Sprinter Bus": 12.50
};

const vehicles = [
  {
    name: "Sedan",
    img: "/Sedan/1.jpeg"
  },
  {
    name: "SUV",
    img: "/thumbnail/SUV.jpeg"
  },
  {
    name: "Executive",
    img: "/thumbnail/Executive.jpeg"
  },
  {
    name: "Sprinter Bus",
    img: "/thumbnail/Sprinter.jpeg"
  }
];

export default function Vehicle({ next, back, data, setData }) {
  const handleVehicleSelect = (vehicle) => {
    setData({
      vehicle: vehicle.name
    });
  };

  return (
    <div className="step-card">
      <h2 className="step-title">Choose Your Vehicle</h2>
      <p className="step-subtitle">
        Select the vehicle type that best fits your group and comfort level.
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
            <div className="vehicle-rate">${VEHICLE_RATES[v.name]}/km</div>
          </div>
        ))}
      </div>

      <p style={{ color: "#d14343", fontWeight: 600, marginTop: "8px" }}>
        Note: No smoking, vaping, illicit substances, or open alcohol in the vehicle. A cleaning fee will apply for spills or damage.
      </p>

      <div className="btn-row">
        <button className="back-btn" onClick={back}>Back</button>
        <button className="next-btn" onClick={next} disabled={!data.vehicle}>Next</button>
      </div>
    </div>
  );
}

