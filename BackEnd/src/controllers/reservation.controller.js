import { reservation } from "../models/reservation.model.js";
import pool from "../config/db.js";

export const getReservations = async (req, res) => {
  try {
    const result = await pool.query(
      reservation.getReservations
    );

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getReservationByClient = async (req, res) => {
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

export const updateReservationByPayment = async (req, res) => {
  try {
    const { reserva_id } = req.body;

    const result = await pool.query(reservation.updateReservationByPayment,
      [reserva_id]
    )
    res.status(200).json({
      message: "Reserva actualizada",
      reserva_id: reserva_id,
      data: result.rows[0]
    })
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}

export const deleteReservation = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(reservation.deleteReservation,
      [id]
    )

    res.status(200).json({
      message: "Reserva eliminada",
      reservaId: id,
      data: result.rows[0]
    })
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}

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