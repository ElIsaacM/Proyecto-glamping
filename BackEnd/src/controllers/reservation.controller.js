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

export const activateReservation = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      reservation.activateReservation,
      [id]
    );
  } catch (error) {
    res.status(500).json({error: error.message})
  }
};

export const getReservationStats = async (req, res) => {
  try {
    const result = await pool.query()

    res.json(result.rows[0])
  } catch (error) {
    res.status(500).json({error: error.message})
  }
};

export const reservationFilters = async (req, res) => {
  try {
    const [] = await Promise.all([

    ]);

    res.json({
      
    });
  } catch (error) {
    res.status(500).json({error: error.message})
  }
};