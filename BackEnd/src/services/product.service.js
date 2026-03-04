<<<<<<< HEAD
import sql from '../config/db.js'

export const getProducts = async () => {
  const result = await sql.query(`
    SELECT * 
    FROM Productos
  `);

  if(!result.recordset.length) {
    throw new Error("Product not found!")
  }

  return result.recordset;
}

// Cambiar por name, se debe usar el req.body y hacer los cambios en el controller,
// se debe usar where like en la consulta
export const getProductById = async (id) => {

  const pool = await sql.connect()

  const result = await pool
    .request()
    .input("id", sql.Int, id)
    .query(`
      Select * 
      FROM Productos 
      WHERE ProductoID = @id
    `);

    return result.recordset[0]
}
=======
import pool from '../config/db.js';

export const getProducts = async () => {
  const result = await pool.query('SELECT * FROM Productos');

  if (result.rows.length === 0) {
    throw new Error("Product not found!");
  }

  return result.rows;
};

export const getProductById = async (id) => {
  const result = await pool.query(
    'SELECT * FROM Productos WHERE ProductoID = $1', 
    [id]
  );

  return result.rows[0];
};
>>>>>>> 7ccb4e3 (commit 2: conexion fetch en el front y conexion a postgres en el back)

export const createProduct = async () => {
  
}

export const updateProduct = async () => {
  
}

export const sellProduct = async () => {
  
}

export const deleteProduct = async () => {
  
}