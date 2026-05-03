// =========================
// frontend/src/pages/Dashboard.jsx
// =========================
import React, { useState } from "react";
import DeliveryForm from "../components/DeliveryForm";
import RouteMap from "../components/RouteMap";
import StatCard from "../components/StatCard";
import RouteDetails from "../components/RouteDetails";
import TrafficAlert from "../components/TrafficAlert";
import "../styles/dashboard.css";

export default function Dashboard() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="dashboard-container">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <div>
            <h1 className="header-title">
              Multan Route Optimizer
            </h1>
            <p className="header-subtitle">
              Smart delivery routing for Multan's logistics
            </p>
          </div>
          <div>
            <span className="live-badge">
              ● Live
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <div className="grid-layout">
          {/* Left Column - Form */}
          <div>
            <DeliveryForm onResult={setResult} setLoading={setLoading} />
            {result?.segments && <RouteDetails segments={result.segments} />}
          </div>

          {/* Right Column - Results */}
          <div>
            {/* Traffic Alert */}
            <TrafficAlert />
            
            {/* Route Display */}
            <div className="card" style={{ marginBottom: '1.5rem' }}>
              <div className="card-header">
                <h2 className="card-title">
                  {loading ? "Calculating..." : "Optimized Route"}
                </h2>
                <p className="card-subtitle">
                  {result && `${result.route.length} stops • Prioritized by urgency`}
                </p>
              </div>
              <div className="card-content">
                <RouteMap result={result} loading={loading} />
              </div>
            </div>

            {/* Stats Grid */}
            {result && (
              <div className="stats-grid">
                <StatCard 
                  label="Total Distance" 
                  value={`${result.total} km`}
                  icon="📍"
                  color="blue"
                />
                <StatCard 
                  label="Estimated Time" 
                  value={`${result.eta} min`}
                  icon="⏱️"
                  color="orange"
                />
                <StatCard 
                  label="Fuel Required" 
                  value={`${result.fuel} L`}
                  icon="⛽"
                  color="green"
                />
                <StatCard 
                  label="Fuel Remaining" 
                  value={result.fuelRemaining ? `${result.fuelRemaining} L` : "N/A"}
                  icon="🔋"
                  color="purple"
                />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}