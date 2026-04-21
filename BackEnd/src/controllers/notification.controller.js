import pool from '../config/db.js';
import { notification } from '../models/notification.model.js';

export const getNotifications = async (req, res) => {
  try {
    const result = await pool.query(notification.getNotifications);
    res.json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error al obtener las notificaciones' });
  }
};

export const getLastNotifications = async (req, res) => {
  try {
    const result = await pool.query(notification.getLastNotifications);
    res.json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error al obtener las últimas notificaciones' });
  }
};

// Opciones reservadas para el administrador, se define en el front-end la lógica de quien elimina
export const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.query(notification.deleteNotification, [id]);
    
    res.json({ message: 'Notificación eliminada correctamente' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error al eliminar la notificación' });
  }
};

export const deleteAllNotifications = async (req, res) => {
  try {
    const userName = req.body.userName;

    await pool.query(notification.deleteAllNotifications);
    await pool.query(notification.createNotification, [userName, "Notificaciones eliminadas", `Todas las notificaciones han sido eliminadas por ${userName}`]);

    res.json({ message: 'Notificaciones eliminadas correctamente' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error al eliminar las notificaciones' });
  }
};

