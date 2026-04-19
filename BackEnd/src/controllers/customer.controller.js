import pool from '../config/db.js';
import { customer } from '../models/customer.model.js';

export const getCustomerData = async (req, res) => {
  try {
    const result = await pool.query(customer.getCustomerData);

    if (result.rows.length === 0) {
      throw new Error("No customers found");
    }

    res.json(result.rows)
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCustomerById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(customer.getCustomerById, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.json(result.rows[0]);
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
      tipo_identificacion,
      numero_identificacion,
      paisresidencia
    } = req.body;

    const result = await pool.query(customer.createCustomer, [
      nombre,
      email,
      contacto,
      tipo_identificacion,
      numero_identificacion,
      paisresidencia
    ]);

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
