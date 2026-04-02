import { cabin } from "../models/cabin.model.js";
import pool from "../config/db.js";

export const getCabins = async (req, res) => {
  try {
    const cabins = await pool.query(cabin.getCabins);
    res.json(cabins.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const createCabin = async (req, res) => {
  try {
    const { nombre, precionoche, descripcion } = req.body;

    const newCabin = await pool.query(
      cabin.createCabin, 
      [nombre, precionoche, descripcion]
    );

    res.json(newCabin.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const updateCabin = async (req, res) => {
  try {
    const { nombre, precionoche, descripcion } = req.body;

    const updatedCabin = await pool.query(
      cabin.updateCabin,
      [nombre, precionoche, descripcion, req.params.id]
    );

    res.json(updatedCabin.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const deleteCabin = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCabin = await pool.query(
      cabin.deleteCabin,
      [id]
    );

    res.json(deletedCabin.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
