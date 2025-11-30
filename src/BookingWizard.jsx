import React, { useState } from "react";
import Step1_Locations from "./components/Step1_Locations";
import Step2_DateTime from "./components/Step2_DateTime";
import Step3_Vehicle from "./components/Step3_Vehicle";
import Step4_Extras from "./components/Step4_Extras";
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
    passengers: 1,
    addons: [],
    price: 0,
    customerName: "",
    phone: ""
  });

  const next = () => setStep((s) => Math.min(6, s + 1));
  const back = () => setStep((s) => Math.max(1, s - 1));

  const setDataPatch = (patch) => setData((d) => ({ ...d, ...patch }));

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
            <Step4_Extras next={next} back={back} data={data} setData={setDataPatch} />
          )}
          {step === 5 && (
            <Step5_CustomerInfo next={next} back={back} data={data} setData={setDataPatch} />
          )}
          {step === 6 && (
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
                <div className="muted">{data.time || "—"}</div>
              </div>
            </div>

            <div className="summary-row">
              <div>
                <small>Vehicle</small>
                <div className="muted">{data.vehicle || "—"}</div>
              </div>
              <div>
                <small>Passengers</small>
                <div className="muted">{data.passengers}</div>
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

            <button
              className={`cta ${!isBookingComplete() ? 'disabled' : ''}`}
              onClick={() => isBookingComplete() && setStep(6)}
              disabled={!isBookingComplete()}
              title={!isBookingComplete() ? "Please complete all steps before reviewing" : ""}
            >
              Continue to Review
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
