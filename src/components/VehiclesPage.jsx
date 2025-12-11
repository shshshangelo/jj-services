import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

const createImagePaths = (folderName, totalImages) =>
  Array.from({ length: totalImages }, (_, index) => `/${encodeURIComponent(folderName)}/${index + 1}.jpeg`);

const vehicleImages = {
  Sedan: createImagePaths("Sedan", 7),
  SUV: createImagePaths("SUV", 10),
  Executive: createImagePaths("Executive", 8),
  "Sprinter Bus": createImagePaths("Sprinter Bus", 9)
};

export const vehicles = [
  {
    name: "Sedan",
    img: "/Sedan/1.jpeg",
    images: vehicleImages.Sedan,
    description:
      "Perfect for solo travellers or small groups looking for a comfortable and efficient ride.",
    features: [
      "Up to 4 passengers",
      "Comfortable seating",
      "Climate control",
      "Luggage space",
      "Professional driver"
    ],
    ideal: "Business trips, airport transfers, city rides"
  },
  {
    name: "SUV",
    img: "/thumbnail/SUV.jpeg",
    images: vehicleImages.SUV,
    description:
      "Spacious and versatile, ideal when you need extra room for passengers or luggage.",
    features: [
      "Up to 6 passengers",
      "Extra luggage capacity",
      "Comfortable interior",
      "Climate control",
      "Professional driver"
    ],
    ideal: "Family trips, group travel, airport runs"
  },
  {
    name: "Executive",
    img: "/thumbnail/Executive.jpeg",
    images: vehicleImages.Executive,
    description:
      "Premium executive-class vehicle with enhanced comfort and amenities for business travel.",
    features: [
      "Up to 4 passengers",
      "Executive seating",
      "WiFi (where available)",
      "Charging ports",
      "Bottled water and refreshments",
      "Professional chauffeur"
    ],
    ideal: "Corporate travel, client meetings, VIP transfers"
  },
  {
    name: "Sprinter Bus",
    img: "/thumbnail/Sprinter.jpeg",
    images: vehicleImages["Sprinter Bus"],
    description:
      "Comfortable large-capacity vehicle for big groups, events, and transfers.",
    features: [
      "From 12 to 20+ passengers (depending on configuration)",
      "Ample luggage space",
      "Comfortable seating",
      "Sound system",
      "Professional driver"
    ],
    ideal: "Group outings, events, airport transfers, tours"
  }
];

function VehicleSlideshow({ images = [], name, fallback, onImageClick }) {
  const validImages = useMemo(() => images.filter(Boolean), [images]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (validImages.length <= 1) return undefined;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % validImages.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [validImages.length]);

  useEffect(() => {
    setIndex(0);
  }, [validImages.length]);

  if (!validImages.length) {
    return (
      <img
        src={fallback}
        alt={name}
        loading="lazy"
        decoding="async"
        className="vehicle-static-image"
      />
    );
  }

  const showPrev = () => {
    setIndex((prev) => (prev - 1 + validImages.length) % validImages.length);
  };

  const showNext = () => {
    setIndex((prev) => (prev + 1) % validImages.length);
  };

  const openCurrent = () => {
    if (!onImageClick) return;
    onImageClick({
      images: validImages.length ? validImages : [fallback],
      index,
      name
    });
  };

  return (
    <div className="vehicle-slideshow" role="group" aria-label={`${name} gallery`}>
      <div className="slideshow-frame" onClick={openCurrent}>
        {validImages.map((src, idx) => (
          <img
            key={src}
            src={src}
            alt={`${name} view ${idx + 1}`}
            loading="lazy"
            decoding="async"
            className={`slide ${idx === index ? "active" : ""}`}
          />
        ))}

        {validImages.length > 1 && (
          <>
            <button
              type="button"
              className="slide-nav prev"
              onClick={(e) => {
                e.stopPropagation();
                showPrev();
              }}
              aria-label="Previous image"
            >
              ‹
            </button>
            <button
              type="button"
              className="slide-nav next"
              onClick={(e) => {
                e.stopPropagation();
                showNext();
              }}
              aria-label="Next image"
            >
              ›
            </button>
          </>
        )}
      </div>

      {validImages.length > 1 && (
        <div className="slideshow-dots" aria-label={`${name} image selection`}>
          {validImages.map((_, dotIndex) => (
            <button
              key={`${name}-dot-${dotIndex}`}
              type="button"
              className={`dot ${dotIndex === index ? "active" : ""}`}
              onClick={() => setIndex(dotIndex)}
              aria-label={`Show ${name} image ${dotIndex + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function VehiclesPage() {
  const [lightbox, setLightbox] = useState(null);

  const handleOpenLightbox = useCallback(({ images, index, name }) => {
    setLightbox({ images, index, name });
  }, []);

  const handleCloseLightbox = useCallback(() => setLightbox(null), []);

  const handleLightboxNext = useCallback(() => {
    setLightbox((prev) => {
      if (!prev) return prev;
      const nextIndex = (prev.index + 1) % prev.images.length;
      return { ...prev, index: nextIndex };
    });
  }, []);

  const handleLightboxPrev = useCallback(() => {
    setLightbox((prev) => {
      if (!prev) return prev;
      const nextIndex = (prev.index - 1 + prev.images.length) % prev.images.length;
      return { ...prev, index: nextIndex };
    });
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") handleLightboxNext();
      if (e.key === "ArrowLeft") handleLightboxPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleLightboxNext, handleLightboxPrev]);

  return (
    <div className="vehicles-page">
      <div className="container">
        <div className="vehicles-hero">
          <h1 className="page-title">Our Premium Fleet</h1>
          <p className="page-subtitle">Choose the perfect vehicle for your journey</p>
        </div>

        <div className="vehicles-detailed">
          {vehicles.map((vehicle) => (
            <div key={vehicle.name} className="vehicle-detail-card">
              <div className="vehicle-detail-image">
                <VehicleSlideshow
                  images={vehicle.images}
                  name={vehicle.name}
                  fallback={vehicle.img}
                  onImageClick={handleOpenLightbox}
                />
              </div>
              <div className="vehicle-detail-content">
                <div className="vehicle-detail-header">
                  <h2>{vehicle.name}</h2>
                </div>
                <p className="vehicle-detail-description">{vehicle.description}</p>
                
                <div className="vehicle-detail-section">
                  <h3>Features</h3>
                  <ul className="features-list">
                    {vehicle.features.map((feature, index) => (
                      <li key={index}>
                        <span className="feature-check">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="vehicle-detail-section">
                  <h3>Ideal For</h3>
                  <p className="ideal-for">{vehicle.ideal}</p>
                </div>

                <Link to="/booking" state={{ vehicle: vehicle.name }} className="book-vehicle-btn">
                  Book {vehicle.name}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      {lightbox && (
        <div className="lightbox-overlay" onClick={handleCloseLightbox}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" type="button" aria-label="Close image" onClick={handleCloseLightbox}>
              ×
            </button>

            {lightbox.images.length > 1 && (
              <button
                className="lightbox-nav prev"
                type="button"
                aria-label="Previous image"
                onClick={handleLightboxPrev}
              >
                ‹
              </button>
            )}

            <img
              src={lightbox.images[lightbox.index]}
              alt={`${lightbox.name} view ${lightbox.index + 1}`}
              loading="lazy"
              decoding="async"
            />

            {lightbox.images.length > 1 && (
              <button
                className="lightbox-nav next"
                type="button"
                aria-label="Next image"
                onClick={handleLightboxNext}
              >
                ›
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

