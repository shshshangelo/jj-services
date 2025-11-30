import React, { useState } from "react";
import LocationMapPreview from "./LocationMapPreview";

export default function Step1_Locations({ next, data, setData }) {
  const [pickupCoords, setPickupCoords] = useState(data.pickupCoords || null);
  const [dropoffCoords, setDropoffCoords] = useState(data.dropoffCoords || null);

  const handlePickupCoords = (coords, address) => {
    setPickupCoords(coords);
    setData({ 
      pickupCoords: coords,
      pickup: address || (coords ? `${coords.lat.toFixed(6)}, ${coords.lng.toFixed(6)}` : '')
    });
  };

  const handleDropoffCoords = (coords, address) => {
    setDropoffCoords(coords);
    setData({ 
      dropoffCoords: coords,
      dropoff: address || (coords ? `${coords.lat.toFixed(6)}, ${coords.lng.toFixed(6)}` : '')
    });
  };

  return (
    <div className="step-card">
      <h2 className="step-title">Where would you like to go?</h2>
      <p className="step-subtitle">Tap on the map to set your pickup (A) and dropoff (B) locations</p>

      <LocationMapPreview
        pickupCoords={pickupCoords}
        dropoffCoords={dropoffCoords}
        pickupAddress={data.pickup}
        dropoffAddress={data.dropoff}
        onPickupSelect={handlePickupCoords}
        onDropoffSelect={handleDropoffCoords}
        onMapClose={() => {}} // Map always visible, no close needed
        alwaysVisible={true}
      />

      <div className="btn-row">
        <button
          className="next-btn"
          onClick={next}
          disabled={!pickupCoords || !dropoffCoords}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
