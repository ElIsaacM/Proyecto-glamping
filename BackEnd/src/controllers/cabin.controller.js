import { cabin, cabinStats } from "../models/cabin.model.js";
import pool from "../config/db.js";

export const getCabins = async (req, res) => {
  try {
    const cabins = await pool.query(cabin.getCabins);
    res.json(cabins.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const getCabinByName = async (req, res) => {
  try {
    const { name } = req.body;

    const result = await pool.query(
      cabin.getCabinByName,
      [name]
    );

    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const createCabin = async (req, res) => {
  try {
    const { nombre, precio_noche, descripcion } = req.body;

    const newCabin = await pool.query(
      cabin.createCabin, 
      [nombre, precio_noche, descripcion]
    );

    res.json(newCabin.rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const updateCabin = async (req, res) => {
  try {
    const { nombre, precio_noche, descripcion } = req.body;

    const updatedCabin = await pool.query(
      cabin.updateCabin,
      [nombre, precio_noche, descripcion, req.params.id]
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

export const activateCabin = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      cabin.activateCabin,
      [id]
    );

    res.json(result.rows[0]);
  } catch (error) {
    res.stats(500).json({error: error.message})
  }
};

export const getCabinStats = async (req, res) => {
  try {
    const [stats, total, graph] = await Promise.all([
      pool.query(cabinStats.get_stats),
      pool.query(cabinStats.total_cabins),
      pool.query(cabinStats.get_graph_revenue),
    ]);

    res.json({
      most_reserved: stats.rows[0] || null,
      total_cabins: total.rows[0] || null,
      revenue_graph: graph.rows,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};