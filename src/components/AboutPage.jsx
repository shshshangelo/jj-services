import React from 'react';

export default function AboutPage() {
  return (
    <section className="about-section">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <h2 className="section-title">About J&J Limo Services</h2>
            <p>
              With years of experience in the transportation industry, J&J Limo Services
              has established itself as a trusted name in premium ground transportation.
              We specialize in providing safe, reliable, and comfortable rides for airport
              transfers, corporate events, and special occasions.
            </p>
            <p>
              Our professional drivers are fully licensed, insured, and committed to
              delivering exceptional service. We understand that your time is valuable,
              which is why we prioritize punctuality and efficiency in every journey.
            </p>
            <div className="about-features">
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>24/7 Availability</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Professional Drivers</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Fully Insured</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Premium Vehicles</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Competitive Pricing</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <span>Customer Satisfaction</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
