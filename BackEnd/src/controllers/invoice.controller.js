import { invoice } from "../models/invoice.model.js";
import pool from "../config/db.js";

export const getInvoices = async (req, res) => {
  try {
    const result = await pool.query(invoice.getInvoices);

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};