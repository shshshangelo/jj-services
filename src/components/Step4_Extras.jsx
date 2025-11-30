import React from "react";

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

export default function Step4_Extras({ next, back, data, setData }) {
  // Get base vehicle price
  const getVehiclePrice = () => {
    const vehiclePrices = {
      "Sedan": 55,
      "SUV": 80,
      "Luxury Van": 120,
      "Stretch Limousine": 200,
      "Executive Sedan": 75,
      "Party Bus": 250
    };
    return vehiclePrices[data.vehicle] || 0;
  };

  const toggleAddon = (addon) => {
    let updated = [...data.addons];
    if (updated.includes(addon.name)) {
      updated = updated.filter((a) => a !== addon.name);
    } else {
      updated.push(addon.name);
    }
    const basePrice = getVehiclePrice();
    const extraPrice = updated.reduce((sum, name) => {
      const item = addonsList.find(a => a.name === name);
      return sum + (item ? item.price : 0);
    }, 0);
    setData({ addons: updated, price: basePrice + extraPrice });
  };

  return (
    <div className="step-card">
      <h2 className="step-title">Add Extras</h2>

      <div className="addons-grid">
        {addonsList.map((addon) => (
          <div
            key={addon.name}
            className={`addon-card ${data.addons && data.addons.includes(addon.name) ? 'selected' : ''}`}
            onClick={() => toggleAddon(addon)}
          >
            <div className="addon-name">{addon.name}</div>
            <div className="addon-price">
              {addon.price > 0 ? `$${addon.price} US SRP` : 'Free'}
            </div>
          </div>
        ))}
      </div>

      <div className="btn-row">
        <button className="back-btn" onClick={back}>Back</button>
        <button className="next-btn" onClick={next}>Next</button>
      </div>
    </div>
  );
}
