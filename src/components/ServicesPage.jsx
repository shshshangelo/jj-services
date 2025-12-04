import React from "react";
import { Link } from "react-router-dom";

export default function ServicesPage() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="services-page">
      <div className="container">
        <div className="services-hero">
          <h1 className="page-title">Our Services</h1>
          <p className="page-subtitle">Comprehensive transportation solutions for all your needs</p>
        </div>

        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon">✈️</div>
            <h3>Airport Transfers</h3>
            <p>Reliable airport pickup and drop-off services. We track your flight to ensure timely arrival.</p>
            <ul>
              <li>Flight tracking</li>
              <li>Meet & greet service</li>
              <li>Luggage assistance</li>
            </ul>
          </div>
          <div className="service-card">
            <div className="service-icon">💼</div>
            <h3>Corporate Travel</h3>
            <p>Professional transportation for business meetings, conferences, and corporate events.</p>
            <ul>
              <li>Executive class vehicles</li>
              <li>WiFi enabled</li>
              <li>Flexible scheduling</li>
            </ul>
          </div>
          <div className="service-card">
            <div className="service-icon">🎉</div>
            <h3>Special Events</h3>
            <p>Make your special day memorable with our luxury transportation services.</p>
            <ul>
              <li>Weddings</li>
              <li>Proms & graduations</li>
              <li>Anniversaries</li>
            </ul>
          </div>
          <div className="service-card">
            <div className="service-icon">🌃</div>
            <h3>Night Out</h3>
            <p>Safe and stylish transportation for your nightlife adventures.</p>
            <ul>
              <li>Party buses available</li>
              <li>Group transportation</li>
              <li>Late night service</li>
            </ul>
          </div>
          <div className="service-card">
            <div className="service-icon">🏥</div>
            <h3>Medical Appointments</h3>
            <p>Comfortable and reliable transportation for medical visits and appointments.</p>
            <ul>
              <li>Wheelchair accessible</li>
              <li>Comfortable seating</li>
              <li>On-time guarantee</li>
            </ul>
          </div>
          <div className="service-card">
            <div className="service-icon">🚢</div>
            <h3>Cruise Port Transfers</h3>
            <p>Seamless transportation to and from cruise terminals.</p>
            <ul>
              <li>Port pickup/drop-off</li>
              <li>Luggage handling</li>
              <li>Timely service</li>
            </ul>
          </div>
        </div>

        <div className="services-cta">
          <h2>Ready to Book Your Ride?</h2>
          <p>Choose from our premium fleet and experience luxury transportation</p>
          <div className="cta-buttons">
            <Link to="/booking" className="cta-primary" onClick={scrollToTop}>
              Book Now
            </Link>
            <Link to="/vehicles" className="cta-secondary" onClick={scrollToTop}>
              View Vehicles
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

