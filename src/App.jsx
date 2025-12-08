import React, { useState, useEffect, Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import BackToTop from "./components/BackToTop";
import CookieConsent from "./components/CookieConsent";
import "./styles.css";
import { vehicles } from "./components/VehiclesPage";

// Lazy load routes for code splitting - only load when needed
const BookingWizard = lazy(() => import("./BookingWizard"));
const ContactPage = lazy(() => import("./components/ContactPage"));
const TermsPage = lazy(() => import("./components/TermsPage"));
const VehiclesPage = lazy(() => import("./components/VehiclesPage"));
const ServicesPage = lazy(() => import("./components/ServicesPage"));
const AboutPage = lazy(() => import("./components/AboutPage"));
const NotFoundPage = lazy(() => import("./components/NotFoundPage"));

// Loading component for Suspense fallback
const LoadingSpinner = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    minHeight: '50vh',
    padding: '40px'
  }}>
    <div className="page-loading-spinner" style={{ width: '40px', height: '40px' }}></div>
  </div>
);

function TestimonialsCarousel() {
  const testimonials = [
    {
      text: "Excellent service! The driver was professional and on time. Highly recommend for airport transfers.",
      author: "Sarah M.",
      stars: "★★★★★"
    },
    {
      text: "Used their limo service for my wedding. Absolutely perfect! Made our special day even more memorable.",
      author: "Michael R.",
      stars: "★★★★★"
    },
    {
      text: "Reliable, professional, and comfortable. Best limo service in the area. Will definitely use again!",
      author: "Jennifer L.",
      stars: "★★★★★"
    },
    {
      text: "Outstanding customer service from booking to drop-off. The vehicle was spotless and the driver was courteous.",
      author: "David K.",
      stars: "★★★★★"
    },
    {
      text: "Perfect for corporate events! Punctual, professional, and made a great impression on our clients.",
      author: "Amanda T.",
      stars: "★★★★★"
    },
    {
      text: "The Executive vehicle was luxurious and comfortable. Great experience for our anniversary celebration.",
      author: "Robert P.",
      stars: "★★★★★"
    },
    {
      text: "Used the Sprinter Bus for our group trip. Plenty of space and everyone was comfortable throughout the journey.",
      author: "Maria G.",
      stars: "★★★★★"
    },
    {
      text: "Best limo service I've ever used. The SUV was spacious and perfect for our family vacation.",
      author: "James W.",
      stars: "★★★★★"
    },
    {
      text: "Professional drivers, clean vehicles, and excellent communication. Highly recommend J&J Limo Services!",
      author: "Lisa H.",
      stars: "★★★★★"
    },
    {
      text: "Made our prom night unforgettable! The limo was beautiful and the service was top-notch.",
      author: "Emily C.",
      stars: "★★★★★"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 4000); // Auto-slide every 4 seconds

    return () => clearInterval(interval);
  }, [isPaused, testimonials.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  return (
    <div 
      className="testimonials-carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="testimonials-carousel-container">
        <div 
          className="testimonials-carousel-track"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`
          }}
        >
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card">
              <div className="testimonial-stars">{testimonial.stars}</div>
              <p className="testimonial-text">"{testimonial.text}"</p>
              <p className="testimonial-author">- {testimonial.author}</p>
            </div>
          ))}
        </div>
      </div>
      
      <button 
        className="carousel-btn carousel-btn-prev" 
        onClick={goToPrevious}
        aria-label="Previous testimonial"
      >
        ‹
      </button>
      <button 
        className="carousel-btn carousel-btn-next" 
        onClick={goToNext}
        aria-label="Next testimonial"
      >
        ›
      </button>

      <div className="carousel-dots">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function HomePage() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
      <section className="hero">
        <div className="hero-image-wrapper">
          <img 
            src="/assets/background.png" 
            alt="Luxury limousine" 
            className="hero-background-image"
            loading="eager"
            fetchPriority="high"
            decoding="async"
          />
          <div className="hero-overlay"></div>
        </div>
        <div className="container hero-inner">
          <h1>Luxury Transportation You Can Trust</h1>
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

      <section id="why-choose-us" className="why-choose-section">
        <div className="container">
          <h2 className="section-title">Why Choose J&J Limo Services?</h2>
          <p className="section-subtitle">Experience the difference that sets us apart from the rest</p>
          <div className="why-choose-grid">
            <div className="why-choose-card">
              <div className="why-choose-icon">⭐</div>
              <h3>Premium Quality</h3>
              <p>
                Our fleet consists of meticulously maintained luxury vehicles. Every ride is a first-class experience 
                with top-tier comfort and style.
              </p>
            </div>
            <div className="why-choose-card">
              <div className="why-choose-icon">👔</div>
              <h3>Professional Drivers</h3>
              <p>
                All our chauffeurs are fully licensed, insured, and background-checked. They're trained in 
                customer service and safety protocols to ensure your peace of mind.
              </p>
            </div>
            <div className="why-choose-card">
              <div className="why-choose-icon">⏰</div>
              <h3>Punctual & Reliable</h3>
              <p>
                We understand that time is valuable. Our drivers arrive on time, every time. We track flights 
                and monitor traffic to ensure you never miss an appointment.
              </p>
            </div>
            <div className="why-choose-card">
              <div className="why-choose-icon">🛡️</div>
              <h3>Fully Insured</h3>
              <p>
                Your safety is our priority. All vehicles are fully insured and regularly inspected. We maintain 
                comprehensive coverage for your protection and peace of mind.
              </p>
            </div>
            <div className="why-choose-card">
              <div className="why-choose-icon">📱</div>
              <h3>Easy Booking</h3>
              <p>
                Book your ride in seconds with our user-friendly online platform. Get instant confirmations, 
                real-time updates, and manage your bookings effortlessly.
              </p>
            </div>
            <div className="why-choose-card">
              <div className="why-choose-icon">💎</div>
              <h3>Competitive Pricing</h3>
              <p>
                Premium service doesn't mean premium prices. We offer transparent, competitive rates with no 
                hidden fees. Quality transportation that fits your budget.
              </p>
            </div>
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
          <TestimonialsCarousel />
        </div>
      </section>

      <section className="faq-section">
        <div className="container">
          <h2 className="section-title">Booking Questions</h2>
          <p className="section-subtitle">Quick answers about how our online booking works</p>
          <div className="faq-grid">
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
              <h3>How are prices calculated?</h3>
              <p>
                We use a simple per-kilometer fare based on vehicle type: Sedan $3.25/km, SUV $3.75/km,
                Executive $4.50/km, and Sprinter Bus $5.25/km. These rates are displayed directly in
                the booking flow and applied automatically to your trip distance. 
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
              <h3>What payment methods do you accept?</h3>
              <p>
                We accept cash, credit cards, and debit cards. Payment is typically collected on the day of your trip.
                For corporate accounts or special events, we can arrange invoicing and payment terms in advance.
              </p>
            </div>
            <div className="faq-item">
              <h3>Is there a cancellation fee?</h3>
              <p>
                Cancellations made at least <strong>24 hours before</strong> your scheduled pickup time are free of charge.
                Cancellations made less than 24 hours in advance may be subject to a cancellation fee. Please contact us
                as soon as possible if you need to cancel or reschedule your booking.
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
      <Suspense fallback={<LoadingSpinner />}>
        <BookingWizard />
      </Suspense>
    </section>
  );
}

export default function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main id="main-content">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/booking" element={<BookingPage />} />
              <Route path="/vehicles" element={<VehiclesPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
        <BackToTop />
        <CookieConsent />
      </div>
    </Router>
  );
}
