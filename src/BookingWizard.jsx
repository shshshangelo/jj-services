import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import Step1_Locations from "./components/Step1_Locations";
import Step2_DateTime from "./components/Step2_DateTime";
import Step3_Vehicle from "./components/Step3_Vehicle";
import Step5_CustomerInfo from "./components/Step5_CustomerInfo";
import Step6_Review from "./components/Step6_Review";
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
            <Step1_Locations next={next} data={data} setData={setDataPatch} />
          )}
          {step === 2 && (
            <Step2_DateTime next={next} back={back} data={data} setData={setDataPatch} />
          )}
          {step === 3 && (
            <Step3_Vehicle next={next} back={back} data={data} setData={setDataPatch} />
          )}
          {step === 4 && (
            <Step5_CustomerInfo next={next} back={back} data={data} setData={setDataPatch} />
          )}
          {step === 5 && (
            <Step6_Review back={back} data={data} />
          )}
        </div>
      </div>
    </div>
  );
}
