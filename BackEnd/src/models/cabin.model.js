export const cabin = {
  getCabins: `
    SELECT 
      *
    FROM vista_cabanas
    WHERE estado <> 'inactivo'
    ORDER BY actualizacion DESC
  `,
  getCabinByName: `
    SELECT 
      *
    FROM vista_cabanas
    WHERE 
      estado <> 'inactivo'
      AND nombre ILIKE '%' || $1 || '%'
  `,
  createCabin: `
    INSERT INTO Cabanas (nombre, precio_noche, fecha_registro, descripcion, fecha_mantenimiento, estado)
    VALUES ($1, $2, CURRENT_DATE, $3, NULL, 'Activo')
    RETURNING nombre, precio_noche
  `,
  updateCabin: `
    UPDATE Cabanas SET
      nombre = COALESCE(NULLIF($1, ''), nombre),
      precio_noche = COALESCE(NULLIF($2::text, '')::numeric, precio_noche),
      fecha_registro = CURRENT_DATE,
      descripcion = COALESCE(NULLIF($3, ''), descripcion)
    WHERE cabana_id = $4
    RETURNING nombre, fecha_registro
  `,
  deleteCabin: `
    UPDATE Cabanas SET
      estado = 'Inactivo'
    WHERE cabana_id = $1
    RETURNING nombre
  `,
}

export const cabinStats = {
  get_stats: `
    SELECT
        c.nombre AS "Cabaña",
        COUNT(DISTINCT r.reserva_id) AS "Veces reservada",
        COALESCE(SUM(pg.total_pagado), 0) AS "Ingresos generados"  
    FROM cabanas c  
    LEFT JOIN paquetes p ON c.cabana_id = p.cabana_id
    LEFT JOIN reservas r ON p.paquete_id = r.paquete_id AND r.estado <> 'Cancelada'
    LEFT JOIN facturas f ON r.reserva_id = f.reserva_id
    LEFT JOIN pagos pg ON f.factura_id = pg.factura_id AND pg.estado IN ('Completado', 'Agregado Manual')
    WHERE c.estado <> 'inactivo'
    GROUP BY c.cabana_id, c.nombre
    ORDER BY "Veces reservada" DESC
    LIMIT 1
  `,
  total_cabins: `
    SELECT
      COUNT(c.cabana_id) AS "Total de cabañas"
    FROM cabanas c
    WHERE c.estado <> 'inactivo'
  `,
  get_graph_revenue: `
    SELECT
      c.nombre AS cabana,
      COALESCE(SUM(pg.total_pagado), 0) AS total
    FROM cabanas c
    LEFT JOIN paquetes p ON c.cabana_id = p.cabana_id
    LEFT JOIN reservas r ON p.paquete_id = r.paquete_id AND r.estado <> 'Cancelada'
    LEFT JOIN facturas f ON r.reserva_id = f.reserva_id
    LEFT JOIN pagos pg ON f.factura_id = pg.factura_id AND pg.estado IN ('Completado', 'Agregado Manual')
    WHERE c.estado <> 'inactivo'
    GROUP BY c.cabana_id, c.nombre
    ORDER BY total DESC;
  `
}