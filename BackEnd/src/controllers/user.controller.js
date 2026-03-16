import pool from "../config/db.js";
import { user } from "../models/user.model.js";

export const getusers = async (req, res) => {
  try {
    const result = await pool.query(user.getUsers);

    if (result.rows.length === 0) {
      throw new Error("User not found!");
    }

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ 
      message: "Error al obtener usuarios",
      error: error.message });
  }
};

export const getuserById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(user.getUserById, [id]);

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
