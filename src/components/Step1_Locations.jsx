import React, { useState, useEffect } from "react";
import LocationMapPreview from "./LocationMapPreview";
import { estimateDistanceKm } from "../utils";

export default function Step1_Locations({ next, data, setData }) {
  const [pickupCoords, setPickupCoords] = useState(data.pickupCoords || null);
  const [dropoffCoords, setDropoffCoords] = useState(data.dropoffCoords || null);
  const [pickupSearch, setPickupSearch] = useState(data.pickup || "");
  const [dropoffSearch, setDropoffSearch] = useState(data.dropoff || "");
  const [pickupLoading, setPickupLoading] = useState(false);
  const [dropoffLoading, setDropoffLoading] = useState(false);
  const [pickupError, setPickupError] = useState("");
  const [dropoffError, setDropoffError] = useState("");
  const [pickupResults, setPickupResults] = useState([]);
  const [dropoffResults, setDropoffResults] = useState([]);

  const handlePickupCoords = (coords, address) => {
    setPickupCoords(coords);
    setData({ 
      pickupCoords: coords,
      pickup: address || (coords ? `${coords.lat.toFixed(6)}, ${coords.lng.toFixed(6)}` : "")
    });
    setPickupSearch(address || (coords ? `${coords.lat.toFixed(6)}, ${coords.lng.toFixed(6)}` : ""));
    setPickupError("");
    setPickupResults([]);
  };

  const handleDropoffCoords = (coords, address) => {
    setDropoffCoords(coords);
    setData({ 
      dropoffCoords: coords,
      dropoff: address || (coords ? `${coords.lat.toFixed(6)}, ${coords.lng.toFixed(6)}` : "")
    });
    setDropoffSearch(address || (coords ? `${coords.lat.toFixed(6)}, ${coords.lng.toFixed(6)}` : ""));
    setDropoffError("");
    setDropoffResults([]);
  };

  const handleLocationSearch = async (type) => {
    const isPickup = type === 'pickup';
    const query = (isPickup ? pickupSearch : dropoffSearch).trim();

    if (!query) {
      (isPickup ? setPickupError : setDropoffError)("Please enter an address or landmark.");
      return;
    }

    (isPickup ? setPickupLoading : setDropoffLoading)(true);
    (isPickup ? setPickupError : setDropoffError)("");

    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&limit=5&addressdetails=1&q=${encodeURIComponent(query)}`;
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'J&J Limo Services Booking App'
        }
      });
      const results = await response.json();

      if (!results || results.length === 0) {
        (isPickup ? setPickupError : setDropoffError)("No results found. Please try a different address.");
        (isPickup ? setPickupResults : setDropoffResults)([]);
        return;
      }

      (isPickup ? setPickupResults : setDropoffResults)(results);
    } catch (error) {
      console.error("Search error:", error);
      (isPickup ? setPickupError : setDropoffError)("Something went wrong. Please try again.");
      (isPickup ? setPickupResults : setDropoffResults)([]);
    } finally {
      (isPickup ? setPickupLoading : setDropoffLoading)(false);
    }
  };

  const handleSelectResult = (type, result) => {
    const coords = {
      lat: parseFloat(result.lat),
      lng: parseFloat(result.lon)
    };
    const fullAddress = result.display_name;
    if (type === 'pickup') {
      handlePickupCoords(coords, fullAddress);
      setPickupResults([]);
    } else {
      handleDropoffCoords(coords, fullAddress);
      setDropoffResults([]);
    }
  };

  // Automatically get user's location and fill pickup when permission is granted
  useEffect(() => {
    // Only auto-fill if pickup is not already set and geolocation is available
    if (pickupCoords || !navigator.geolocation) return;

    let isMounted = true;

    // Request location permission and auto-fill pickup
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        if (!isMounted) return;
        
        const { latitude, longitude } = position.coords;
        
        try {
          // Reverse geocode to get address
          const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`;
          const response = await fetch(url, {
            headers: {
              'User-Agent': 'J&J Limo Services Booking App'
            }
          });
          const geocodeData = await response.json();
          
          if (geocodeData.display_name && isMounted && !pickupCoords) {
            // Auto-fill pickup location
            handlePickupCoords(
              { lat: latitude, lng: longitude },
              geocodeData.display_name
            );
          }
        } catch (err) {
          console.error('Auto-fill location error:', err);
          // Silently fail - user can still enter manually
        }
      },
      () => {
        // Permission denied or error - silently fail, user can enter manually
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );

    return () => {
      isMounted = false;
    };
  }, []); // Only run once on mount

  // Whenever both pickup and dropoff are set, estimate distance in km.
  // We intentionally depend only on the coordinates here to avoid a render loop.
  useEffect(() => {
    if (pickupCoords && dropoffCoords) {
      const km = estimateDistanceKm(pickupCoords, dropoffCoords);
      setData({ distanceKm: km });
    } else {
      setData({ distanceKm: 0 });
    }
  }, [pickupCoords, dropoffCoords]);

  const clearLocation = (type) => {
    if (type === 'pickup') {
      setPickupCoords(null);
      setPickupSearch("");
      setData({ pickupCoords: null, pickup: "" });
      setPickupResults([]);
    } else {
      setDropoffCoords(null);
      setDropoffSearch("");
      setData({ dropoffCoords: null, dropoff: "" });
      setDropoffResults([]);
    }
  };

  return (
    <div className="step-card">
      <h2 className="step-title">Where would you like to go?</h2>
      <p className="step-subtitle">
        Search for your pickup and dropoff locations above, then click <strong>Search</strong> to place them on the map. 
        If search can&apos;t find an exact match, you can still tap directly on the map to fine‑tune the location.
      </p>

      <div className="location-search-section">
        <div className="location-search-card">
          <div className="location-search-header">
            <label>Pickup Location</label>
            {pickupCoords && (
              <button type="button" className="link-btn" onClick={() => clearLocation('pickup')}>
                Clear
              </button>
            )}
          </div>
          <div className="location-search-input">
            <input
              type="text"
              value={pickupSearch}
              placeholder="Enter address, airport, or landmark"
              onChange={(e) => setPickupSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleLocationSearch('pickup');
                }
              }}
            />
            <button
              type="button"
              onClick={() => handleLocationSearch('pickup')}
              disabled={pickupLoading}
            >
              {pickupLoading ? 'Searching...' : 'Search'}
            </button>
          </div>
          {pickupError && <p className="location-error">{pickupError}</p>}
          {pickupCoords && (
            <p className="location-coords">
              {pickupCoords.lat.toFixed(4)}, {pickupCoords.lng.toFixed(4)}
            </p>
          )}
          {pickupResults.length > 0 && (
            <ul className="location-search-results">
              {pickupResults.map((result) => (
                <li key={result.place_id}>
                  <button type="button" onClick={() => handleSelectResult('pickup', result)}>
                    <span className="result-title">{result.display_name}</span>
                    {result.address && (
                      <span className="result-subtitle">
                        {result.address.road || result.address.neighbourhood || result.address.suburb || ''}
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="location-search-card">
          <div className="location-search-header">
            <label>Dropoff Location</label>
            {dropoffCoords && (
              <button type="button" className="link-btn" onClick={() => clearLocation('dropoff')}>
                Clear
              </button>
            )}
          </div>
          <div className="location-search-input">
            <input
              type="text"
              value={dropoffSearch}
              placeholder="Enter address, airport, or landmark"
              onChange={(e) => setDropoffSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleLocationSearch('dropoff');
                }
              }}
            />
            <button
              type="button"
              onClick={() => handleLocationSearch('dropoff')}
              disabled={dropoffLoading}
            >
              {dropoffLoading ? 'Searching...' : 'Search'}
            </button>
          </div>
          {dropoffError && <p className="location-error">{dropoffError}</p>}
          {dropoffCoords && (
            <p className="location-coords">
              {dropoffCoords.lat.toFixed(4)}, {dropoffCoords.lng.toFixed(4)}
            </p>
          )}
          {dropoffResults.length > 0 && (
            <ul className="location-search-results">
              {dropoffResults.map((result) => (
                <li key={result.place_id}>
                  <button type="button" onClick={() => handleSelectResult('dropoff', result)}>
                    <span className="result-title">{result.display_name}</span>
                    {result.address && (
                      <span className="result-subtitle">
                        {result.address.road || result.address.neighbourhood || result.address.suburb || ''}
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

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
