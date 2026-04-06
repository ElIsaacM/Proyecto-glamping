export const service = {
  getServices: `
    SELECT 
      *
    FROM vista_servicios
    WHERE estado = 'Activo'
    ORDER BY id DESC
    `,
  getServiceByName: `
    SELECT
      *
    FROM vista_servicios
    WHERE servicio ILIKE '%' || $1 || '%'
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
  `,
  activateService: `
    UPDATE Servicios
    SET estado = 'Activo'
    WHERE servicioid = $1
    RETURNING nombre
  `
}

export const serviceFilters = {
  idle_services: `
    SELECT 
      * 
    FROM vista_servicios
    WHERE estado = 'Inactivo'
  `,
  longer_services: `
    SELECT 
      * 
    FROM vista_servicios
    WHERE estado = 'Activo'
    ORDER BY "Duracion en minutos" DESC
  `,
  shorter_services: `
    SELECT 
      * 
    FROM vista_servicios
    WHERE estado = 'Activo'
    ORDER BY "Duracion en minutos" ASC
  `,
  expensive_services: `
    SELECT 
      * 
    FROM vista_servicios
    WHERE estado = 'Activo'
    ORDER BY precio DESC
  `,
  cheap_services: `
    SELECT 
      * 
    FROM vista_servicios
    WHERE estado = 'Activo'
    ORDER BY precio ASC
  `
}

export const serviceStats = {
  most_frecuent_service: `
    SELECT 
      * 
    FROM vista_servicios_stats 
    ORDER BY veces_reservado DESC
    LIMIT 1
  `,
  least_frecuent_service: `
    SELECT 
      * 
    FROM vista_servicios_stats 
    ORDER BY veces_reservado ASC
    LIMIT 1
  `,
  top_services: `
    SELECT 
      * 
    FROM vista_servicios_stats 
    ORDER BY veces_reservado DESC
    LIMIT 3
  `
}