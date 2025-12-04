import React from "react";
import { Link } from "react-router-dom";

export const vehicles = [
  {
    name: "Sedan",
    img: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description:
      "Perfect for solo travellers or small groups looking for a comfortable and efficient ride.",
    features: [
      "Up to 4 passengers",
      "Comfortable seating",
      "Climate control",
      "Luggage space",
      "Professional driver"
    ],
    ideal: "Business trips, airport transfers, city rides"
  },
  {
    name: "SUV",
    img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description:
      "Spacious and versatile, ideal when you need extra room for passengers or luggage.",
    features: [
      "Up to 6 passengers",
      "Extra luggage capacity",
      "Comfortable interior",
      "Climate control",
      "Professional driver"
    ],
    ideal: "Family trips, group travel, airport runs"
  },
  {
    name: "Executive",
    img: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description:
      "Premium executive-class vehicle with enhanced comfort and amenities for business travel.",
    features: [
      "Up to 4 passengers",
      "Executive seating",
      "WiFi (where available)",
      "Charging ports",
      "Bottled water and refreshments",
      "Professional chauffeur"
    ],
    ideal: "Corporate travel, client meetings, VIP transfers"
  },
  {
    name: "Bus",
    img: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description:
      "Comfortable large-capacity vehicle for big groups, events, and transfers.",
    features: [
      "From 12 to 20+ passengers (depending on configuration)",
      "Ample luggage space",
      "Comfortable seating",
      "Sound system",
      "Professional driver"
    ],
    ideal: "Group outings, events, airport transfers, tours"
  }
];

export default function VehiclesPage() {
  return (
    <div className="vehicles-page">
      <div className="container">
        <div className="vehicles-hero">
          <h1 className="page-title">Our Premium Fleet</h1>
          <p className="page-subtitle">Choose the perfect vehicle for your journey</p>
        </div>

        <div className="vehicles-detailed">
          {vehicles.map((vehicle) => (
            <div key={vehicle.name} className="vehicle-detail-card">
              <div className="vehicle-detail-image">
                <img src={vehicle.img} alt={vehicle.name} loading="lazy" decoding="async" />
              </div>
              <div className="vehicle-detail-content">
                <div className="vehicle-detail-header">
                  <h2>{vehicle.name}</h2>
                </div>
                <p className="vehicle-detail-description">{vehicle.description}</p>
                
                <div className="vehicle-detail-section">
                  <h3>Features</h3>
                  <ul className="features-list">
                    {vehicle.features.map((feature, index) => (
                      <li key={index}>
                        <span className="feature-check">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="vehicle-detail-section">
                  <h3>Ideal For</h3>
                  <p className="ideal-for">{vehicle.ideal}</p>
                </div>

                <Link to="/booking" state={{ vehicle: vehicle.name }} className="book-vehicle-btn">
                  Book {vehicle.name}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

