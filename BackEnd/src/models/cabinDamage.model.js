export const cabinDamage = {
  getCabinsDamage: `
    SELECT
      *
    FROM vista_danos_mantenimientos
    ORDER BY registro DESC
  `,
  getCabinDamageByName: `
    SELECT
      *
    FROM vista_danos_mantenimientos
    WHERE cabana ILIKE '%' || $1 || '%'
  `,
  createCabinDamage: `
    INSERT INTO DanosMantenimientos (cabana_id, descripcion, estado, fecha_registro, fecha_arreglo, responsable)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING cabana_id AS cabin_name, fecha_arreglo
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