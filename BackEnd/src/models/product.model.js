export const product = {
  getProducts: `
    SELECT 
      * 
    FROM vista_productos
    WHERE estado = 'Activo' 
    ORDER BY ID DESC
    `,
  getProductByName: `
    SELECT 
      * 
    FROM vista_productos
    WHERE producto ILIKE '%' || $1 || '%'
    `,
  // Nota: en la nueva DB ya no existe stock y ya el precioventa es precio
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
  activateProduct: `
    UPDATE Productos 
    SET estado = 'Activo' 
    WHERE productoid = $1 
    RETURNING nombre
    `,
};

export const productFilters = {
  idle_products: `
    SELECT 
      * 
    FROM vista_productos
    WHERE estado = 'Inactivo'
  `,
  expensive_products: `
    SELECT 
      * 
    FROM vista_productos
    WHERE estado = 'Activo'
    ORDER BY precio DESC
  `,
  cheap_products: `
    SELECT 
      * 
    FROM vista_productos
    WHERE estado = 'Activo'
    ORDER BY precio ASC
  `,
};

export const productStats = {
  most_frecuent_product: `
    SELECT 
      * 
    FROM vista_productos_stats 
    ORDER BY veces_reservado DESC
    LIMIT 1
  `,
  least_frecuent_product: `
    SELECT 
      * 
    FROM vista_productos_stats 
    ORDER BY veces_reservado ASC
    LIMIT 1
  `,
  top_products: `
    SELECT 
      * 
    FROM vista_productos_stats 
    ORDER BY veces_reservado DESC
    LIMIT 3
  `,
};
