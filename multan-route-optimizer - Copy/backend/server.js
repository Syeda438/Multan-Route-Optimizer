// =========================
// backend/server.js
// =========================

import express from "express";
import cors from "cors";
import optimizeRoute from "./routes/optimize.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/optimize", optimizeRoute);
app.get("/", (req, res) => {
  res.send("Multan Route Optimizer API is running");
});

app.listen(5000, () => {
  
  console.log("Server running on port 5000");
});