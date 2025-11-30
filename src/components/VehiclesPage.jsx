import React from "react";
import { Link } from "react-router-dom";

const vehicles = [
  {
    name: "Sedan",
    price: 55,
    img: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "Perfect for business trips and airport transfers. Comfortable and efficient for up to 4 passengers.",
    features: [
      "Up to 4 passengers",
      "Comfortable leather seats",
      "Climate control",
      "Luggage space",
      "Professional driver"
    ],
    ideal: "Business trips, Airport transfers, City tours"
  },
  {
    name: "SUV",
    price: 80,
    img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "Spacious and luxurious, ideal for groups or when you need extra luggage space. Premium comfort for up to 6 passengers.",
    features: [
      "Up to 6 passengers",
      "Premium leather interior",
      "Extra luggage capacity",
      "Climate control",
      "Entertainment system",
      "Professional driver"
    ],
    ideal: "Group travel, Airport transfers, Family trips"
  },
  {
    name: "Luxury Van",
    price: 120,
    img: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "Premium comfort for larger groups with maximum space and amenities. Perfect for corporate events and special occasions.",
    features: [
      "Up to 8 passengers",
      "Luxury interior",
      "Maximum luggage space",
      "Premium amenities",
      "Entertainment system",
      "Refreshments available",
      "Professional chauffeur"
    ],
    ideal: "Corporate events, Large groups, Special occasions"
  },
  {
    name: "Stretch Limousine",
    price: 200,
    img: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "The ultimate in luxury transportation. Perfect for weddings, proms, anniversaries, and special celebrations.",
    features: [
      "Up to 10 passengers",
      "Premium bar and refreshments",
      "LED lighting and sound system",
      "Leather seating",
      "Privacy partition",
      "Professional chauffeur",
      "Complimentary champagne"
    ],
    ideal: "Weddings, Proms, Anniversaries, Special events"
  },
  {
    name: "Executive Sedan",
    price: 75,
    img: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "Premium executive class sedan with enhanced comfort and amenities for business professionals.",
    features: [
      "Up to 4 passengers",
      "Executive leather seats",
      "WiFi connectivity",
      "Charging ports",
      "Newspaper and refreshments",
      "Professional chauffeur",
      "Quiet, comfortable ride"
    ],
    ideal: "Business meetings, Corporate travel, Executive transport"
  },
  {
    name: "Party Bus",
    price: 250,
    img: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "The ultimate party experience on wheels. Perfect for bachelor/bachelorette parties, birthdays, and group celebrations.",
    features: [
      "Up to 20 passengers",
      "Premium sound system",
      "LED dance floor lighting",
      "Bar and refreshments",
      "Multiple seating areas",
      "Professional driver",
      "Entertainment system"
    ],
    ideal: "Bachelor parties, Bachelorette parties, Birthdays, Group celebrations"
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
                <img src={vehicle.img} alt={vehicle.name} />
              </div>
              <div className="vehicle-detail-content">
                <div className="vehicle-detail-header">
                  <h2>{vehicle.name}</h2>
                  <div className="vehicle-detail-price">SRP: ${vehicle.price}</div>
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

                <Link to="/booking" className="book-vehicle-btn">
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

