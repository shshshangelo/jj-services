import React, { useState, useEffect } from "react";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <button
      className={`back-to-top ${isVisible ? "show" : ""}`}
      onClick={scrollToTop}
      aria-label="Back to top"
      style={{
        position: "fixed",
        insetInlineEnd: "clamp(0.75rem, 3vw, 1.5rem)",
        insetBlockEnd: "clamp(0.75rem, 3vw, 1.5rem)",
        width: "clamp(2.5rem, 8vw, 3.5rem)",
        height: "clamp(2.5rem, 8vw, 3.5rem)",
        borderRadius: "9999px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#111827",
        color: "#ffffff",
        boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
        border: "none",
        cursor: "pointer",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(10px)",
        transition:
          "opacity 0.2s ease-out, transform 0.2s ease-out, box-shadow 0.15s ease-out",
        zIndex: 50
      }}
    >
      <svg
        width="70%"
        height="70%"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 4L4 12H8V20H16V12H20L12 4Z" fill="currentColor" />
      </svg>
    </button>
  );
}

