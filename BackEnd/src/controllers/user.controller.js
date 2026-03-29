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

export const getuserByName = async (req, res) => {
  try {
    const { name } = req.body;

    const result = await pool.query(user.getUserByName, [name.trim()]);

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const {
      rolid,
      identificacionid,
      nombre,
      contacto,
      sueldo,
      numeroidentificacion,
    } = req.body;

    const result = await pool.query(user.createUser, [
      rolid,
      identificacionid,
      nombre,
      contacto,
      sueldo,
      numeroidentificacion,
    ]);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      rolid,
      identificacionid,
      nombre,
      contacto,
      sueldo,
      numeroidentificacion,
    } = req.body;

    const result = await pool.query(user.updateUser, [
      rolid,
      identificacionid,
      nombre,
      contacto,
      sueldo,
      numeroidentificacion,
      id,
    ]);

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(user.deleteUser, [id]);

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
