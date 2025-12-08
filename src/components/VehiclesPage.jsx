import React from "react";
import { Link } from "react-router-dom";

export const vehicles = [
  {
    name: "Sedan",
    img: "/thumbnail/Sedan.jpeg",
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
    img: "/thumbnail/SUV.jpeg",
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
    img: "/thumbnail/Executive.jpeg",
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
    name: "Sprinter Bus",
    img: "/thumbnail/Sprinter.jpeg",
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

