import pool from "../config/db.js";
import { service } from "../models/service.model.js";

export const getservices = async (req, res) => {
  try {
    const data = await pool.query(service.getServices);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getserviceByName = async (req, res) => {
  try {
    const { name } = req.body;

    const data = await pool.query(service.getServiceByName, [name.trim()]);

    if (!data) return res.status(404).json({ message: 'Not found' });
    res.json(data.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
