// =========================
// frontend/src/components/TrafficAlert.jsx
// =========================
import React from "react";

export default function TrafficAlert() {
  const now = new Date();
  const hour = now.getHours();
  const isPeak = (hour >= 8 && hour <= 10) || (hour >= 17 && hour <= 19);
  
  if (!isPeak) return null;
  
  return (
    <div className="alert-peak" style={{ marginBottom: '1.5rem' }}>
      <div className="alert-peak-content">
        <span className="alert-icon">🚦</span>
        <div>
          <p className="alert-title">Peak Traffic Hour</p>
          <p className="alert-message">
            Routes may take 30-80% longer. Enable "Peak Hour" in delivery config for accurate ETAs.
          </p>
        </div>
      </div>
    </div>
  );
}