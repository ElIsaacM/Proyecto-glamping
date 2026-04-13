import { refounds } from "../models/refound.model.js";
import pool from "../config/db.js";

export const getRefounds = async (req, res) => {
  try {
    const result = await pool.query(refounds.getRefounds);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}