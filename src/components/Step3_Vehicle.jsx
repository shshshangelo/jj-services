import React from "react";

const vehicles = [
  { name: "Sedan", price: 55, img: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" },
  { name: "SUV", price: 80, img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" },
  { name: "Luxury Van", price: 120, img: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" },
  { name: "Stretch Limousine", price: 200, img: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" },
  { name: "Executive Sedan", price: 75, img: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" },
  { name: "Party Bus", price: 250, img: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" }
];

export default function Step3_Vehicle({ next, back, data, setData }) {
  const handleVehicleSelect = (vehicle) => {
    const addonsList = [
      { name: "Bottled Water", price: 5 },
      { name: "Child Seat", price: 15 },
      { name: "Extra Luggage", price: 10 },
      { name: "WiFi Access", price: 8 },
      { name: "Newspaper/Magazine", price: 3 },
      { name: "Champagne Service", price: 25 },
      { name: "Meet & Greet", price: 20 },
      { name: "Flight Tracking", price: 0 },
      { name: "Others", price: 0 }
    ];
    
    // Calculate extras price
    const extrasPrice = (data.addons || []).reduce((sum, addonName) => {
      const addon = addonsList.find(a => a.name === addonName);
      return sum + (addon ? addon.price : 0);
    }, 0);
    
    // Set vehicle and total price (base + extras)
    setData({ 
      vehicle: vehicle.name, 
      price: vehicle.price + extrasPrice 
    });
  };

  return (
    <div className="step-card">
      <h2 className="step-title">Choose Your Vehicle</h2>

      <div className="vehicle-grid">
        {vehicles.map((v) => (
          <div
            key={v.name}
            className={`vehicle-card ${data.vehicle === v.name ? 'selected' : ''}`}
            onClick={() => handleVehicleSelect(v)}
          >
            <img src={v.img} alt={v.name} className="vehicle-img" />
            <div className="vehicle-name">{v.name}</div>
            <div className="price">${v.price} <small style={{fontSize: '12px', color: '#64748b'}}>US SRP</small></div>
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
