import pool from "../config/db.js";
import { service } from "../models/service.model.js";

export const getservices = async (req, res) => {
  try {
    const data = await pool.query(service.getServices);
    res.json(data.rows);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

export const getserviceByName = async (req, res) => {
  try {
    const { name } = req.body;

    const data = await pool.query(service.getServiceByName, [name]);

    if (!data) return res.status(404).json({ message: 'Not found' });
    res.json(data.rows);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

export const createService = async (req, res) => {
  try {
    const { nombre, encargado, duracionminutos, precio, descripcion } = req.body;
    const result = await pool.query(service.createService, 
      [nombre, encargado, duracionminutos, precio, descripcion]);
    
    res.status(200).json({
      message: "Servicio creado",
      data: result.rows[0]
    });

  } catch (error) {
    res.status(500).json({
      message: "Error al crear servicio",
      error: error.message
    });
  }
};

export const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, encargado, duracionminutos, precio, descripcion } = req.body;
    const result = await pool.query(service.updateService, 
      [nombre, encargado, duracionminutos, precio, descripcion, id]);

    res.status(200).json({
      message: "Servicio actualizado",
      servicioId: id,
      data: result.rows[0]
    })
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar servicio",
      error: error.message
    });
  }
};

export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(service.deleteService, [id]);
    
    res.status(200).json({
      message: "Servicio eliminado",
      servicioId: id,
      data: result.rows[0]
    });
  } catch (error) {
    res.status(500),json({
      message: "Error al eliminar servicio",
      error: error.message
    });
  }
};
