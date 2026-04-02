export const user = {
  getUsers: `
    SELECT 
      *
    FROM usuarios
    WHERE estado = 'Activo' 
    ORDER BY usuarioid DESC
  `,
  getUserByName: `
    SELECT 
      *
    FROM usuarios
    WHERE nombre ILIKE '%' || $1 || '%'
  `,
  createUser: `
    WITH insert_user AS (
      INSERT INTO usuarios (rolid, identificacionid, nombre, contacto, sueldo, numeroidentificacion)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING usuarioid, nombre, rolid
    ),
    insert_login AS (
      INSERT INTO login (usuarioid, email, contrasena)
      SELECT usuarioid, $7, $8 FROM insert_user
      RETURNING email
    )
    SELECT 
      u.nombre, 
      u.rolid, 
      l.email
    FROM insert_user u
    CROSS JOIN insert_login l;
  `,
  updateUser: `
    WITH update_login AS (
      UPDATE login SET
        password = COALESCE(NULLIF($7, ''), password)
      WHERE usuarioid = $8
      RETURNING usuarioid -- Retornamos algo para confirmar que se ejecutó
    ),
    update_usuarios AS (
      UPDATE Usuarios SET
        rolid = COALESCE(NULLIF($1::text, '')::integer, rolid),
        identificacionid = COALESCE(NULLIF($2::text, '')::integer, identificacionid),
        nombre = COALESCE(NULLIF($3, ''), nombre),
        contacto = COALESCE(NULLIF($4, ''), contacto),
        sueldo = COALESCE(NULLIF($5::text, '')::numeric, sueldo),
        numeroidentificacion = COALESCE(NULLIF($6, ''), numeroidentificacion)
      WHERE usuarioid = $8
      RETURNING nombre, rolid
    )
    SELECT nombre, rolid FROM update_usuarios; 
  `,
  deleteUser: `
    UPDATE Usuarios 
    SET estado = 'Inactivo' 
    WHERE usuarioid = $1 
    RETURNING nombre, rolid
  `,
  activateUser: `
    UPDATE Usuarios 
    SET estado = 'Activo' 
    WHERE usuarioid = $1 
    RETURNING nombre, rolid
  `,
};

export const userFilters = { 
  payroll_desc: `
    SELECT 
      * 
    FROM usuarios
    WHERE estado = 'Activo'
    ORDER BY sueldo DESC
  `,
  payroll_asc: `
    SELECT 
      * 
    FROM usuarios
    WHERE estado = 'Activo'
    ORDER BY sueldo ASC
  `,
  idle_status: `
    SELECT 
      * 
    FROM usuarios
    WHERE estado = 'Inactivo'
  `,
  admin_users: `
    SELECT 
      * 
    FROM usuarios u
    JOIN roles r ON u.rolid = r.rolid
    WHERE r.nombre = 'Administrador'
  `
}

export const userStats = {
  getStats: `
    SELECT 
      COUNT(*) AS total_active_users,
      (SELECT nombre FROM usuarios WHERE sueldo = (SELECT MAX(sueldo) FROM usuarios WHERE estado = 'Activo')) AS highest_payroll,
      (SELECT nombre FROM usuarios WHERE sueldo = (SELECT MIN(sueldo) FROM usuarios WHERE estado = 'Activo')) AS lowest_payroll,
      SUM(sueldo) AS total_payroll
    FROM usuarios
    WHERE estado = 'Activo';
  `,
};