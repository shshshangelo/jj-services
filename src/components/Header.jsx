import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
    }
  };

  const handleAboutClick = (e) => {
    e.preventDefault();
    if (location.pathname === '/') {
      const element = document.getElementById('about');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById('about');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  return (
    <header className="header">
      <div className="container header-inner">
        <div className="logo">
          <h1>J&J Limo Services</h1>
        </div>
        <div className="nav-links">
          <Link to="/" onClick={handleLogoClick}>Home</Link>
          <Link to="/vehicles">Vehicles</Link>
          <Link to="/services">Services</Link>
          <a href="/#about" onClick={handleAboutClick}>About Us</a>
          <Link to="/contact">Contact Us</Link>
          <Link to="/booking">Book Now</Link>
        </div>
        <div className="contact-info">
          <a href="tel:+18629029304">+1 (862) 902-9304</a>
        </div>
      </div>
    </header>
  );
}
