export const user = {
  getUsers: `
    SELECT 
      *
    FROM vista_usuarios
    WHERE estado = 'Activo' 
    ORDER BY id DESC
  `,
  getUserByName: `
    SELECT 
      *
    FROM vista_usuarios
    WHERE usuario ILIKE '%' || $1 || '%'
  `,
  createUser: `
    INSERT INTO usuarios (rol_id, tipo_identificacion, numero_identificacion, nombre, contacto, sueldo, fecha_agregado)
    VALUES ($1, $2, $3, $4, $5, $6, CURRENT_TIMESTAMP)
    RETURNING usuario_id, nombre, rol_id
  `,
  updateUser: `
    UPDATE Usuarios SET
      rol_id = COALESCE(NULLIF($1::text, '')::integer, rol_id),
      tipo_identificacion = COALESCE(NULLIF($2, ''), tipo_identificacion),
      numero_identificacion = COALESCE(NULLIF($3, ''), numero_identificacion),
      nombre = COALESCE(NULLIF($4, ''), nombre),
      contacto = COALESCE(NULLIF($5, ''), contacto),
      sueldo = COALESCE(NULLIF($6::text, '')::numeric, sueldo)
    WHERE usuario_id = $7
    RETURNING nombre, rol_id
  `,
  deleteUser: `
    UPDATE Usuarios 
    SET estado = 'Inactivo' 
    WHERE usuario_id = $1 
    RETURNING nombre, rol_id
  `,
  activateUser: `
    UPDATE Usuarios 
    SET estado = 'Activo' 
    WHERE usuario_id = $1 
    RETURNING nombre, rol_id
  `,
};

export const userFilters = {
  payroll_desc: `
    SELECT 
      * 
    FROM vista_usuarios
    WHERE estado = 'Activo'
    ORDER BY sueldo DESC
  `,
  payroll_asc: `
    SELECT 
      * 
    FROM vista_usuarios
    WHERE estado = 'Activo'
    ORDER BY sueldo ASC
  `,
  idle_status: `
    SELECT 
      * 
    FROM vista_usuarios
    WHERE estado = 'Inactivo'
  `,
  admin_users: `
    SELECT 
      * 
    FROM vista_usuarios
    WHERE rol = 'Administrador'
  `
}

export const userStats = {
  getStats: `
    SELECT * FROM vista_usuarios_stats;
  `,
};