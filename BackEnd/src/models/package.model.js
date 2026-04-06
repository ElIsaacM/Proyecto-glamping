// Se usa de esta manera porque package es una palabra reservada
export const packages = {
  getPackages: `
    SELECT
      * 
    FROM vista_paquetes
    WHERE estado = 'Activo'
    ORDER BY fecha DESC
  `,
  getPackageByName: `
    SELECT
      * 
    FROM vista_paquetes
    WHERE tipo ILIKE '%' || $1 || '%'
  `,
  // Un paquete debe incluir (servicios, productos, cabañas)
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
  `,
  activatePackage: `
    UPDATE paquetes SET
      estado = 'Activo'
    WHERE paqueteid = $1
    RETURNING nombre
  `,
};

export const packageFilters = {
  idle_packages: `
    SELECT 
      * 
    FROM vista_paquetes
    WHERE estado = 'Inactivo'
  `,
  type_packages_ASC: `
    SELECT 
      * 
    FROM vista_paquetes
    WHERE estado = 'Activo'
    ORDER BY tipo ASC
  `,
  type_packages_DESC: `
    SELECT 
      * 
    FROM vista_paquetes
    WHERE estado = 'Activo'
    ORDER BY tipo DESC
  `,
  longer_stay_packages: `
    SELECT 
      * 
    FROM vista_paquetes
    WHERE estado = 'Activo'
    ORDER BY dias DESC
  `,
  shorter_stay_packages: `
    SELECT 
      * 
    FROM vista_paquetes
    WHERE estado = 'Activo'
    ORDER BY dias ASC
  `,
};

export const packageStats = {
  most_frecuent_package: `
    SELECT 
      * 
    FROM vista_paquetes_stats 
    ORDER BY veces_reservado DESC
    LIMIT 1
  `,
  least_frecuent_package: `
    SELECT 
      * 
    FROM vista_paquetes_stats 
    ORDER BY veces_reservado ASC
    LIMIT 1
  `,
  top_packages: `
    SELECT 
      * 
    FROM vista_paquetes_stats 
    ORDER BY veces_reservado DESC
    LIMIT 3
  `,
};
