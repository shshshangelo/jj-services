import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
    return () => document.body.classList.remove('menu-open');
  }, [menuOpen]);

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

  const closeMenu = () => setMenuOpen(false);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const isActivePath = (path) => location.pathname === path;

  const handleNavLinkClick = () => {
    closeMenu();
    scrollToTop();
  };


  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      
    <header className="header">
      <div className="container header-inner">
        <div className="logo">
          <img src="/assets/logo.svg" alt="J&J Limo Services" className="logo-mark" />
          <span className="sr-only">J&J Limo Services</span>
        </div>

        <button
          className={`menu-toggle ${menuOpen ? 'active' : ''}`}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`nav-links ${menuOpen ? 'open' : ''}`} role="navigation" aria-label="Main navigation">
          <div className="mobile-logo">
            <img src="/assets/logo.svg" alt="J&J Limo Services" />
          </div>
          <button
            className="mobile-close"
            aria-label="Close navigation menu"
            onClick={closeMenu}
          >
            ×
          </button>
          <Link
            to="/"
            className={isActivePath("/") ? "active" : ""}
            onClick={(e) => { handleLogoClick(e); closeMenu(); }}
          >
            Home
          </Link>
          <Link
            to="/vehicles"
            className={isActivePath("/vehicles") ? "active" : ""}
            onClick={handleNavLinkClick}
          >
            Vehicles
          </Link>
          <Link
            to="/services"
            className={isActivePath("/services") ? "active" : ""}
            onClick={handleNavLinkClick}
          >
            Services
          </Link>
          <Link
            to="/about"
            className={isActivePath("/about") ? "active" : ""}
            onClick={handleNavLinkClick}
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className={isActivePath("/contact") ? "active" : ""}
            onClick={handleNavLinkClick}
          >
            Contact Us
          </Link>
          <Link
            to="/booking"
            className={isActivePath("/booking") ? "active" : ""}
            onClick={handleNavLinkClick}
          >
            Book Now
          </Link>
          <div className="mobile-contact">
            <a href="tel:+18629029304">Call +1 (862) 902-9304</a>
          </div>
        </nav>
        <div className="contact-info">
          <a href="tel:+18629029304">+1 (862) 902-9304</a>
        </div>
      </div>
    </header>
    </>
  );
}
