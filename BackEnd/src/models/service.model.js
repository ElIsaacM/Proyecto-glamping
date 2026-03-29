export const service = {
  getServices: `
    SELECT 
      nombre,
      encargado,
      duracionminutos,
      precio,
      descripcion,
      fechaactualizacion
    FROM servicios
    WHERE estado = 'Activo'
    ORDER BY serviciosid DESC
    `,
  getServiceByName: `
    SELECT
      nombre,
      encargado,
      duracionminutos,
      precio,
      descripcion,
      fechaactualizacion
    FROM Servicios
    WHERE nombre ILIKE '%' || $1 || '%'
  `,
  createService: `
    INSERT INTO Servicios (nombre, encargado, duracionminutos, precio, descripcion, fechaactualizacion)
    VALUES ($1, $2, $3, $4, $5, CURRENT_DATE)
    RETURNING nombre, precio
  `,
  updateService: `
    UPDATE Servicios
    SET
      nombre = COALESCE(NULLIF($1, ''), nombre),
      encargado = COALESCE(NULLIF($2, ''), encargado),
      duracionminutos = COALESCE(NULLIF($3::text, '')::integer, duracionminutos),
      precio = COALESCE(NULLIF($4::text, '')::numeric, precio),
      descripcion = COALESCE(NULLIF($5, ''), descripcion),
      fechaactualizacion = CURRENT_DATE
    WHERE servicioid = $6
    RETURNING nombre, precio
  `,
  deleteService: `
    UPDATE Servicios
    SET estado = 'Inactivo'
    WHERE servicioid = $1
    RETURNING nombre
  `
}