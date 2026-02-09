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

export const createProduct = async () => {
  
}

export const updateProduct = async () => {
  
}

export const sellProduct = async () => {
  
}

export const deleteProduct = async () => {
  
}