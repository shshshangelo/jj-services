import React from "react";
import { Link } from "react-router-dom";
import "./NotFoundPage.css";

export default function NotFoundPage() {
  return (
    <div className="not-found-page">
      <div className="container">
        <div className="not-found-content">
          <div className="not-found-icon">🚗</div>
          <h1 className="not-found-title">404</h1>
          <h2 className="not-found-subtitle">Page Not Found</h2>
          <p className="not-found-description">
            Oops! The page you're looking for seems to have taken a wrong turn. 
            Don't worry, we'll get you back on the right route.
          </p>
          <div className="not-found-actions">
            <Link to="/" className="not-found-btn primary">
              Go to Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

