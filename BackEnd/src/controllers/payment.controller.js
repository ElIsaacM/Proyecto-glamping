import { payment } from "../models/payments.model.js";
import pool from "../config/db.js";

export const getPayments = async (req, res) => {
  try {
    const result = await pool.query(payment.getPayments);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const createPaymentManually = async (req, res) => {
  try {
    const { facturaid, email, metodoid, totalpagado } = req.body;

    const estado = 'Aceptado';

    const result = await pool.query(
      payment.createPaymentManually,
      [facturaid, metodoid, estado, totalpagado, email]
    )
    
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Factura o correo del cliente no encontrado, o no coinciden." });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
