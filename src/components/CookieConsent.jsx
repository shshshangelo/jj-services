import React, { useState, useEffect } from "react";
import "./CookieConsent.css";

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      // Show banner after a short delay for better UX
      setTimeout(() => {
        setShowBanner(true);
      }, 1000);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('cookieConsent', JSON.stringify({
      accepted: true,
      date: new Date().toISOString(),
      preferences: {
        necessary: true,
        analytics: true,
        marketing: true
      }
    }));
    setShowBanner(false);
  };

  const handleRejectAll = () => {
    localStorage.setItem('cookieConsent', JSON.stringify({
      accepted: false,
      date: new Date().toISOString(),
      preferences: {
        necessary: true,
        analytics: false,
        marketing: false
      }
    }));
    setShowBanner(false);
  };

  const handleCustomize = () => {
    setShowDetails(!showDetails);
  };

  const handleSavePreferences = (preferences) => {
    localStorage.setItem('cookieConsent', JSON.stringify({
      accepted: true,
      date: new Date().toISOString(),
      preferences: {
        necessary: true, // Always true, required for site functionality
        analytics: preferences.analytics || false,
        marketing: preferences.marketing || false
      }
    }));
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="cookie-consent-overlay">
      <div className="cookie-consent-banner">
        <div className="cookie-consent-content">
          <div className="cookie-consent-header">
            <div className="cookie-consent-icon">🍪</div>
            <h3>Cookie Preferences</h3>
          </div>
          
          {!showDetails ? (
            <>
              <p className="cookie-consent-text">
                We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. 
                By clicking "Accept All", you consent to our use of cookies. You can also choose to customize your preferences.
              </p>
              <div className="cookie-consent-buttons">
                <button 
                  className="cookie-btn cookie-btn-accept" 
                  onClick={handleAcceptAll}
                >
                  Accept All
                </button>
                <button 
                  className="cookie-btn cookie-btn-reject" 
                  onClick={handleRejectAll}
                >
                  Reject All
                </button>
                <button 
                  className="cookie-btn cookie-btn-customize" 
                  onClick={handleCustomize}
                >
                  Customize
                </button>
              </div>
            </>
          ) : (
            <CookiePreferences onSave={handleSavePreferences} onCancel={() => setShowDetails(false)} />
          )}
        </div>
      </div>
    </div>
  );
}

function CookiePreferences({ onSave, onCancel }) {
  const [preferences, setPreferences] = useState({
    analytics: true,
    marketing: true
  });

  const handleToggle = (type) => {
    setPreferences(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const handleSave = () => {
    onSave(preferences);
  };

  return (
    <div className="cookie-preferences">
      <div className="cookie-preference-item">
        <div className="cookie-preference-info">
          <h4>Necessary Cookies</h4>
          <p>Required for the website to function properly. These cannot be disabled.</p>
        </div>
        <div className="cookie-toggle disabled">
          <input type="checkbox" checked disabled />
          <span className="cookie-toggle-slider"></span>
        </div>
      </div>

      <div className="cookie-preference-item">
        <div className="cookie-preference-info">
          <h4>Analytics Cookies</h4>
          <p>Help us understand how visitors interact with our website by collecting anonymous information.</p>
        </div>
        <div className="cookie-toggle">
          <input 
            type="checkbox" 
            checked={preferences.analytics}
            onChange={() => handleToggle('analytics')}
          />
          <span className="cookie-toggle-slider"></span>
        </div>
      </div>

      <div className="cookie-preference-item">
        <div className="cookie-preference-info">
          <h4>Marketing Cookies</h4>
          <p>Used to deliver personalized advertisements and track campaign performance.</p>
        </div>
        <div className="cookie-toggle">
          <input 
            type="checkbox" 
            checked={preferences.marketing}
            onChange={() => handleToggle('marketing')}
          />
          <span className="cookie-toggle-slider"></span>
        </div>
      </div>

      <div className="cookie-consent-buttons">
        <button 
          className="cookie-btn cookie-btn-save" 
          onClick={handleSave}
        >
          Save Preferences
        </button>
        <button 
          className="cookie-btn cookie-btn-cancel" 
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

