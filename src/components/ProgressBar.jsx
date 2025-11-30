import React from "react";

export default function ProgressBar({ step }) {
  const steps = ["Locations", "Date & Time", "Vehicle", "Extras", "Contact Info", "Review"];

  return (
    <div className="progress-bar-wrapper">
      {steps.map((label, index) => {
        const stepNum = index + 1;
        const isActive = stepNum === step;
        const isCompleted = stepNum < step;

        return (
          <div key={label} className="progress-step">
            <div
              className={`circle ${isActive ? "active" : ""} ${isCompleted ? "completed" : ""}`}
            >
              {stepNum}
            </div>
            <div className="step-label">{label}</div>
            {index < steps.length - 1 && (
              <div className={`bar ${isCompleted ? "completed" : ""}`}></div>
            )}
          </div>
        );
      })}
    </div>
  );
}
