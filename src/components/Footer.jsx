import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
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
              <a href="mailto:Jjlimoservices21@gmail.com">Jjlimoservices21@gmail.com</a>
            </p>
          </div>
          <div className="footer-section">
            <h3>Business Hours</h3>
            <p>24/7 Service</p>
            <p>Always available for your convenience</p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <Link to="/booking">Book Now</Link>
            <Link to="/vehicles">Our Vehicles</Link>
            <Link to="/services">Services</Link>
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/terms">Terms &amp; Conditions</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 J&J Limo Services. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
