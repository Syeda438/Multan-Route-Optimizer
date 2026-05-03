// =========================
// backend/routes/optimize.js
// =========================
import express from "express";
import { optimize } from "../services/optimizer.js";

const router = express.Router();

router.post("/", (req, res) => {
  try {
    const { start, stops, constraints } = req.body;
    const result = optimize(start, stops, constraints || {});
    res.json({ success: true, ...result });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

export default router;