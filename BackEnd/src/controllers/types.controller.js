import pool from "../config/db.js";
import { types } from "../models/types.model.js";

export const getRoles = async (req, res) => {
  try {
    const result = await pool.query(types.getRoles);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getIdentificaciones = async (req, res) => {
  try {
    const result = await pool.query(types.getIdentificaciones);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
