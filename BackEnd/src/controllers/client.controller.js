import pool from "../config/db.js";
import { customer } from '../models/customer.model.js'

export const getCustomerData = async (req, res) => {
  try {
    const result = await pool.query(customer.getCustomerData);

    if (result.rows.length === 0) {
      throw new Error("Customer not found");
    }

    res.json(result.rows)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createCustomer = async (req, res) => {
  try {
    const {
      nombre,
      email,
      contacto,
      identificacion,
      paisresidencia
    } = req.body;

    const result = await pool.query(customer.createCustomer, [
      nombre,
      email,
      contacto,
      identificacion,
      paisresidencia
    ]);

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
