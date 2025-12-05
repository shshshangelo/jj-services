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
              confirmation message from J&amp;J Limo Services via email, SMS, or phone. The details
              you provide during the booking process (pickup time, locations, passenger count, and
              vehicle type) must be accurate. Please review your confirmation carefully and contact
              us immediately if you notice any errors.
            </p>

            <h2>2. Pricing & Payments</h2>
            <p>
              Our driver will contact you directly to discuss the total payment amount based on your trip details, 
              vehicle selection, route, time of day, traffic conditions, tolls, waiting time, and any special requests. 
              Final pricing will be confirmed by our team before your trip. Unless otherwise agreed in writing, 
              payment is typically collected on the day of service using an accepted payment method (major credit/debit cards or cash).
            </p>

            <h2>3. Cancellations & Changes</h2>
            <p>
              You may modify or cancel your booking up to 24 hours before the scheduled pickup time
              without penalty. Cancellations made within 24 hours of pickup may be subject to a
              cancellation fee. Changes to pickup time, locations, or vehicle
              type are subject to availability and may affect the final price, which will be discussed with you.
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


