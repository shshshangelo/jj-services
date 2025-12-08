import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import Locations from "./components/Locations";
import DateTime from "./components/DateTime";
import Vehicle from "./components/Vehicle";
import CustomerInfo from "./components/CustomerInfo";
import Review from "./components/Review";
import ProgressBar from "./components/ProgressBar";

export default function BookingWizard() {
  const [step, setStep] = useState(1);

  const [data, setData] = useState({
    pickup: "",
    dropoff: "",
    pickupCoords: null,
    dropoffCoords: null,
    date: "",
    time: "",
    vehicle: "",
    passengers: "",
    distanceKm: 0,
    addons: [],
    price: 0,
    customerName: "",
    phone: "",
    email: ""
  });

  const location = useLocation();

  // If the user arrived from VehiclesPage with a preselected vehicle, apply it
  useEffect(() => {
    if (location?.state?.vehicle) {
      const vehicleName = location.state.vehicle;
      // preselect vehicle from fleet page; price will be calculated later based on distance
      setData((d) => ({ ...d, vehicle: vehicleName }));
    }
  }, [location?.state]);

  const next = () => setStep((s) => Math.min(5, s + 1));
  const back = () => setStep((s) => Math.max(1, s - 1));

  const setDataPatch = (patch) => setData((d) => ({ ...d, ...patch }));

  // Keep the current step card (Step 1–5 box) in a stable position when
  // changing steps, so the user always sees the top of the step box.
  useEffect(() => {
    const stepCard = document.querySelector(".wizard-card");
    if (stepCard) {
      const rect = stepCard.getBoundingClientRect();
      const offset = 110; // roughly header height + a bit of breathing room
      const targetTop = window.pageYOffset + rect.top - offset;
      window.scrollTo({ top: targetTop, behavior: "smooth" });
    }
  }, [step]);

  const formatTime = (time) => {
    // Display time in 24-hour (military) format `HH:MM`
    if (!time) return "—";
    const [hStr = '', mStr = ''] = time.split(":");
    if (hStr === '' || mStr === '') return time;
    return `${hStr.padStart(2, '0')}:${mStr.padStart(2, '0')}`;
  };

  // Strict validation - check if all required steps are completed
  const isBookingComplete = () => {
    return data.pickupCoords && 
           data.dropoffCoords && 
           data.date && 
           data.time && 
           data.vehicle && 
           data.passengers > 0 &&
           data.customerName &&
           data.phone &&
           data.phone.replace(/\D/g, '').length >= 10 &&
           data.email &&
           data.email.includes("@");
  };

  return (
    <div className="wizard-area">
      <div className="container">
        <div className="wizard-card">
          <ProgressBar step={step} />

          {step === 1 && (
            <Locations next={next} data={data} setData={setDataPatch} />
          )}
          {step === 2 && (
            <DateTime next={next} back={back} data={data} setData={setDataPatch} />
          )}
          {step === 3 && (
            <Vehicle next={next} back={back} data={data} setData={setDataPatch} />
          )}
          {step === 4 && (
            <CustomerInfo next={next} back={back} data={data} setData={setDataPatch} />
          )}
          {step === 5 && (
            <Review back={back} data={data} />
          )}
        </div>
      </div>
    </div>
  );
}
