import pool from "../config/db.js";
import { product } from "../models/product.model.js";

export const getProducts = async (req, res) => {
  try {
    const result = await pool.query(product.getProducts);

    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener productos",
      error: error.message,
    });
  }
};

export const getProductByName = async (req, res) => {
  try {
    const { name } = req.body;

    const result = await pool.query(
      product.getProductByName,
      [name.trim()]
    );

    res.status(200).json(result.rows);
  } catch (error) {
    res.status(400).json({
      message: "Producto no encontrado",
      error: error.message
    })
  }
};

export const createProduct = async (req, res) => {
  try {
    const { 
      nombre, 
      tipo, 
      precio, 
      descripcion
    } = req.body;

    const result = await pool.query(
      product.createProduct,
      [nombre, tipo, precio, descripcion]
    )

    res.status(200).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({
      message: "Error al crear producto",
      error: error.message,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const { 
      nombre, 
      tipo, 
      precio, 
      descripcion 
    } = req.body;

    const result = await pool.query(
      product.updateProduct,
      [nombre, tipo, precio, descripcion, id]
    )

    res.status(200).json({
      message: "Producto actualizado",
      productId: id,
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar producto",
      error: error.message,
    });
  }
};


export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      product.deleteProduct,
      [id]
    )

    res.status(200).json({
      message: "Producto eliminado",
      productoId: id,
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar producto",
      error: error.message,
    });
  }
};
