export const user = {
  getUsers: `
    SELECT 
      *
    FROM usuarios
    WHERE estado = 'Activo' 
    ORDER BY usuarioid DESC
  `,
  getUserById: `
    SELECT 
      *
    FROM usuarios
    WHERE usuarioid = $1
  `,
  createUser: `
    INSERT INTO usuarios (rolid, identificacionid, nombre, contacto, sueldo, numeroidentificacion)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING nombre, rolid
  `,
  updateUser: `
    UPDATE Usuarios SET
      rolid = COALESCE(NULLIF($1::text, '')::integer, rolid),
      identificacionid = COALESCE(NULLIF($2::text, '')::integer, identificacionid),
      nombre = COALESCE(NULLIF($3, ''), nombre),
      contacto = COALESCE(NULLIF($4, ''), contacto),
      sueldo = COALESCE(NULLIF($5::text, '')::numeric, sueldo),
      numeroidentificacion = COALESCE(NULLIF($6, ''), numeroidentificacion)
    WHERE usuarioid = $7
    RETURNING nombre, rolid
  `,
  deleteUser: `
    UPDATE Usuarios 
    SET estado = 'Inactivo' 
    WHERE usuarioid = $1 
    RETURNING nombre, rolid
  `,
};
