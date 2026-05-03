// =========================
// frontend/src/components/StatCard.jsx
// =========================
import React from "react";

const colorStyles = {
  blue: { background: 'linear-gradient(135deg, #3b82f6, #2563eb)' },
  orange: { background: 'linear-gradient(135deg, #f97316, #ea580c)' },
  green: { background: 'linear-gradient(135deg, #22c55e, #16a34a)' },
  purple: { background: 'linear-gradient(135deg, #a855f7, #9333ea)' }
};

export default function StatCard({ label, value, icon, color = "blue" }) {
  return (
    <div className="stat-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <p className="stat-label">{label}</p>
          <p className="stat-value">{value}</p>
        </div>
        <div style={{ 
          fontSize: '1.5rem',
          background: colorStyles[color].background,
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent'
        }}>
          {icon}
        </div>
      </div>
    </div>
  );
}