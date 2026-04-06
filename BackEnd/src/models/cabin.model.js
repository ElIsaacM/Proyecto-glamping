export const cabin = {
  getCabins: `
    SELECT 
      cabanaid,
      nombre,
      precionoche,
      fecharegistro,
      descripcion,
      fechamantenimiento,
      estado
    FROM Cabanas
    WHERE estado <> 'inactivo'
    ORDER BY fecharegistro DESC
  `,
  getCabinByName: `
    SELECT 
      cabanaid,
      nombre,
      precionoche,
      fecharegistro,
      descripcion,
      fechamantenimiento,
      estado
    FROM Cabanas
    WHERE 
      estado <> 'inactivo'
      AND nombre ILIKE '%' || $1 || '%'
  `,
  createCabin: `
    INSERT INTO Cabanas (nombre, precionoche, fecharegistro, descripcion, fechamantenimiento, estado)
    VALUES ($1, $2, CURRENT_DATE, $3, 'null', 'Activo')
    RETURNING nombre, precionoche
  `,
  updateCabin: `
    UPDATE Cabanas SET
      nombre = COALESCE(NULLIF($1, ''), nombre),
      precionoche = COALESCE(NULLIF($2::text, '')::numeric, precionoche),
      fecharegistro = CURRENT_DATE,
      descripcion = COALESCE(NULLIF($3, ''), descripcion)
    WHERE cabanaid = $4
    RETURNING nombre, fecharegistro
  `,
  deleteCabin: `
    UPDATE Cabanas SET
      estado = 'Inactivo'
    WHERE cabanaid = $1
    RETURNING nombre
  `,
}

export const cabinFilters = {
  
}

export const cabinStats = {
  get_stats: `
    SELECT
      c.nombre AS "Cabaña",
      COUNT(DISTINCT r.reservaid) AS "Veces reservada",
      COALESCE(SUM(f.total), 0) AS "Ingresos generados"
    FROM cabanas c
    LEFT JOIN cabanaporpaquete cp ON c.cabanaid = cp.cabanaid
    LEFT JOIN paquetes p ON cp.paqueteid = p.paqueteid
    LEFT JOIN reservas r ON p.paqueteid = r.paqueteid
    LEFT JOIN facturas f ON r.reservaid = f.reservaid
    WHERE c.estado <> 'inactivo'
      AND r.estado <> 'Cancelada'
    GROUP BY c.cabanaid, c.nombre
    ORDER BY "Veces reservada" DESC
    LIMIT 1
  `,
  total_cabins: `
    SELECT
      COUNT(c.cabanaid) AS "Total de cabañas"
    FROM cabanas c
    WHERE c.estado <> 'inactivo'
  `,
  get_graph_revenue: `
    SELECT
      TO_CHAR(f.fechafactura, 'YYYY-MM-DD') AS fecha,
      SUM(f.total) AS total
    FROM facturas f
    JOIN reservas r ON f.reservaid = r.reservaid
    JOIN paquetes p ON r.paqueteid = p.paqueteid
    JOIN cabanaporpaquete cp ON p.paqueteid = cp.paqueteid
    JOIN cabanas c ON cp.cabanaid = c.cabanaid
    WHERE c.estado <> 'inactivo'
      AND r.estado <> 'Cancelada'
    GROUP BY TO_CHAR(f.fechafactura, 'YYYY-MM-DD')
    ORDER BY fecha ASC
    LIMIT 30
  `
}