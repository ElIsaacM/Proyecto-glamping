export const product = {
  getProducts: `
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
    `,
  getProductByName: `
    SELECT 
      productoid,
      nombre, 
      tipo, 
      stock, 
      precioventa, 
      descripcion, 
      fechaactualizacion 
    FROM Productos 
    WHERE nombre ILIKE '%' || $1 || '%'
    `,
  createProduct: `
    INSERT INTO Productos (nombre, tipo, stock, precioventa, descripcion, fechaactualizacion) 
    VALUES ($1, $2, $3, $4, $5, CURRENT_DATE) 
    RETURNING nombre, stock
    `,
  updateProduct: `
    UPDATE Productos SET 
      nombre = COALESCE(NULLIF($1, ''), nombre), 
      tipo = COALESCE(NULLIF($2, ''), tipo), 
      stock = COALESCE(NULLIF($3::text, '')::integer, stock), 
      precioventa = COALESCE(NULLIF($4::text, '')::numeric, precioventa), 
      descripcion = COALESCE(NULLIF($5, ''), descripcion), 
      fechaactualizacion = CURRENT_DATE 
    WHERE productoid = $6
    RETURNING *
    `,
  sellProduct: `
    UPDATE Productos 
    SET stock = stock - $1
    WHERE productoid = $2 AND stock >= $1
    RETURNING productoid, stock
    `,
  deleteProduct: `
    UPDATE Productos 
    SET estado = 'Inactivo' 
    WHERE productoid = $1 
    RETURNING nombre
    `,
};
