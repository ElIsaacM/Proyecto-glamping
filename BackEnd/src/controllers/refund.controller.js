import { refunds } from "../models/refund.model.js";
import pool from "../config/db.js";

export const getRefunds = async (req, res) => {
  try {
    const result = await pool.query(refunds.getRefunds);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}