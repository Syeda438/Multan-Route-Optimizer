// =========================
// backend/data/multanGraph.js
// =========================
export const graph = {
  "Gulgasht": { "Bosan Road": 5, "Cantt": 8, "Mumtazabad": 6 },
  "Bosan Road": { "Gulgasht": 5, "DHA": 7, "Shah Rukn-e-Alam": 6 },
  "Cantt": { "Gulgasht": 8, "Mumtazabad": 4, "DHA": 10 },
  "Mumtazabad": { "Gulgasht": 6, "Cantt": 4, "Shah Rukn-e-Alam": 5 },
  "Shah Rukn-e-Alam": { "Mumtazabad": 5, "Bosan Road": 6, "DHA": 4 },
  "DHA": { "Bosan Road": 7, "Cantt": 10, "Shah Rukn-e-Alam": 4 }
};

// Traffic multipliers (peak hours: 8-10am, 5-7pm)
export const trafficPatterns = {
  "Gulgasht": { peak: 1.4, offPeak: 1.0 },
  "Bosan Road": { peak: 1.6, offPeak: 1.0 },
  "Cantt": { peak: 1.3, offPeak: 1.0 },
  "Mumtazabad": { peak: 1.5, offPeak: 1.0 },
  "Shah Rukn-e-Alam": { peak: 1.8, offPeak: 1.0 },
  "DHA": { peak: 1.2, offPeak: 1.0 }
};