import pool from "../config/db.js";
import { notification } from "../models/notification.model.js";
import { user, userStats, userFilters as userFiltersModel } from "../models/user.model.js";

export const getusers = async (req, res) => {
  try {
    const result = await pool.query(user.getUsers);

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
      rol_id,
      tipo_identificacion,
      numero_identificacion,
      nombre,
      contacto,
      sueldo,

      userName,
    } = req.body;

    await pool.query("BEGIN");

    const result = await pool.query(user.createUser, [
      rol_id,
      tipo_identificacion,
      numero_identificacion,
      nombre,
      contacto,
      sueldo,
    ]);

    await pool.query(notification.createNotification, [
      userName,
      "Usuario creado",
      `El usuario ${nombre} ha sido creado con rol ${rol_id}`,
    ]);

    await pool.query("COMMIT");

    res.status(201).json(result.rows[0]);
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      rol_id,
      tipo_identificacion,
      numero_identificacion,
      nombre,
      contacto,
      sueldo,

      userName,
    } = req.body;

    await pool.query("BEGIN");

    const result = await pool.query(user.updateUser, [
      rol_id,
      tipo_identificacion,
      numero_identificacion,
      nombre,
      contacto,
      sueldo,
      id,
    ]);

    await pool.query(notification.createNotification, [
      userName,
      "Usuario actualizado",
      `El usuario #${id} - ${nombre} ha sido actualizado rol ${rol_id}`,
    ]);

    await pool.query("COMMIT");

    res.status(201).json(result.rows[0]);
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query("BEGIN");

    const userCheck = await pool.query(user.getUserById, [id]);

    if (userCheck.rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const result = await pool.query(
      user.deleteUser, 
      [id]
    );

    await pool.query(notification.createNotification, [
      "Sistema",
      "Usuario eliminado",
      `El usuario ${userCheck.rows[0].nombre} ha sido eliminado`,
    ]);

    await pool.query("COMMIT");

    res.json(result.rows[0]);
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({ message: error.message });
  }
};

export const activateUser = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query("BEGIN");

    const userCheck = await pool.query(user.getUserById, [id]);

    if (userCheck.rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const result = await pool.query(
      user.activateUser, 
      [id]
    );

    await pool.query(notification.createNotification, [
      "Sistema",
      "Usuario activado",
      `El usuario ${userCheck.rows[0].nombre} ha sido activado`,
    ]);

    await pool.query("COMMIT");

    res.json(result.rows[0]);
  } catch (error) {
    await pool.query("ROLLBACK");
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
