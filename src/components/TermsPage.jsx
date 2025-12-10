import React from "react";

export default function TermsPage() {
  return (
    <section className="contact-page">
      <div className="container">
        <div className="contact-hero">
          <h1 className="page-title">Terms & Conditions</h1>
          <p className="page-subtitle">
            Please review these terms before confirming your booking with J&amp;J Limo Services.
          </p>
        </div>

        <div className="contact-info-centered">
          <div className="contact-form-section">
            <h2>1. Booking &amp; Confirmation</h2>
            <p>
              All bookings are subject to availability and are only confirmed once you receive a
              confirmation message from J&amp;J Limo Services via email or phone. The details
              you provide during the booking process (pickup time, locations, passenger count, and
              vehicle type) must be accurate. Please review your confirmation carefully and contact
              us immediately if you notice any errors.
            </p>

            <h2>2. Pricing & Payments</h2>
            <p>
              <strong>Fare Calculation:</strong> The quoted fare shown during booking is an estimate based on the distance, 
              vehicle type, and route information you provide. Final pricing may vary based on actual distance traveled, 
              traffic conditions, tolls, waiting time, route changes, and any additional services requested. Our team will 
              contact you to confirm the final fare before your trip.
            </p>
            <p>
              <strong>Payment Methods:</strong> We accept major credit cards (Visa, Mastercard, American Express, Discover), 
              debit cards, and cash. Payment is typically collected on the day of service, either at the start or end of your trip, 
              as agreed upon with your driver. For corporate accounts or advance bookings, alternative payment arrangements may be 
              available upon request.
            </p>
            <p>
              <strong>Payment Terms:</strong> Unless otherwise agreed in writing, payment is due at the time of service. 
              For trips requiring a deposit or advance payment, you will be notified during the booking confirmation process. 
              All prices are quoted in USD and are subject to applicable taxes and fees.
            </p>
            <p>
              <strong>Additional Charges:</strong> Additional fees may apply for: extended waiting time beyond the included grace period, 
              extra stops not included in the original booking, tolls and parking fees, airport fees (where applicable), 
              late-night or holiday surcharges, and cleaning fees for excessive spillage or damage to the vehicle.
            </p>
            <p>
              <strong>Refunds & Disputes:</strong> Refunds are considered on a case-by-case basis and are subject to our cancellation 
              policy. If you have concerns about your fare or service, please contact us within 48 hours of your trip completion. 
              We will review your request and respond within 5 business days.
            </p>

            <h2>3. Cancellations & Changes</h2>
            <p>
              <strong>Cancellation Policy:</strong> You may cancel your booking up to 24 hours before the scheduled pickup time 
              without penalty. Cancellations made within 24 hours of the scheduled pickup time may be subject to a cancellation fee 
              of up to 50% of the quoted fare. Cancellations made less than 2 hours before pickup or no-shows will be charged the full 
              quoted fare. Refunds for cancellations will be processed within 5-10 business days to the original payment method.
            </p>
            <p>
              <strong>Modifications:</strong> Changes to pickup time, locations, vehicle type, or passenger count are subject to 
              availability and must be requested at least 24 hours before the scheduled pickup. Last-minute changes may incur additional 
              fees. Any modifications that affect the final price will be discussed with you and confirmed before the trip.
            </p>
            <p>
              <strong>Service Cancellations:</strong> In rare cases, J&amp;J Limo Services may need to cancel a booking due to 
              circumstances beyond our control (severe weather, vehicle mechanical issues, driver emergencies). In such cases, we will 
              provide a full refund or work with you to reschedule at no additional cost.
            </p>

            <h2>4. Delays, No‑Shows & Waiting Time</h2>
            <p>
              For airport pickups, we monitor flight status whenever possible. If you are delayed at
              immigration, baggage claim, or customs, please notify us as soon as possible. A
              reasonable grace period is included in your booking; additional waiting time may be
              charged at our standard hourly rate. If the passenger is not present at the agreed
              pickup location and cannot be reached, the trip may be treated as a no‑show and
              charged in full.
            </p>

            <h2>5. Passenger Conduct & Safety</h2>
            <p>
              For the safety and comfort of all passengers and drivers, smoking, vaping, and illegal
              substances are strictly prohibited in all vehicles. Seat belts must be worn where
              provided, and local laws regarding child seats and restraints must be followed.
              J&amp;J Limo Services reserves the right to refuse service to any person whose
              behavior is unsafe, abusive, or unlawful. Cleaning fees may apply in the event of
              excessive spillage or damage.
            </p>

            <h2>6. Luggage & Personal Items</h2>
            <p>
              Please ensure that the selected vehicle has enough capacity for your luggage. Oversized
              or excess baggage must be disclosed at the time of booking. While our drivers will
              assist with loading and unloading, you are responsible for your personal belongings.
              J&amp;J Limo Services is not liable for items left in the vehicle, but we will do our
              best to help locate and return lost property.
            </p>

            <h2>7. Service Area & Third‑Party Services</h2>
            <p>
              J&amp;J Limo Services primarily operates in New Jersey, New York, and surrounding
              areas. Some trips may be fulfilled in coordination with trusted affiliate partners who
              meet our safety and service standards. In such cases, the same terms and conditions
              will apply to your journey.
            </p>

            <h2>8. Limitation of Liability</h2>
            <p>
              We make every reasonable effort to ensure on‑time service, but we cannot be held
              responsible for delays caused by circumstances beyond our control, including but not
              limited to traffic, weather, road closures, accidents, or mechanical issues. In no
              event shall J&amp;J Limo Services be liable for indirect, incidental, or consequential
              damages arising out of the use of our services.
            </p>

            <h2>9. Location Services & Privacy</h2>
            <p>
              To provide you with the best booking experience, our website may request access to your device&apos;s location. 
              If you grant location permission, we will automatically fill in your pickup location to save you time. 
              Your location data is used solely for the purpose of facilitating your booking and is not stored or shared with third parties. 
              You can always manually enter your pickup and dropoff locations if you prefer not to share your location. 
              Information you provide during booking (such as your name, contact details, and trip
              information) is used solely to manage your reservation, improve our service, and
              communicate with you about your trip. We do not sell your personal data. For more
              details, please contact us directly.
            </p>

            <h2>10. Updates to These Terms</h2>
            <p>
              J&amp;J Limo Services may update these terms and conditions from time to time. The
              version in effect at the time of your confirmed booking will apply to that trip.
            </p>

            <p style={{ marginTop: "24px", fontSize: "14px", color: "#64748b" }}>
              If you have any questions about these terms, please{" "}
              <a href="/contact" style={{ color: "#0b6cf2", fontWeight: 600 }}>contact us</a> before
              confirming your booking.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}


