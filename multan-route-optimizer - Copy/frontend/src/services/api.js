// =========================
// frontend/src/services/api.js
// =========================
const API_URL = 'http://localhost:5000';

export async function optimizeRoute(payload) {
  try {
    const res = await fetch(`${API_URL}/api/optimize`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    
    return await res.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}