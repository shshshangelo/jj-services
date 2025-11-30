import React, { useState, useEffect, useRef } from "react";

export default function LocationAutocomplete({ label, value, onSelect, coordinates, onCoordinatesChange }) {
  const [suggestions, setSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const debounceTimer = useRef(null);

  // Debounced search function
  const searchLocation = async (query) => {
    if (!query || query.length < 2) {
      setSuggestions([]);
      return;
    }

    setIsSearching(true);
    try {
      // Use OpenStreetMap Nominatim API (no API key required)
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=8&addressdetails=1`;
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'J&J Limo Services Booking App'
        }
      });
      const data = await response.json();
      
      // Format suggestions with better display
      const formatted = data.map(item => ({
        ...item,
        formatted: formatLocationName(item)
      }));
      setSuggestions(formatted);
    } catch (err) {
      console.error('Location search error:', err);
      setSuggestions([]);
    } finally {
      setIsSearching(false);
    }
  };

  // Format location name for better display
  const formatLocationName = (item) => {
    const parts = [];
    if (item.address) {
      if (item.address.road || item.address.street) {
        parts.push(item.address.road || item.address.street);
      }
      if (item.address.house_number) {
        parts[0] = `${item.address.house_number} ${parts[0] || ''}`.trim();
      }
      if (item.address.city || item.address.town || item.address.village) {
        parts.push(item.address.city || item.address.town || item.address.village);
      }
      if (item.address.state) {
        parts.push(item.address.state);
      }
      if (item.address.postcode) {
        parts.push(item.address.postcode);
      }
    }
    return parts.length > 0 ? parts.join(', ') : item.display_name;
  };

  // Handle input change with debouncing
  const handleInputChange = (e) => {
    const query = e.target.value;
    onSelect(query);
    
    // Clear coordinates if input is cleared
    if (!query || query.trim() === '') {
      if (onCoordinatesChange) {
        onCoordinatesChange(null);
      }
      setSuggestions([]);
      return;
    }
    
    // Clear previous timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    
    // Set new timer for debounced search
    debounceTimer.current = setTimeout(() => {
      searchLocation(query);
    }, 300);
  };

  // Handle suggestion selection
  const handleSuggestionSelect = (suggestion) => {
    const locationData = {
      name: suggestion.formatted || suggestion.display_name,
      fullName: suggestion.display_name,
      lat: parseFloat(suggestion.lat),
      lng: parseFloat(suggestion.lon),
      address: suggestion.address
    };
    
    onSelect(locationData.name);
    if (onCoordinatesChange) {
      onCoordinatesChange({ lat: locationData.lat, lng: locationData.lng });
    }
    setSuggestions([]);
  };

  // Get current location using browser geolocation
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }

    setIsSearching(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          // Reverse geocode to get address
          const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`;
          const response = await fetch(url, {
            headers: {
              'User-Agent': 'J&J Limo Services Booking App'
            }
          });
          const data = await response.json();
          
          if (data.display_name) {
            const locationData = {
              name: formatLocationName(data) || data.display_name,
              fullName: data.display_name,
              lat: latitude,
              lng: longitude,
              address: data.address
            };
            
            onSelect(locationData.name);
            if (onCoordinatesChange) {
              onCoordinatesChange({ lat: latitude, lng: longitude });
            }
          }
        } catch (err) {
          console.error('Reverse geocoding error:', err);
          // Fallback: use coordinates as location name
          onSelect(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
          if (onCoordinatesChange) {
            onCoordinatesChange({ lat: latitude, lng: longitude });
          }
        } finally {
          setIsSearching(false);
        }
      },
      (error) => {
        setIsSearching(false);
        alert('Unable to retrieve your location. Please enter it manually.');
      }
    );
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, []);

  return (
    <div className="autocomplete-wrapper">
      <div className="autocomplete-header">
        <label className="label">{label}</label>
        <button
          type="button"
          className="location-pin-btn"
          onClick={getCurrentLocation}
          title="Use current location"
          disabled={isSearching}
        >
          📍 {isSearching ? 'Locating...' : 'Use My Location'}
        </button>
      </div>
      <input
        className="input-field"
        value={typeof value === 'object' ? value?.name || '' : value || ''}
        onChange={handleInputChange}
        placeholder={`Enter ${label} or click pin to use current location`}
        disabled={isSearching}
      />
      
      {isSearching && suggestions.length === 0 && (
        <div className="suggestions-box">
          <div className="suggestion-item" style={{ color: '#64748b', fontStyle: 'italic' }}>
            Searching...
          </div>
        </div>
      )}

      {suggestions.length > 0 && (
        <div className="suggestions-box">
          {suggestions.map((s) => (
            <div
              key={s.place_id}
              className="suggestion-item"
              onClick={() => handleSuggestionSelect(s)}
            >
              <div className="suggestion-main">{s.formatted || s.display_name}</div>
              {s.address && (s.address.city || s.address.state) && (
                <div className="suggestion-details">
                  {[s.address.city, s.address.state, s.address.postcode].filter(Boolean).join(', ')}
                </div>
              )}
              <div className="suggestion-coords">
                📍 {parseFloat(s.lat).toFixed(4)}, {parseFloat(s.lon).toFixed(4)}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {coordinates && (
        <div className="coordinates-display">
          <small>📍 Coordinates: {coordinates.lat?.toFixed(6)}, {coordinates.lng?.toFixed(6)}</small>
        </div>
      )}
    </div>
  );
}
