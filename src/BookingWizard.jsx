import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import Locations from "./components/Locations";
import DateTime from "./components/DateTime";
import Vehicle from "./components/Vehicle";
import CustomerInfo from "./components/CustomerInfo";
import Review from "./components/Review";
import ProgressBar from "./components/ProgressBar";

// Premium per-km estimates (higher-tier, roughly aligned to premium US limo market)
const VEHICLE_RATES = {
  Sedan: 6.50,
  SUV: 8.50,
  Executive: 10.50,
  "Sprinter Bus": 12.50
};

const STORAGE_KEY = "jj_limo_booking_data";
const STEP_STORAGE_KEY = "jj_limo_booking_step";

// Helper functions for localStorage
const saveBookingData = (data) => {
  try {
    // Convert coordinates to serializable format
    const serializableData = {
      ...data,
      pickupCoords: data.pickupCoords ? { lat: data.pickupCoords.lat, lng: data.pickupCoords.lng } : null,
      dropoffCoords: data.dropoffCoords ? { lat: data.dropoffCoords.lat, lng: data.dropoffCoords.lng } : null,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(serializableData));
  } catch (error) {
    console.error("Error saving booking data:", error);
  }
};

const loadBookingData = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const data = JSON.parse(saved);
      // Restore coordinates as objects
      return {
        ...data,
        pickupCoords: data.pickupCoords ? { lat: data.pickupCoords.lat, lng: data.pickupCoords.lng } : null,
        dropoffCoords: data.dropoffCoords ? { lat: data.dropoffCoords.lat, lng: data.dropoffCoords.lng } : null,
      };
    }
  } catch (error) {
    console.error("Error loading booking data:", error);
  }
  return null;
};

export const clearBookingData = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STEP_STORAGE_KEY);
  } catch (error) {
    console.error("Error clearing booking data:", error);
  }
};

export default function BookingWizard() {
  // Load saved data on mount
  const savedData = loadBookingData();
  const savedStep = (() => {
    try {
      const step = localStorage.getItem(STEP_STORAGE_KEY);
      if (step) {
        const stepNum = parseInt(step, 10);
        // Validate step is between 1 and 5
        if (stepNum >= 1 && stepNum <= 5) {
          return stepNum;
        }
      }
    } catch (error) {
      console.error("Error loading saved step:", error);
    }
    return 1;
  })();
  
  const [step, setStep] = useState(savedStep);

  const [data, setData] = useState(savedData || {
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

  // Save data to localStorage whenever it changes
  useEffect(() => {
    saveBookingData(data);
  }, [data]);

  // Recalculate price whenever distance or vehicle changes
  useEffect(() => {
    if (!data.vehicle || !data.distanceKm) {
      setData((d) => ({ ...d, price: 0 }));
      return;
    }
    const rate = VEHICLE_RATES[data.vehicle] || 0;
    const total = data.distanceKm * rate;
    const rounded = Math.max(0, Math.round(total * 100) / 100); // 2 decimals
    setData((d) => ({ ...d, price: rounded }));
  }, [data.vehicle, data.distanceKm]);

  // Save step to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STEP_STORAGE_KEY, step.toString());
  }, [step]);

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
