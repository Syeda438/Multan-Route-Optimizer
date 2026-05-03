// =========================
// frontend/src/components/RouteMap.jsx
// =========================
import React from "react";

export default function RouteMap({ result, loading }) {
  if (loading) {
    return (
      <div style={{ animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}>
        <div style={{ height: '8rem', background: '#f1f5f9', borderRadius: '0.75rem', marginBottom: '1rem' }}></div>
        <div style={{ height: '2rem', background: '#f1f5f9', borderRadius: '0.5rem', width: '75%', margin: '0 auto' }}></div>
      </div>
    );
  }
  
  if (!result) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem 0' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🗺️</div>
        <p style={{ color: '#64748b' }}>Configure your delivery to see optimized route</p>
        <p style={{ fontSize: '0.875rem', color: '#94a3b8', marginTop: '0.5rem' }}>
          Select stops and set priorities for best results
        </p>
      </div>
    );
  }
  
  return (
    <div>
      <div className="route-visualization">
        {result.route.map((stop, i) => (
          <React.Fragment key={i}>
            <div className="route-stop">
              <div className={`stop-circle ${
                i === 0 ? 'stop-start' : 
                result.segments?.some(s => s.urgent && s.to === stop) ? 
                'stop-urgent' : 'stop-normal'
              }`}>
                {i + 1}
              </div>
              <div className="stop-label">{stop}</div>
            </div>
            {i < result.route.length - 1 && (
              <div className="route-arrow">→</div>
            )}
          </React.Fragment>
        ))}
      </div>
      
      {/* Legend */}
      <div className="legend">
        <div className="legend-item">
          <div className="legend-dot legend-start"></div>
          <span className="legend-text">Start</span>
        </div>
        <div className="legend-item">
          <div className="legend-dot legend-urgent"></div>
          <span className="legend-text">Urgent Delivery</span>
        </div>
        <div className="legend-item">
          <div className="legend-dot legend-normal"></div>
          <span className="legend-text">Standard Stop</span>
        </div>
      </div>
    </div>
  );
}