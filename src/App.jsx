import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BookingWizard from "./BookingWizard";
import ContactPage from "./components/ContactPage";
import TermsPage from "./components/TermsPage";
import VehiclesPage from "./components/VehiclesPage";
import ServicesPage from "./components/ServicesPage";
import BackToTop from "./components/BackToTop";
import './styles.css';

function HomePage() {
  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <section className="hero">
        <div className="hero-image-wrapper">
          <img 
            src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80" 
            alt="Luxury limousine" 
            className="hero-background-image"
          />
          <div className="hero-overlay"></div>
        </div>
        <div className="container hero-inner">
          <h1>Professional Airport & Corporate Transfers</h1>
          <p>
            Experience premium luxury transportation with J&J Limo Services. Safe, punctual, and comfortable 
            rides for airport transfers, corporate events, weddings, and special occasions. Our professional 
            drivers are fully licensed and insured. Book your ride in seconds and travel in style.
          </p>
          <Link to="/booking" className="cta">
            Reserve Your Ride
          </Link>
        </div>
      </section>

      <section id="vehicles" className="vehicles-section">
        <div className="container">
          <h2 className="section-title">Our Premium Fleet</h2>
          <p className="section-subtitle">Choose from our selection of luxury vehicles</p>
          <div className="vehicles-showcase">
            <div className="showcase-card">
              <div className="showcase-image">
                <img 
                  src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                  alt="Luxury Sedan" 
                />
              </div>
              <h3>Sedan</h3>
              <p>Perfect for business trips and airport transfers. Comfortable and efficient.</p>
              <div className="showcase-price">SRP: $55</div>
            </div>
            <div className="showcase-card">
              <div className="showcase-image">
                <img 
                  src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                  alt="Luxury SUV" 
                />
              </div>
              <h3>SUV</h3>
              <p>Spacious and luxurious, ideal for groups or extra luggage space.</p>
              <div className="showcase-price">SRP: $80</div>
            </div>
            <div className="showcase-card">
              <div className="showcase-image">
                <img 
                  src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80" 
                  alt="Luxury Van" 
                />
              </div>
              <h3>Luxury Van</h3>
              <p>Premium comfort for larger groups with maximum space and amenities.</p>
              <div className="showcase-price">SRP: $120</div>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link to="/vehicles" className="view-all-services-btn">View Car Details →</Link>
          </div>
        </div>
      </section>

      <section id="services" className="services-section">
        <div className="container">
          <h2 className="section-title">Our Services</h2>
          <p className="section-subtitle">Comprehensive transportation solutions for all your needs</p>
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
          </div>
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link to="/services" className="view-all-services-btn">View All Services →</Link>
          </div>
        </div>
      </section>

      <section id="about" className="about-section">
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

      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">5000+</div>
              <div className="stat-label">Happy Customers</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Available Service</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">100%</div>
              <div className="stat-label">Satisfaction Rate</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">10+</div>
              <div className="stat-label">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      <section id="testimonials" className="testimonials-section">
        <div className="container">
          <h2 className="section-title">What Our Customers Say</h2>
          <p className="section-subtitle">Trusted by thousands of satisfied customers</p>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-stars">★★★★★</div>
              <p className="testimonial-text">"Excellent service! The driver was professional and on time. Highly recommend for airport transfers."</p>
              <p className="testimonial-author">- Sarah M.</p>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-stars">★★★★★</div>
              <p className="testimonial-text">"Used their limo service for my wedding. Absolutely perfect! Made our special day even more memorable."</p>
              <p className="testimonial-author">- Michael R.</p>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-stars">★★★★★</div>
              <p className="testimonial-text">"Reliable, professional, and comfortable. Best limo service in the area. Will definitely use again!"</p>
              <p className="testimonial-author">- Jennifer L.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="faq-section">
        <div className="container">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">Everything you need to know about our services</p>
          <div className="faq-grid">
            <div className="faq-item">
              <h3>How far in advance should I book?</h3>
              <p>We recommend booking at least 24 hours in advance, though we can accommodate last-minute requests based on availability. For special events, booking 1-2 weeks ahead is ideal.</p>
            </div>
            <div className="faq-item">
              <h3>What payment methods do you accept?</h3>
              <p>We accept all major credit cards, debit cards, and cash. Corporate accounts can be set up for billing. Payment is typically due at the time of service.</p>
            </div>
            <div className="faq-item">
              <h3>Do you provide child seats?</h3>
              <p>Yes, we offer child seats and booster seats upon request. Please mention this when booking so we can ensure availability for your trip.</p>
            </div>
            <div className="faq-item">
              <h3>What happens if my flight is delayed?</h3>
              <p>We track all flights for airport transfers. If your flight is delayed, we'll automatically adjust the pickup time at no extra charge. Our drivers monitor flight status in real-time.</p>
            </div>
            <div className="faq-item">
              <h3>Are your drivers licensed and insured?</h3>
              <p>Absolutely. All our drivers are fully licensed, background-checked, and our vehicles are fully insured. We maintain the highest safety standards in the industry.</p>
            </div>
            <div className="faq-item">
              <h3>Can I cancel or modify my booking?</h3>
              <p>Yes, you can cancel or modify your booking up to 24 hours before your scheduled pickup time at no charge. Cancellations within 24 hours may incur a fee.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-banner-section">
        <div className="container">
          <div className="cta-banner">
            <div className="cta-banner-content">
              <h2>Ready to Experience Luxury Transportation?</h2>
              <p>Book your ride today and enjoy premium comfort, professional service, and peace of mind.</p>
            </div>
            <div className="cta-banner-buttons">
              <Link to="/booking" className="cta-banner-btn primary">Book Now</Link>
              <Link to="/contact" className="cta-banner-btn secondary">Get a Quote</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function BookingPage() {
  return (
    <section id="booking" className="booking-section">
      <BookingWizard />
    </section>
  );
}

export default function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/vehicles" element={<VehiclesPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
        <BackToTop />
      </div>
    </Router>
  );
}
