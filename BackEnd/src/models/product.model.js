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
    INSERT INTO Productos (nombre, tipo, precio, descripcion, fecha_actualizacion, img_url) 
    VALUES ($1, $2, $3, $4, CURRENT_DATE, 'default.png') 
    RETURNING nombre
    `,
  updateProduct: `
    UPDATE Productos SET 
      nombre = COALESCE(NULLIF($1, ''), nombre), 
      tipo = COALESCE(NULLIF($2, ''), tipo), 
      precio = COALESCE(NULLIF($3::text, '')::numeric, precio), 
      descripcion = COALESCE(NULLIF($4, ''), descripcion), 
      fecha_actualizacion = CURRENT_DATE 
    WHERE producto_id = $5
    RETURNING *
    `,
  deleteProduct: `
    UPDATE Productos 
    SET estado = 'Inactivo' 
    WHERE producto_id = $1 
    RETURNING nombre
    `,
  activateProduct: `
    UPDATE Productos 
    SET estado = 'Activo' 
    WHERE producto_id = $1 
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
  `
}

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
  `
}
