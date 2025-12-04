import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import "./styles.css";
import { vehicles } from "./components/VehiclesPage";
import BookingWizard from "./BookingWizard";
import ContactPage from "./components/ContactPage";
import TermsPage from "./components/TermsPage";
import VehiclesPage from "./components/VehiclesPage";
import ServicesPage from "./components/ServicesPage";
import AboutPage from "./components/AboutPage";

function HomePage() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

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
          <Link to="/booking" className="cta" onClick={scrollToTop}>
            Reserve Your Ride
          </Link>
        </div>
      </section>

      <section id="vehicles" className="vehicles-section">
        <div className="container">
          <h2 className="section-title">Our Premium Fleet</h2>
          <p className="section-subtitle">Choose from our selection of luxury vehicles</p>
          <div className="vehicles-showcase">
            {vehicles.slice(0, 3).map((vehicle) => (
              <div key={vehicle.name} className="showcase-card">
                <div className="showcase-image">
                  <img
                    src={vehicle.img}
                    alt={vehicle.name}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <h3>{vehicle.name}</h3>
                <p>{vehicle.description}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link to="/vehicles" className="view-all-services-btn" onClick={scrollToTop}>
              View Car Details →
            </Link>
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
            <Link to="/services" className="view-all-services-btn" onClick={scrollToTop}>
              View All Services →
            </Link>
          </div>
        </div>
      </section>

      {/* About section moved to dedicated /about page */}

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
          <h2 className="section-title">Booking Questions</h2>
          <p className="section-subtitle">Quick answers about how our online booking works</p>
          <div className="faq-grid">
            <div className="faq-item">
              <h3>How is my fare calculated?</h3>
              <p>
                The fare you see in the booking form is an <strong>estimated amount</strong> based on your
                trip distance (km) and the vehicle you select. Final pricing is confirmed directly with
                J&amp;J Limo Services before your ride.
              </p>
            </div>
            <div className="faq-item">
              <h3>How far in advance should I book?</h3>
              <p>
                For regular airport and point‑to‑point trips, we recommend booking at least
                <strong> 24 hours in advance</strong>. For weddings and special events, it&apos;s best to
                reserve <strong>1–2 weeks ahead</strong> when possible.
              </p>
            </div>
            <div className="faq-item">
              <h3>Can I change my booking details later?</h3>
              <p>
                Yes. If you need to update your pickup time, location, or passenger count, simply contact
                us using the details on the Contact page. Most changes can be made up to
                <strong> 24 hours before pickup</strong>, subject to availability.
              </p>
            </div>
            <div className="faq-item">
              <h3>What if my flight is delayed?</h3>
              <p>
                For airport transfers, we monitor flight status and adjust pickup time when delays occur.
                You won&apos;t be charged extra just because your flight landed later than scheduled.
              </p>
            </div>
            <div className="faq-item">
              <h3>Do you provide child seats?</h3>
              <p>
                Child seats and booster seats are available on request. Please mention this in your booking
                or when you contact us so we can reserve the correct seats for your trip.
              </p>
            </div>
            <div className="faq-item">
              <h3>When and how do I pay for my booking?</h3>
              <p>
                Payment is usually collected on the day of your trip, after your booking has been confirmed.
                We accept major credit and debit cards, and in many cases cash as well. If you have any
                questions about payment options, just mention it in your booking or contact us directly.
              </p>
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
              <Link
                to="/booking"
                className="cta-banner-btn primary"
                onClick={scrollToTop}
              >
                Book Now
              </Link>
              <Link
                to="/contact"
                className="cta-banner-btn secondary"
                onClick={scrollToTop}
              >
                Get a Quote
              </Link>
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
        <main id="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/vehicles" element={<VehiclesPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/about" element={<AboutPage />} />
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
