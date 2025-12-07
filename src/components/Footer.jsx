import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="footer" id="contact">
      <div className="container footer-inner">
        <div className="footer-content">
          <div className="footer-section">
            <h3>J&J Limo Services</h3>
            <p>Professional airport and corporate transfers with premium comfort and reliability.</p>
          </div>
          <div className="footer-section">
            <h3>Contact Us</h3>
            <p>
              <a href="tel:+18629029304">+1 (862) 902-9304</a>
            </p>
            <p>
              <a href="mailto:alerts@jj-limoservices.com">alerts@jj-limoservices.com</a>
            </p>
          </div>
          <div className="footer-section">
            <h3>Business Hours</h3>
            <p>24/7 Service</p>
            <p>Always available for your convenience</p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <Link to="/booking" onClick={scrollToTop}>
              Book Now
            </Link>
            <Link to="/vehicles" onClick={scrollToTop}>
              Our Vehicles
            </Link>
            <Link to="/services" onClick={scrollToTop}>
              Services
            </Link>
            <Link to="/about" onClick={scrollToTop}>
              About Us
            </Link>
            <Link to="/contact" onClick={scrollToTop}>
              Contact
            </Link>
            <Link to="/terms" onClick={scrollToTop}>
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 J&J Limo Services. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
