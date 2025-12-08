import React from "react";

const vehicles = [
  {
    name: "Sedan",
    img: "/assets/Sedan.png"
  },
  {
    name: "SUV",
    img: "/assets/SUV.png"
  },
  {
    name: "Executive",
    img: "/assets/Executive.png"
  },
  {
    name: "Sprinter Bus",
    img: "/assets/Sprinter Bus.png"
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
        Select the vehicle type that best fits your group and comfort level. Our driver will contact you to discuss pricing and finalize your booking.
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

