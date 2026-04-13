import pool from '../config/db.js'
import { packages } from '../models/package.model.js'

export const getPackages = async (req, res) => {
  try {
    const result = await pool.query(packages.getPackages);

    res.json(result.rows);

  } catch (error) {
    res.status(500).json({message: error.message})
  }
};

export const getPackageByName = async (req, res) => {
  try {
    const { name } = req.body;
    const result = await pool.query(
      packages.getPackageByName, 
      [name.trim()]
    );

    res.json(result.rows);
    
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

export const createPackage = async (req, res) => {
  try {
    const { tipo_id, registrado_por_id, nombre, dias_estadia, descripcion } = req.body;
    const result = await pool.query(packages.createPackage,
      [tipo_id, registrado_por_id, nombre, dias_estadia, descripcion]
    );
    
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

    const { 
      tipo_id, 
      nombre, 
      dias_estadia, 
      descripcion 
    } = req.body;
    
    const result = await pool.query(
      packages.updatePackage,
      [tipo_id, nombre, dias_estadia, descripcion, id]
    );

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
    const result = await pool.query(
      packages.deletePackage, 
      [id]
    );

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
