import { refounds, refoundFilters as refoundFiltersModel } from "../models/refound.model.js";
import pool from "../config/db.js";

export const getRefounds = async (req, res) => {
  try {
    const result = await pool.query(refounds.getRefounds);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const getRefoundByInvoice = async (req, res) => {
  try {
    const { name } = req.body;

    const result = await pool.query(refounds.getRefoundByInvoice, [name.trim()]);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// al crear un reembolso se debe cambiar el estado de los pagos asociados a la factura por reembolsado

export const refoundFilters = async (req, res) => {
  try {
    const [
      pending_refunds,
      approved_refunds,
      rejected_refunds
    ] = await Promise.all([
      pool.query(refoundFiltersModel.getPendingRefunds),
      pool.query(refoundFiltersModel.getApprovedRefunds),
      pool.query(refoundFiltersModel.getRejectedRefunds),
    ]);

    res.json({
      pending_refunds: pending_refunds.rows,
      approved_refunds: approved_refunds.rows,
      rejected_refunds: rejected_refunds.rows,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}