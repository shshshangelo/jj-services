import React, { useState, useRef } from "react";
import "./BookingConfirmationModal.css";
import BookingConfirmationTemplate from "./BookingConfirmationTemplate";

export default function BookingConfirmationModal({ isOpen, onClose, bookingData }) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingRef, setBookingRef] = useState("");
  const printRef = useRef(null);
  const printContainerRef = useRef(null);

  // Generate booking reference number
  const generateBookingRef = () => {
    const prefix = "JJ";
    const timestamp = Date.now().toString().slice(-8);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${prefix}-${timestamp}-${random}`;
  };

  if (!isOpen) return null;

  const formatTime = (time) => {
    if (!time) return "—";
    const [hStr = '', mStr = ''] = time.split(":");
    if (hStr === '' || mStr === '') return time;
    const h = parseInt(hStr, 10);
    if (Number.isNaN(h)) return time;
    const suffix = h >= 12 ? "PM" : "AM";
    const hour12 = h % 12 === 0 ? 12 : h % 12;
    return `${hour12}:${mStr} ${suffix}`;
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    try {
      const date = new Date(dateStr);
      if (Number.isNaN(date.getTime())) return dateStr;
      return date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } catch {
      return dateStr;
    }
  };

  const sendBookingEmail = async (ref) => {
    try {
      const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
      const endpoint = isLocalhost
        ? "http://localhost:8000/api/send-booking-email.php"
        : "https://jj-limoservices.com/api/send-booking-email.php";

      // Ensure phone has +1 prefix if user entered 10 digits
      const phoneDigits = (bookingData.phone || "").replace(/\D/g, "");
      const phoneWithPrefix =
        phoneDigits.length === 10 ? `+1${phoneDigits}` : bookingData.phone || "";

      const payload = {
        ...bookingData,
        phone: phoneWithPrefix,
        bookingRef: ref
      };
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const result = await response.json();
      if (!response.ok || !result.success) {
        throw new Error(result.error || "Failed to send booking email");
      }
      return true;
    } catch (error) {
      console.error("Booking email failed:", error);
      return false;
    }
  };

  const handleConfirm = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    const ref = generateBookingRef();
    setBookingRef(ref);

    const emailSent = await sendBookingEmail(ref);

    console.log("Booking confirmed:", bookingData);
    console.log("Booking Reference:", ref, "Email sent:", emailSent);
    setIsSubmitting(false);
    setIsSuccess(true);
    
    // Clear saved booking data from localStorage after successful booking
    try {
      localStorage.removeItem("jj_limo_booking_data");
      localStorage.removeItem("jj_limo_booking_step");
    } catch (error) {
      console.error("Error clearing booking data:", error);
    }
  };

  const handleDownloadPDF = () => {
    // Open confirmation in a new window for viewing/download
    const viewWindow = window.open('', '_blank');
    const templateHTML = printRef.current ? printRef.current.innerHTML : '';
    
    viewWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Booking Confirmation - ${bookingRef}</title>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
          <style>
            body {
              margin: 0;
              padding: 20px;
              font-family: 'Inter', 'Arial', sans-serif;
              background: #f8fafc;
            }
            .view-actions {
              position: fixed;
              top: 10px;
              right: 10px;
              z-index: 1000;
              display: flex;
              gap: 10px;
              flex-wrap: wrap;
            }
            .view-btn {
              padding: 10px 20px;
              background: #0b6cf2;
              color: white;
              border: none;
              border-radius: 6px;
              cursor: pointer;
              font-weight: 600;
              font-size: 14px;
            }
            .view-btn:hover {
              background: #0956c4;
            }
            .view-btn.primary {
              background: #0b6cf2;
            }
            .view-btn.primary:hover {
              background: #0956c4;
            }
            .view-btn.close-btn {
              background: #64748b;
            }
            .view-btn.close-btn:hover {
              background: #475569;
            }
          </style>
        </head>
        <body>
          <div class="view-actions">
            <button class="view-btn primary" onclick="downloadJPEG()">Download</button>
            <button class="view-btn close-btn" onclick="window.close()">X</button>
          </div>
          <div id="confirmation-content">
            ${templateHTML}
          </div>
          <script>
            async function downloadJPEG() {
              try {
                const content = document.getElementById('confirmation-content');
                const canvas = await html2canvas(content, {
                  backgroundColor: '#ffffff',
                  scale: 2,
                  logging: false,
                  useCORS: true
                });
                const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
                const link = document.createElement('a');
                link.download = 'Booking-Confirmation-${bookingRef}.jpg';
                link.href = dataUrl;
                link.click();
              } catch (error) {
                console.error('Error generating JPEG:', error);
                alert('Failed to generate file. Please try again.');
              }
            }
          </script>
        </body>
      </html>
    `);
    viewWindow.document.close();
  };

  const handleSuccessClose = () => {
    setIsSuccess(false);
    onClose();
    // Redirect to home page
    window.location.href = "/";
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {!isSuccess ? (
          <>
            {isSubmitting && (
              <div className="page-loading-overlay">
                <div className="page-loading-card">
                  <div className="page-loading-spinner" />
                  <p style={{ animation: 'none', transform: 'none' }}>Confirming your booking…</p>
                </div>
              </div>
            )}
            <div className="modal-header">
              <h2>Confirm Your Booking</h2>
              <button className="modal-close" onClick={onClose}>×</button>
            </div>
            
            <div className="modal-body">
              <div className="confirmation-section">
                <h3>Booking Details</h3>
                <div className="confirmation-row">
                  <span className="confirmation-label">Pickup Location:</span>
                  <span className="confirmation-value">
                    {bookingData.pickup || (bookingData.pickupCoords ? `${bookingData.pickupCoords.lat.toFixed(6)}, ${bookingData.pickupCoords.lng.toFixed(6)}` : "—")}
                  </span>
                </div>
                <div className="confirmation-row">
                  <span className="confirmation-label">Dropoff Location:</span>
                  <span className="confirmation-value">
                    {bookingData.dropoff || (bookingData.dropoffCoords ? `${bookingData.dropoffCoords.lat.toFixed(6)}, ${bookingData.dropoffCoords.lng.toFixed(6)}` : "—")}
                  </span>
                </div>
                <div className="confirmation-row">
                  <span className="confirmation-label">Date:</span>
                  <span className="confirmation-value">{formatDate(bookingData.date)}</span>
                </div>
                <div className="confirmation-row">
                  <span className="confirmation-label">Time:</span>
                  <span className="confirmation-value">{formatTime(bookingData.time)}</span>
                </div>
                <div className="confirmation-row">
                  <span className="confirmation-label">Vehicle:</span>
                  <span className="confirmation-value">{bookingData.vehicle || "—"}</span>
                </div>
                <div className="confirmation-row">
                  <span className="confirmation-label">Passengers:</span>
                  <span className="confirmation-value">{bookingData.passengers ? bookingData.passengers : "—"}</span>
                </div>
              </div>

              <div className="confirmation-section">
                <h3>Contact Information</h3>
                <div className="confirmation-row">
                  <span className="confirmation-label">Name:</span>
                  <span className="confirmation-value">{bookingData.customerName || "—"}</span>
                </div>
                <div className="confirmation-row">
                  <span className="confirmation-label">Phone:</span>
                  <span className="confirmation-value">{bookingData.phone ? `+1 ${bookingData.phone}` : "—"}</span>
                </div>
                <div className="confirmation-row">
                  <span className="confirmation-label">Email:</span>
                  <span className="confirmation-value">{bookingData.email || "—"}</span>
                </div>
              </div>

              <div className="confirmation-note" style={{ background: "#f0f9ff", border: "2px solid #0b6cf2", borderRadius: "12px", padding: "20px", marginTop: "20px" }}>
                <p style={{ margin: "0", fontSize: "14px", color: "#64748b", lineHeight: "1.6" }}>
                  By confirming this booking, you acknowledge that you have read, understood, and agree to our{" "}
                  <a
                    href="/terms"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#0b6cf2", fontWeight: 600 }}
                  >
                    terms and conditions
                  </a>
                  . 
                </p>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-cancel" onClick={onClose} disabled={isSubmitting}>
                Cancel
              </button>
              <button className="btn-confirm" onClick={handleConfirm} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <span 
                      className="button-spinner" 
                      style={{
                        width: '18px',
                        height: '18px',
                        minWidth: '18px',
                        minHeight: '18px',
                        border: '2px solid rgba(255, 255, 255, 0.3)',
                        borderTopColor: 'white',
                        borderRadius: '50%',
                        animation: 'spin 0.7s linear infinite',
                        display: 'block',
                        flexShrink: 0,
                        margin: 0,
                        padding: 0,
                        boxSizing: 'border-box'
                      }}
                    ></span>
                    <span className="confirming-text" style={{ animation: 'none', transform: 'none', display: 'inline-block', position: 'relative', zIndex: 1 }}>Confirming...</span>
                  </>
                ) : (
                  "Confirm Booking"
                )}
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="modal-header">
              <h2>Booking Successful</h2>
            </div>
            <div className="modal-body">
              <p style={{ fontSize: "16px", color: "#0f172a", marginBottom: "12px" }}>
                Thank you, {bookingData.customerName || "guest"}!
              </p>
              <p style={{ fontSize: "14px", color: "#64748b", marginBottom: "20px" }}>
                Your booking has been successfully submitted. Our team will contact you shortly to confirm all details.
                Please also check your email for a confirmation message.
              </p>
              {bookingRef && (
                <div style={{ 
                  background: "#f0f9ff", 
                  border: "2px solid #0b6cf2", 
                  borderRadius: "12px", 
                  padding: "16px", 
                  marginBottom: "20px",
                  textAlign: "center"
                }}>
                  <div style={{ fontSize: "12px", color: "#64748b", marginBottom: "5px" }}>
                    Booking Reference Number
                  </div>
                  <div style={{ fontSize: "20px", fontWeight: 700, color: "#0b6cf2", fontFamily: "monospace" }}>
                    {bookingRef}
                  </div>
                </div>
              )}
              <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
                <button 
                  className="btn-confirm" 
                  onClick={handleDownloadPDF}
                  style={{ minWidth: "160px", background: "#10b981" }}
                >
                  View Booking Information
                </button>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-confirm" onClick={handleSuccessClose}>Done</button>
            </div>
            
            {/* Hidden template for printing */}
            {bookingRef && (
              <div ref={printContainerRef} style={{ position: "absolute", left: "-9999px", top: "-9999px", visibility: "hidden" }}>
                <div ref={printRef}>
                  <BookingConfirmationTemplate bookingData={bookingData} bookingRef={bookingRef} />
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
