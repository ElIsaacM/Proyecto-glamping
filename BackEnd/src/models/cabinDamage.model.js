const cabinDamage = {
  getCabinsDamage: `
    SELECT
      cabanaid,
      descripcion,
      estado,
      fecharegistro,
      fechaarreglo,
      responsable
    FROM DanosMantenimientos
    ORDER BY fecharegistro DESC
  `,
  getCabinDamageByName: `
    SELECT
      c.nombre,
      dm.descripcion,
      dm.estado,
      dm.fecharegistro,
      dm.fechaarreglo,
      dm.responsable
    FROM DanosMantenimientos dm
    JOIN Cabanas c ON dm.cabanaid = c.cabanaid
    WHERE c.nombre ILIKE '%' || $1 || '%'
  `,
  createCabinDamage: `
    WITH insert_dano AS (
      INSERT INTO DanosMantenimientos (cabanaid, descripcion, estado, fechaRegistro, fechaarreglo, responsable)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING cabanaid AS cabin_name, fechaarreglo;
    ),
    update_cabana AS (
      UPDATE Cabanas
      SET estado = $3, fechaarreglo = $5
      WHERE cabanaid = $1
      RETURNING nombre;
    )
    SELECT 
      u.nombre AS cabin_name, 
      i.fechaarreglo
    FROM update_cabana u, insert_dano i;
  `,
  updateCabinDamage: `
    UPDATE DanosMantenimientos SET
      descripcion = COALESCE(NULLIF($1, ''), descripcion),
      estado = COALESCE(NULLIF($2, ''), estado),
      fechaRegistro = CURRENT_DATE,
      fechaarreglo = COALESCE(NULLIF($3::text, ''), fechaarreglo),
      responsable = COALESCE(NULLIF($4, ''), responsable)
    WHERE cabanaid = $5
    RETURNING (SELECT nombre FROM Cabanas WHERE cabanaid = $5) AS cabin_name, fechaarreglo;
  `
}