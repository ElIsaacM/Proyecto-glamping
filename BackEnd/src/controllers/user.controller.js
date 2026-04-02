import pool from "../config/db.js";
import { user, userStats, userFilters as userFiltersModel } from "../models/user.model.js";

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
      email,
      contrasena,
    } = req.body;

    const result = await pool.query(user.createUser, [
      rolid,
      identificacionid,
      nombre,
      contacto,
      sueldo,
      numeroidentificacion,
      email,
      contrasena,
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
      email,
      contrasena,
    } = req.body;

    const result = await pool.query(user.updateUser, [
      rolid,
      identificacionid,
      nombre,
      contacto,
      sueldo,
      numeroidentificacion,
      email,
      contrasena,
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

    const result = await pool.query(
      user.deleteUser, 
      [id]
    );

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const activateUser = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      user.activateUser, 
      [id]
    );

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserStats = async (req, res) => {
  try {
    const result = await pool.query(userStats.getStats);

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const userFilters = async (req, res) => {
  try {
    const [payroll_desc, payroll_asc, idle_status, admin_users] = await Promise.all([
      pool.query(userFiltersModel.payroll_desc),
      pool.query(userFiltersModel.payroll_asc),
      pool.query(userFiltersModel.idle_status),
      pool.query(userFiltersModel.admin_users),
    ]);

    res.json({
      payroll_desc: payroll_desc.rows,
      payroll_asc: payroll_asc.rows,
      idle_status: idle_status.rows,
      admin_users: admin_users.rows,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
