import pool from '../config/db.js';

export const getProducts = async () => {
  const result = await pool.query(`
    SELECT 
      productoid,
      nombre, 
      tipo, 
      stock, 
      precioventa, 
      descripcion, 
      fechaactualizacion
    FROM Productos 
    WHERE estado = 'Activo' 
    ORDER BY productoid DESC
  `);

  if (result.rows.length === 0) {
    throw new Error("Product not found!");
  }

  return result.rows;
};

export const getProductById = async (id) => {
  const result = await pool.query(
    `SELECT 
      productoid,
      nombre, 
      tipo, 
      stock, 
      precioventa, 
      descripcion, 
      fechaactualizacion 
    FROM Productos 
    WHERE productoid = $1`,
    [id]
  );

  return result.rows[0];
};

export const createProduct = async (productData) => {
  const { nombre, tipo, stock, precioventa, descripcion } = productData;
  const result = await pool.query(
    `INSERT INTO Productos (nombre, tipo, stock, precioventa, descripcion) 
    VALUES ($1, $2, $3, $4, $5) 
    RETURNING nombre, stock`,
    [nombre, tipo, stock, precioventa, descripcion]
  );
  return result.rows[0];
};

export const updateProduct = async (id, productData) => {
  const { nombre, tipo, stock, precioventa, descripcion } = productData;
  const result = await pool.query(
    `UPDATE Productos SET 
      nombre = COALESCE(NULLIF($1, ''), nombre), 
      tipo = COALESCE(NULLIF($2, ''), tipo), 
      stock = COALESCE(NULLIF($3::text, '')::integer, stock), 
      precioventa = COALESCE(NULLIF($4::text, '')::numeric, precioventa), 
      descripcion = COALESCE(NULLIF($5, ''), descripcion), 
      fechaactualizacion = CURRENT_DATE 
    WHERE productoid = $6
    RETURNING *`,
    [nombre, tipo, stock, precioventa, descripcion, id]
  );
  if (result.rows.length === 0) {
    throw new Error("Product not found!");
  }
  return result.rows[0];
}

export const sellProduct = async (id, quantity) => {
  const result = await pool.query(
    `UPDATE Productos SET stock = stock - $1
    WHERE productoid = $2 AND stock >= $1
    RETURNING productoid, stock`,
    [quantity, id]
  );
  if (result.rows.length === 0) {
    throw new Error("Product not found or not enough stock!");
  }
  return result.rows[0];
}

export const deleteProduct = async (id) => {
  const result = await pool.query(
    `UPDATE Productos SET estado = 'Inactivo' WHERE productoid = $1 RETURNING nombre`,
    [id]
  );
  if (result.rows.length === 0) {
    throw new Error("Product not found!");
  }
  return result.rows[0];
}