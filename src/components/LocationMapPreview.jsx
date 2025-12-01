import React, { useEffect, useRef, useState } from "react";
import "./LocationMapPreview.css";

export default function LocationMapPreview({ pickupCoords, dropoffCoords, pickupAddress, dropoffAddress, onPickupSelect, onDropoffSelect, onMapClose, alwaysVisible = false }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const pickupCoordsRef = useRef(pickupCoords);
  const dropoffCoordsRef = useRef(dropoffCoords);
  const [activeLocation, setActiveLocation] = useState(() => {
    if (!pickupCoords) return 'pickup';
    if (!dropoffCoords) return 'dropoff';
    return 'pickup';
  });
  const activeLocationRef = useRef(activeLocation);
  const [pickupMarker, setPickupMarker] = useState(null);
  const [dropoffMarker, setDropoffMarker] = useState(null);
  const [isGeocoding, setIsGeocoding] = useState(false);

  const selectActiveLocation = (location) => {
    setActiveLocation(location);
  };

  // Sync refs with props
  useEffect(() => {
    pickupCoordsRef.current = pickupCoords;
    dropoffCoordsRef.current = dropoffCoords;
  }, [pickupCoords, dropoffCoords]);

  useEffect(() => {
    activeLocationRef.current = activeLocation;
  }, [activeLocation]);

  // Determine which location to set next
  const getNextLocationToSet = () => {
    if (!pickupCoords) return 'pickup';
    if (!dropoffCoords) return 'dropoff';
    return activeLocation;
  };

  // Reverse geocode coordinates to get address
  const reverseGeocode = async (lat, lng) => {
    try {
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`;
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'J&J Limo Services Booking App'
        }
      });
      const data = await response.json();
      return data.display_name || `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
    } catch (err) {
      console.error('Reverse geocoding error:', err);
      return `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
    }
  };

  useEffect(() => {
    if (!mapRef.current) return;

    let isMounted = true;

    // Initialize Leaflet map (no API key required)
    const initializeMap = () => {
      if (!window.L || !isMounted || !mapRef.current) return;
      
      // Check if map already exists
      if (mapInstanceRef.current) {
        return;
      }

      // Determine center and bounds
      let center = [40.7128, -74.0060]; // Default: NYC (or use user's location if available)
      let bounds = null;

      // Try to get user's location for initial map center
      if (navigator.geolocation && !pickupCoords && !dropoffCoords) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            if (isMounted && mapInstanceRef.current) {
              mapInstanceRef.current.setView(
                [position.coords.latitude, position.coords.longitude],
                13
              );
            }
          },
          () => {
            // Use default if geolocation fails
          }
        );
      }

      if (pickupCoords && dropoffCoords) {
        center = [
          (pickupCoords.lat + dropoffCoords.lat) / 2,
          (pickupCoords.lng + dropoffCoords.lng) / 2
        ];
        bounds = [
          [pickupCoords.lat, pickupCoords.lng],
          [dropoffCoords.lat, dropoffCoords.lng]
        ];
      } else if (pickupCoords) {
        center = [pickupCoords.lat, pickupCoords.lng];
      } else if (dropoffCoords) {
        center = [dropoffCoords.lat, dropoffCoords.lng];
      }

      const newMap = window.L.map(mapRef.current).setView(center, 13);

      // Add OpenStreetMap tiles (no API key required)
      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
      }).addTo(newMap);

      mapInstanceRef.current = newMap;

      // Fit bounds if both locations exist
      if (bounds) {
        newMap.fitBounds(bounds, { padding: [50, 50] });
      }

      // Create large, modern pin icons like delivery apps
      const redPinIcon = window.L.divIcon({
        className: 'custom-pin pickup-pin',
        html: `
          <div class="modern-pin pickup-pin-modern">
            <div class="pin-circle pickup">A</div>
            <div class="pin-shadow"></div>
          </div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 40]
      });

      const bluePinIcon = window.L.divIcon({
        className: 'custom-pin dropoff-pin',
        html: `
          <div class="modern-pin dropoff-pin-modern">
            <div class="pin-circle dropoff">B</div>
            <div class="pin-shadow"></div>
          </div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 40]
      });

      // Add markers with colored pins
      if (pickupCoords) {
        const pickup = window.L.marker([pickupCoords.lat, pickupCoords.lng], {
          icon: redPinIcon
        }).addTo(newMap);
        pickup.bindPopup('<strong style="color: #ef4444;">Pickup Location</strong><br>' + 
          pickupCoords.lat.toFixed(6) + ', ' + pickupCoords.lng.toFixed(6));
        setPickupMarker(pickup);
      }

      if (dropoffCoords) {
        const dropoff = window.L.marker([dropoffCoords.lat, dropoffCoords.lng], {
          icon: bluePinIcon
        }).addTo(newMap);
        dropoff.bindPopup('<strong style="color: #3b82f6;">Dropoff Location</strong><br>' + 
          dropoffCoords.lat.toFixed(6) + ', ' + dropoffCoords.lng.toFixed(6));
        setDropoffMarker(dropoff);
      }

      // Add route line if both locations exist
      if (pickupCoords && dropoffCoords) {
        const routeLine = window.L.polyline(
          [[pickupCoords.lat, pickupCoords.lng], [dropoffCoords.lat, dropoffCoords.lng]],
          { color: '#0b6cf2', weight: 3, dashArray: '10, 10' }
        ).addTo(newMap);
      }

      // Store map click handler reference - automatically determines which location to set
      const handleMapClick = async (e) => {
        const { lat, lng } = e.latlng;
        
        // Use refs to get latest state
        const currentPickup = pickupCoordsRef.current;
        const currentDropoff = dropoffCoordsRef.current;
        
        // Determine which location to set based on current state
        let locationToSet = null;
        if (!currentPickup) {
          locationToSet = 'pickup';
        } else if (!currentDropoff) {
          locationToSet = 'dropoff';
        } else {
          locationToSet = activeLocationRef.current || 'pickup';
        }
        
        if (!locationToSet) return;
        
        // Show loading indicator (state setter is stable, safe to use)
        setIsGeocoding(true);
        
        // Reverse geocode to get address
        const address = await reverseGeocode(lat, lng);
        
        setIsGeocoding(false);
        
        if (locationToSet === 'pickup' && onPickupSelect) {
          onPickupSelect({ lat, lng }, address);
          if (!currentDropoff) {
            setActiveLocation('dropoff');
          }
        } else if (locationToSet === 'dropoff' && onDropoffSelect) {
          onDropoffSelect({ lat, lng }, address);
          // Don't auto-close - let user close manually
        }
      };
      
      newMap.on('click', handleMapClick);
    };

    // Load Leaflet if not already loaded
    if (!window.L) {
      // Check if CSS is already loaded
      if (!document.querySelector('link[href*="leaflet"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
        link.crossOrigin = '';
        document.head.appendChild(link);
      }

      // Check if script is already loaded or loading
      const existingScript = document.querySelector('script[src*="leaflet"]');
      if (!existingScript) {
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
        script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
        script.crossOrigin = '';
        script.onload = () => {
          if (isMounted) {
            setTimeout(initializeMap, 100);
          }
        };
        script.onerror = () => {
          console.error('Failed to load Leaflet library');
        };
        document.body.appendChild(script);
      } else {
        // Script is loading, wait for it
        const checkLeaflet = setInterval(() => {
          if (window.L && isMounted) {
            clearInterval(checkLeaflet);
            setTimeout(initializeMap, 100);
          }
        }, 100);
        
        // Cleanup interval after 10 seconds
        setTimeout(() => clearInterval(checkLeaflet), 10000);
      }
    } else {
      // Leaflet already loaded, initialize immediately
      setTimeout(initializeMap, 100);
    }

    return () => {
      isMounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update markers when coordinates change
  useEffect(() => {
    if (!mapInstanceRef.current || !window.L) return;
    const map = mapInstanceRef.current;

    // Remove existing markers
    if (pickupMarker) {
      map.removeLayer(pickupMarker);
      setPickupMarker(null);
    }
    if (dropoffMarker) {
      map.removeLayer(dropoffMarker);
      setDropoffMarker(null);
    }

    // Create large, modern pin icons like delivery apps
    const redPinIcon = window.L.divIcon({
      className: 'custom-pin pickup-pin',
      html: `
        <div class="modern-pin pickup-pin-modern">
          <div class="pin-circle pickup">A</div>
          <div class="pin-shadow"></div>
        </div>
      `,
      iconSize: [40, 40],
      iconAnchor: [20, 40]
    });

    const bluePinIcon = window.L.divIcon({
      className: 'custom-pin dropoff-pin',
      html: `
        <div class="modern-pin dropoff-pin-modern">
          <div class="pin-circle dropoff">B</div>
          <div class="pin-shadow"></div>
        </div>
      `,
      iconSize: [40, 40],
      iconAnchor: [20, 40]
    });

    // Add pickup marker with red pin (only if coordinates exist)
    if (pickupCoords) {
      const pickup = window.L.marker([pickupCoords.lat, pickupCoords.lng], {
        icon: redPinIcon
      }).addTo(map);
      pickup.bindPopup('<strong style="color: #ef4444;">Pickup Location</strong><br>' + 
        pickupCoords.lat.toFixed(6) + ', ' + pickupCoords.lng.toFixed(6));
      setPickupMarker(pickup);
    } else {
      // Ensure marker state is null when coordinates are cleared
      setPickupMarker(null);
    }

    // Add dropoff marker with blue pin (only if coordinates exist)
    if (dropoffCoords) {
      const dropoff = window.L.marker([dropoffCoords.lat, dropoffCoords.lng], {
        icon: bluePinIcon
      }).addTo(map);
      dropoff.bindPopup('<strong style="color: #3b82f6;">Dropoff Location</strong><br>' + 
        dropoffCoords.lat.toFixed(6) + ', ' + dropoffCoords.lng.toFixed(6));
      setDropoffMarker(dropoff);
    } else {
      // Ensure marker state is null when coordinates are cleared
      setDropoffMarker(null);
    }

    // Update route line
    map.eachLayer((layer) => {
      if (layer instanceof window.L.Polyline) {
        map.removeLayer(layer);
      }
    });

    if (pickupCoords && dropoffCoords) {
      const routeLine = window.L.polyline(
        [[pickupCoords.lat, pickupCoords.lng], [dropoffCoords.lat, dropoffCoords.lng]],
        { color: '#0b6cf2', weight: 3, dashArray: '10, 10' }
      ).addTo(map);
      
      // Fit bounds to show both locations
      map.fitBounds(
        [[pickupCoords.lat, pickupCoords.lng], [dropoffCoords.lat, dropoffCoords.lng]],
        { padding: [50, 50] }
      );
    } else if (pickupCoords) {
      map.setView([pickupCoords.lat, pickupCoords.lng], 13);
    } else if (dropoffCoords) {
      map.setView([dropoffCoords.lat, dropoffCoords.lng], 13);
    }
  }, [pickupCoords, dropoffCoords]);

  return (
    <div className="location-map-preview-modern">
      <div className="map-wrapper">
        <div ref={mapRef} className="map-container-full"></div>
        
        {/* Close button - only show if not always visible */}
        {!alwaysVisible && (
          <button
            className="map-close-btn"
            onClick={() => onMapClose && onMapClose()}
            type="button"
            title="Close map"
          >
            ✕
          </button>
        )}
        
        {/* Loading indicator only */}
        {isGeocoding && (
          <div className="map-instruction-card">
            <div className="instruction-content">
              <div className="instruction-icon loading">
                <div className="spinner"></div>
              </div>
              <div>
                <h4>Getting address...</h4>
                <p>Please wait while we find the location</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
