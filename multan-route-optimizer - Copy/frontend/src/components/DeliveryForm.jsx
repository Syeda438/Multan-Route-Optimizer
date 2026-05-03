// =========================
// frontend/src/components/DeliveryForm.jsx
// =========================
import React, { useState } from "react";
import { optimizeRoute } from "../services/api";

const areas = ["Gulgasht", "Bosan Road", "Cantt", "Mumtazabad", "Shah Rukn-e-Alam", "DHA"];

export default function DeliveryForm({ onResult, setLoading }) {
  const [start, setStart] = useState("Gulgasht");
  const [selected, setSelected] = useState([]);
  const [urgentMap, setUrgentMap] = useState({});
  const [maxFuel, setMaxFuel] = useState("");
  const [isPeakHour, setIsPeakHour] = useState(false);
  const [error, setError] = useState(null);

  const toggleStop = (area) => {
    if (area === start) return;
    if (selected.includes(area)) {
      setSelected(selected.filter(s => s !== area));
      const newUrgent = { ...urgentMap };
      delete newUrgent[area];
      setUrgentMap(newUrgent);
    } else {
      setSelected([...selected, area]);
      setUrgentMap({ ...urgentMap, [area]: false });
    }
  };

  const toggleUrgent = (area) => {
    setUrgentMap({ ...urgentMap, [area]: !urgentMap[area] });
  };

  const submit = async () => {
    if (selected.length === 0) {
      setError("Please select at least one delivery stop");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const stops = selected.map(name => ({ 
        name, 
        urgent: urgentMap[name] || false 
      }));
      
      const constraints = {};
      if (maxFuel) constraints.maxFuel = parseFloat(maxFuel);
      constraints.isPeakHour = isPeakHour;
      
      const res = await optimizeRoute({ start, stops, constraints });
      
      if (res.success) {
        onResult(res);
      } else {
        setError(res.error);
      }
    } catch (err) {
      setError("Failed to optimize route. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card" style={{ position: 'sticky', top: '6rem' }}>
      <div className="card-header">
        <h2 className="card-title">Delivery Configuration</h2>
        <p className="card-subtitle">Set your delivery parameters</p>
      </div>
      
      <div className="card-content">
        {/* Start Location */}
        <div style={{ marginBottom: '1.25rem' }}>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem', color: '#334155' }}>
            Starting Point
          </label>
          <select 
            value={start} 
            onChange={(e) => setStart(e.target.value)} 
            className="select-input"
          >
            {areas.map(a => <option key={a}>{a}</option>)}
          </select>
        </div>

        {/* Delivery Stops */}
        <div style={{ marginBottom: '1.25rem' }}>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem', color: '#334155' }}>
            Delivery Stops
          </label>
          <div style={{ maxHeight: '16rem', overflowY: 'auto' }}>
            {areas.filter(a => a !== start).map(area => (
              <div key={area} style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
                <button
                  onClick={() => toggleStop(area)}
                  className={`stop-button ${selected.includes(area) ? 'stop-button-selected' : 'stop-button-normal'}`}
                >
                  {area}
                </button>
                {selected.includes(area) && (
                  <button
                    onClick={() => toggleUrgent(area)}
                    className={`urgent-button ${urgentMap[area] ? 'urgent-active' : 'urgent-inactive'}`}
                  >
                    {urgentMap[area] ? "🚨 Urgent" : "📦 Normal"}
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Constraints */}
        <div style={{ marginBottom: '1.25rem' }}>
          <div style={{ marginBottom: '0.75rem' }}>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem', color: '#334155' }}>
              Max Fuel Available (L)
            </label>
            <input
              type="number"
              step="0.5"
              value={maxFuel}
              onChange={(e) => setMaxFuel(e.target.value)}
              placeholder="e.g., 5.0"
              className="select-input"
            />
          </div>
          
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={isPeakHour}
              onChange={(e) => setIsPeakHour(e.target.checked)}
              style={{ width: '1rem', height: '1rem' }}
            />
            <span style={{ fontSize: '0.875rem', color: '#334155' }}>
              🚦 Peak Hour Traffic (8-10am, 5-7pm)
            </span>
          </label>
        </div>

        {/* Error Message */}
        {error && (
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '0.75rem', padding: '0.75rem', marginBottom: '1.25rem' }}>
            <p style={{ fontSize: '0.875rem', color: '#dc2626', margin: 0 }}>{error}</p>
          </div>
        )}

        {/* Submit Button */}
        <button onClick={submit} className="button-primary">
          🚀 Optimize Route
        </button>
      </div>
    </div>
  );
}