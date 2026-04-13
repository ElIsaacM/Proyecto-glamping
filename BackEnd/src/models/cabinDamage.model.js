const cabinDamage = {
  getCabinsDamage: `
    SELECT
      cabana_id,
      descripcion,
      estado,
      fecha_registro,
      fecha_arreglo,
      responsable
    FROM DanosMantenimientos
    ORDER BY fecha_registro DESC
  `,
  getCabinDamageByName: `
    SELECT
      c.nombre,
      dm.descripcion,
      dm.estado,
      dm.fecha_registro,
      dm.fecha_arreglo,
      dm.responsable
    FROM DanosMantenimientos dm
    JOIN Cabanas c ON dm.cabana_id = c.cabana_id
    WHERE c.nombre ILIKE '%' || $1 || '%'
  `,
  createCabinDamage: `
    WITH insert_dano AS (
      INSERT INTO DanosMantenimientos (cabana_id, descripcion, estado, fecha_registro, fecha_arreglo, responsable)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING cabana_id AS cabin_name, fecha_arreglo;
    ),
    update_cabana AS (
      UPDATE Cabanas
      SET estado = $3, fecha_arreglo = $5
      WHERE cabana_id = $1
      RETURNING nombre;
    )
    SELECT 
      u.nombre AS cabin_name, 
      i.fecha_arreglo
    FROM update_cabana u, insert_dano i;
  `,
  updateCabinDamage: `
    UPDATE DanosMantenimientos SET
      descripcion = COALESCE(NULLIF($1, ''), descripcion),
      estado = COALESCE(NULLIF($2, ''), estado),
      fecha_registro = CURRENT_DATE,
      fecha_arreglo = COALESCE(NULLIF($3::text, ''), fecha_arreglo),
      responsable = COALESCE(NULLIF($4, ''), responsable)
    WHERE cabana_id = $5
    RETURNING (SELECT nombre FROM Cabanas WHERE cabana_id = $5) AS cabin_name, fecha_arreglo;
  `
}