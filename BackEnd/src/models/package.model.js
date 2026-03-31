// Se usa de esta manera porque package es una palabra reservada
export const packages = {
  getPackages: `
    SELECT
      tipoid,
      registradoporid,
      nombre,
      diasestadia,
      fecharegistro,
      descripcion
    FROM paquetes
    WHERE estado = 'Activo'
    ORDER BY fecharegistro DESC
  `,
  getPackageByName: `
    SELECT
      tp.nombre AS tipo,
      u.nombre AS registradoPor,
      p.nombre,
      p.diasestadia,
      p.fecharegistro,
      p.descripcion
    FROM paquetes p
    JOIN tipopaquete tp ON p.tipoid = tp.tipoid
    JOIN usuarios u ON p.registradoporid = u.usuarioid
    WHERE p.nombre ILIKE '%' || $1 || '%'
  `,
  createPackage: `
    INSERT INTO paquetes (tipoid, registradoporid, nombre, diasestadia, fecharegistro, descripcion, estado)
    VALUES ($1, $2, $3, $4, CURRENT_DATE, $5, 'Activo')
    RETURNING nombre, fecharegistro
  `,
  updatePackage: `
    UPDATE paquetes SET
      tipoid = COALESCE(NULLIF($1::text, '')::integer, tipoid),
      nombre = COALESCE(NULLIF($2, ''), nombre),
      diasestadia = COALESCE(NULLIF($3::text, '')::integer, diasestadia),
      descripcion = COALESCE(NULLIF($4, ''), descripcion),
      fecharegistro = CURRENT_DATE
    WHERE paqueteid = $5
    RETURNING nombre, fecharegistro
  `,
  deletePackage: `
    UPDATE paquetes SET
      estado = 'Inactivo'
    WHERE paqueteid = $1
    RETURNING nombre
  `
}