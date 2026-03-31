import { reservation } from "../models/reservation.model.js";
import pool from "../config/db.js";

export const getreservations = async (req, res) => {
  try {
    const result = await pool.query(
      reservation.getReservations
    );

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getreservationByClient = async (req, res) => {
  try {
    const { name } = req.body;

    const result = await pool.query(
      reservation.getReservationByClient,
      [name.trim()]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Not found' });
    }

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
