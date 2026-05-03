// =========================
// backend/services/optimizer.js
// =========================
import { graph, trafficPatterns } from "../data/multanGraph.js";

function dijkstra(start, end, constraints = {}) {
  const nodes = Object.keys(graph);
  const dist = {}, prev = {};
  const visited = new Set();
  
  nodes.forEach(n => { dist[n] = Infinity; prev[n] = null; });
  dist[start] = 0;
  
  // Apply traffic multiplier if in peak hour
  const getEdgeWeight = (from, to, weight) => {
    if (constraints.isPeakHour) {
      const multiplier = trafficPatterns[to]?.peak || 1.0;
      return weight * multiplier;
    }
    return weight;
  };
  
  while (visited.size < nodes.length) {
    let u = null;
    for (const n of nodes) {
      if (!visited.has(n) && (u === null || dist[n] < dist[u])) u = n;
    }
    if (u === null) break;
    visited.add(u);
    
    const neighbors = graph[u] || {};
    for (const [v, w] of Object.entries(neighbors)) {
      const effectiveWeight = getEdgeWeight(u, v, w);
      const alt = dist[u] + effectiveWeight;
      if (alt < dist[v]) { 
        dist[v] = alt; 
        prev[v] = u; 
      }
    }
  }
  
  const path = [];
  for (let at = end; at; at = prev[at]) path.unshift(at);
  return { distance: dist[end], path };
}

// Priority-based route sequencing
export function optimize(start, stops, constraints = {}) {
  // Sort stops by priority (urgent first)
  const sortedStops = [...stops].sort((a, b) => {
    if (a.urgent && !b.urgent) return -1;
    if (!a.urgent && b.urgent) return 1;
    return 0;
  });
  
  let total = 0;
  let route = [start];
  let current = start;
  let fuelUsed = 0;
  const segmentDetails = [];
  
  for (const stop of sortedStops) {
    const result = dijkstra(current, stop.name, constraints);
    
    if (result.distance === Infinity) {
      throw new Error(`No route found from ${current} to ${stop.name}`);
    }
    
    // Check fuel constraint
    const segmentFuel = (result.distance / 35);
    if (constraints.maxFuel && (fuelUsed + segmentFuel) > constraints.maxFuel) {
      throw new Error(`Insufficient fuel to reach ${stop.name}`);
    }
    
    total += result.distance;
    fuelUsed += segmentFuel;
    route.push(...result.path.slice(1));
    segmentDetails.push({
      from: current,
      to: stop.name,
      distance: result.distance,
      fuel: segmentFuel.toFixed(2),
      urgent: stop.urgent
    });
    current = stop.name;
  }
  
  // Calculate ETA with traffic consideration
  const baseSpeed = 25; // km/h average
  const etaMinutes = constraints.isPeakHour ? 
    Math.ceil(total / baseSpeed * 75) : // 75% speed in peak
    Math.ceil(total / baseSpeed * 60);
  
  return { 
    route, 
    total, 
    eta: etaMinutes,
    fuel: fuelUsed.toFixed(2),
    segments: segmentDetails,
    fuelRemaining: constraints.maxFuel ? 
      (constraints.maxFuel - fuelUsed).toFixed(2) : null
  };
}