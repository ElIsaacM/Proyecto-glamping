import pool from "../config/db.js";
import { notification } from "../models/notification.model.js";
import { product, productStats, productFilters as productFiltersModel } from "../models/product.model.js";

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
      descripcion,

      userName
    } = req.body;

    await pool.query("BEGIN");

    const result = await pool.query(
      product.createProduct,
      [nombre, tipo, precio, descripcion]
    )

    await pool.query(notification.createNotification, [
      userName,
      "Producto",
      `El producto ${nombre} ha sido creado`
    ]);

    await pool.query("COMMIT");

    res.status(200).json(result.rows[0]);
  } catch (error) {
    await pool.query("ROLLBACK");
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
      descripcion,

      userName
    } = req.body;

    await pool.query("BEGIN");

    const result = await pool.query(
      product.updateProduct,
      [nombre, tipo, precio, descripcion, id]
    )

    await pool.query(notification.createNotification, [
      userName,
      "Productos",
      `El producto #${id} - ${nombre} ha sido actualizado`
    ]);

    await pool.query("COMMIT");

    res.status(200).json({
      message: "Producto actualizado",
      productId: id,
      data: result.rows[0],
    });
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({
      message: "Error al actualizar producto",
      error: error.message,
    });
  }
};


export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const userName = req.body.userName;

    await pool.query("BEGIN");

    const result = await pool.query(
      product.deleteProduct,
      [id]
    )

    await pool.query(notification.createNotification, [
      userName,
      "Productos",
      `El producto #${id} ha sido eliminado`
    ]);

    await pool.query("COMMIT");

    res.status(200).json({
      message: "Producto eliminado",
      productoId: id,
      data: result.rows[0],
    });
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({
      message: "Error al eliminar producto",
      error: error.message,
    });
  }
};

export const activateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const userName = req.body.userName;

    await pool.query("BEGIN");

    const result = await pool.query(
      product.activateProduct,
      [id]
    );

    await pool.query(notification.createNotification, [
      userName,
      "Productos",
      `El producto #${id} ha sido activado`
    ]);

    await pool.query("COMMIT");

    res.json(result.rows[0]);
  } catch (error) {
    await pool.query("ROLLBACK");
    res.status(500).json({error: error.message})
  }
};

export const getProductStats = async (req, res) => {
  try {
    const [most_frecuent_product, least_frecuent_product, top_products] = await Promise.all([
      pool.query(productStats.most_frecuent_product),
      pool.query(productStats.least_frecuent_product),
      pool.query(productStats.top_products),
    ]);

    res.json({
      most_frecuent_product: most_frecuent_product.rows,
      least_frecuent_product: least_frecuent_product.rows,
      top_products: top_products.rows,
    })
  } catch (error) {
    res.status(500).json({error: error.message})
  }
};

export const productFilters =  async (req, res) => {
  try {
    const [idle_products, expensive_products, cheap_products] = await Promise.all([
      pool.query(productFiltersModel.idle_products),
      pool.query(productFiltersModel.expensive_products),
      pool.query(productFiltersModel.cheap_products),
    ]);

    res.json({
      idle_products: idle_products.rows,
      expensive_products: expensive_products.rows,
      cheap_products: cheap_products.rows,
    });
  } catch (error) {
    res.status(500).json({error: error.message})
  }
};