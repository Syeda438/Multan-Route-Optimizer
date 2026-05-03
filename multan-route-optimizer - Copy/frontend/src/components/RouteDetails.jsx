// =========================
// frontend/src/components/RouteDetails.jsx
// =========================
import React from "react";

export default function RouteDetails({ segments }) {
  return (
    <div className="card" style={{ marginTop: '1.5rem' }}>
      <div className="card-header">
        <h3 className="card-title">Route Breakdown</h3>
      </div>
      <div className="card-content">
        <div>
          {segments.map((seg, idx) => (
            <div key={idx} style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              padding: '0.75rem',
              background: '#f8fafc',
              borderRadius: '0.75rem',
              marginBottom: '0.75rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                  width: '2rem',
                  height: '2rem',
                  borderRadius: '9999px',
                  background: '#0f172a',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: 'bold'
                }}>
                  {idx + 1}
                </div>
                <div>
                  <p style={{ fontWeight: '500', color: '#0f172a', margin: 0 }}>
                    {seg.from} → {seg.to}
                  </p>
                  <p style={{ fontSize: '0.75rem', color: '#64748b', margin: '0.25rem 0 0 0' }}>
                    {seg.urgent && <span style={{ color: '#ef4444' }}>🚨 Urgent • </span>}
                    {seg.distance} km • {seg.fuel} L fuel
                  </p>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: '0.875rem', fontWeight: '600', color: '#0f172a', margin: 0 }}>
                  {Math.ceil(seg.distance / 25 * 60)} min
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}