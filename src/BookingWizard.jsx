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
    addons: [],
    price: 0,
    customerName: "",
    phone: ""
  });

  const location = useLocation();

  // If the user arrived from VehiclesPage with a preselected vehicle, apply it
  useEffect(() => {
    if (location?.state?.vehicle) {
      const vehicleName = location.state.vehicle;
      // conservative default price mapping when coming from product listing
      const priceMap = {
        Sedan: 75,
        SUV: 110,
        'Luxury Van': 160,
        'Stretch Limousine': 260,
        'Executive Sedan': 95,
        'Party Bus': 320,
      };

      // set preselected vehicle and conservative default price, but do NOT jump to step 3
      // Users still must complete pickup/dropoff/date/time/passengers in order
      setData((d) => ({ ...d, vehicle: vehicleName, price: d.price || (priceMap[vehicleName] || d.price) }));
    }
  }, [location?.state]);

  const next = () => setStep((s) => Math.min(5, s + 1));
  const back = () => setStep((s) => Math.max(1, s - 1));

  const setDataPatch = (patch) => setData((d) => ({ ...d, ...patch }));

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
           data.phone.replace(/\D/g, '').length >= 10;
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

        <aside className="summary-card">
          <div className="summary-inner">
            <h4>Quick Summary</h4>
            <div className="summary-row">
              <div>
                <small>Pickup</small>
                <div className="muted">
                  {data.pickup || (data.pickupCoords ? `${data.pickupCoords.lat.toFixed(4)}, ${data.pickupCoords.lng.toFixed(4)}` : "—")}
                </div>
              </div>
              <div>
                <small>Dropoff</small>
                <div className="muted">
                  {data.dropoff || (data.dropoffCoords ? `${data.dropoffCoords.lat.toFixed(4)}, ${data.dropoffCoords.lng.toFixed(4)}` : "—")}
                </div>
              </div>
            </div>

            <div className="summary-row">
              <div>
                <small>Date</small>
                <div className="muted">{data.date || "—"}</div>
              </div>
              <div>
                <small>Time</small>
                <div className="muted">{formatTime(data.time)}</div>
              </div>
            </div>

            <div className="summary-row">
              <div>
                <small>Vehicle</small>
                <div className="muted">{data.vehicle || "—"}</div>
              </div>
              <div>
                <small>Passengers</small>
                <div className="muted">{data.passengers ? data.passengers : "—"}</div>
              </div>
            </div>

            {(data.customerName || data.phone) && (
              <div className="summary-row">
                <div>
                  <small>Name</small>
                  <div className="muted">{data.customerName || "—"}</div>
                </div>
                <div>
                  <small>Phone</small>
                  <div className="muted">{data.phone || "—"}</div>
                </div>
              </div>
            )}

            <div className="total-box">
              <small>Estimated Total</small>
              <div className="total-value">${data.price || 0}</div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
