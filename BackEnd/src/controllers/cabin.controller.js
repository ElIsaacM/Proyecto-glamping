import pool from '../config/db.js'
import { cabin } from '../models/cabin.model.js'

export const getCabins = async (req, res) => {
  try {
    const result = await pool.query(cabin.getCabins);

    if (result.rows.length === 0) {
      throw new Error("Cabin not found");
    }
    res.json(result.rows);

  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

export const getCabinByName = async (req, res) => {
  try {
    const { name } = req.body;
    const result = await pool.query(
      cabin.getCabinByName,
      [name.trim()]
    );

    if (result.rows.length === 0) {
      throw new Error("Cabin not found");
    }

    res.json(result.rows[0])

  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

export const createCabin = async (req, res) => {
  try {
    const { nombre, precionoche, descripcion } = req.body;
    const result = await pool.query(
      cabin.createCabin,
      [nombre, precionoche, descripcion]
    );

    res.status(200).json({
      message: "Cabaña creada",
      data: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al crear cabaña",
      error: error.message
    });
  }
};

export const updateCabin = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, precionoche, descripcion } = req.body;
    const result = await pool.query(
      cabin.updateCabin,
      [nombre, precionoche, descripcion, id]
    );

    res.status(200).json({
      message: "Cabaña actualizada",
      cabanaId: id,
      data: result.rows[0]
    });

  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar cabaña",
      error: error.message
    });
  }
};

export const deleteCabin = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      cabin.deleteCabin,
      [id]
    );

    res.status(200).json({
      message: "Cabaña eliminada",
      cabanaId: id,
      data: result.rows[0]
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar cabaña",
      error: error.message
    });
  }
};