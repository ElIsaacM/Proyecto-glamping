import pool from '../config/db.js'
import { packages } from '../models/package.model.js'

export const getPackages = async (req, res) => {
  try {
    const result = await pool.query(packages.getPackages);

    if (result.rows.length === 0) {
      throw new Error("Package not found");
    }
    res.json(result.rows);

  } catch (error) {
    res.status(500).json({message: error.message})
  }
};

export const getPackageByName = async (req, res) => {
  try {
    const { name } = req.body;
    const result = await pool.query(packages.getPackageByName, [name.trim()]);

    if (result.rows.length === 0) {
      throw new Error("Package not found");
    }
    res.json(result.rows[0])
    
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

export const createPackage = async (req, res) => {
  try {
    const { tipoid, registradoporid, nombre, diasestadia, descripcion } = req.body;
    const result = await pool.query(packages.createPackage,
      [tipoid, registradoporid, nombre, diasestadia, descripcion]);
    
    res.status(200).json({
      message: 'Paquete creado',
      data: result.rows[0]
    })
  } catch (error) {
    res.status(500).json({
      message: 'Error al crear paquete',
      error: error.message
    });
  }
}

export const updatePackage = async (req, res) => {
  try {
    const { id } = req.params;
    const { tipoid, nombre, diasestadia, descripcion } = req.body;
    const result = await pool.query(packages.updatePackage,
      [tipoid, nombre, diasestadia, descripcion, id]);

    res.status(200).json({
      message: 'Paquete actualizado',
      paqueteId: id,
      data: result.rows[0]
    })
  } catch (error) {
    res.status(500).json({
      message: 'Error al actualizar paquete',
      error: error.message
    });
  }
}

export const deletePackage = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(packages.deletePackage, [id])

    res.status(200).json({
      message: 'Paquete eliminado',
      paqueteId: id,
      data: result.rows[0]
    })
  } catch (error) {
    res.status(500).json({
      message: 'Error al eliminar paquete',
      error: error.message
    });
  }
};
