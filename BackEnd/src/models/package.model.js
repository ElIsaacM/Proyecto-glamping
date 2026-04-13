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
    WHERE nombre ILIKE '%' || $1 || '%'
  `,
  // Un paquete debe incluir (servicios, productos, cabañas)
  createPackage: `
    INSERT INTO paquetes (tipo_id, registrado_por_id, nombre, dias_estadia, fecha_registro, descripcion, estado)
    VALUES ($1, $2, $3, $4, CURRENT_DATE, $5, 'Activo')
    RETURNING nombre, fecha_registro
  `,
  updatePackage: `
    UPDATE paquetes SET
      tipo_id = COALESCE(NULLIF($1::text, '')::integer, tipo_id),
      nombre = COALESCE(NULLIF($2, ''), nombre),
      dias_estadia = COALESCE(NULLIF($3::text, '')::integer, dias_estadia),
      descripcion = COALESCE(NULLIF($4, ''), descripcion),
      fecha_registro = CURRENT_DATE
    WHERE paquete_id = $5
    RETURNING nombre, fecha_registro
  `,
  deletePackage: `
    UPDATE paquetes SET
      estado = 'Inactivo'
    WHERE paquete_id = $1
    RETURNING nombre
  `
}

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
    -- AND tipo_id <> 11 -- Ajustar con la id de personalizado (1)
    ORDER BY tipo_id ASC
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
  `
}

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
  `
}