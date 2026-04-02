export const cabin = {
  getCabins: `
    SELECT 
      nombre,
      precionoche,
      fecharegistro,
      descripcion,
      fechamantenimiento,
      estado
    FROM Cabanas
    WHERE estado <> 'inactivo'
    ORDER BY fechamantenimiento DESC
  `,
  getCabinByName: `
    SELECT 
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
    VALUES ($1, $2, CURRENT_DATE, $3, null, 'Activo')
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