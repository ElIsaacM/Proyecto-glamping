import pool from "../config/db.js";
import { product } from "../models/product.model.js";

export const getProducts = async (req, res) => {
  try {
    const result = await pool.query(product.getProducts);

    if (result.rows.length === 0) {
      throw new Error("Product not found!");
    }

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
      stock, 
      precioventa, 
      descripcion
    } = req.body;

    const result = await pool.query(
      product.createProduct,
      [nombre, tipo, stock, precioventa, descripcion]
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
      stock, 
      precioventa, 
      descripcion 
    } = req.body;

    const result = await pool.query(
      product.updateProduct,
      [nombre, tipo, stock, precioventa, descripcion, id]
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

export const sellProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;

    const result = await pool.query(
      product.sellProduct,
      [quantity, id]
    );

    res.status(200).json({
      message: "producto vendido",
      productoId: id,
      stock: result.rows[0].stock,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al vender producto",
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
