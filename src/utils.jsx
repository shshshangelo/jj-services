// Haversine formula to estimate straight-line distance between two coords
export function estimateDistanceKm(a, b) {
  if (!a || !b) return 0;
  const toRad = (v) => (v * Math.PI) / 180;
  const R = 6371; // km
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);

  const sinDlat = Math.sin(dLat / 2) ** 2;
  const sinDlon = Math.sin(dLon / 2) ** 2;
  const aHar = sinDlat + Math.cos(lat1) * Math.cos(lat2) * sinDlon;
  const c = 2 * Math.atan2(Math.sqrt(aHar), Math.sqrt(1 - aHar));
  const d = R * c;
  return d; // in km
}

// Cookie consent utilities
export function getCookieConsent() {
  try {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) return null;
    return JSON.parse(consent);
  } catch (error) {
    console.error('Error reading cookie consent:', error);
    return null;
  }
}

export function hasCookieConsent(type = 'all') {
  const consent = getCookieConsent();
  if (!consent) return false;
  
  if (type === 'all') {
    return consent.accepted === true;
  }
  
  return consent.preferences?.[type] === true;
}

export function canUseAnalytics() {
  return hasCookieConsent('analytics');
}

export function canUseMarketing() {
  return hasCookieConsent('marketing');
}