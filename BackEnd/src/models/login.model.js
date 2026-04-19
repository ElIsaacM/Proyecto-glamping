export const login = {
  login: `
    SELECT
      l.login_id,
      l.usuario_id,
      l.email,
      l.contrasena,
      u.nombre AS usuario_nombre,
      r.nombre AS rol_nombre
    FROM login l
    JOIN usuarios u ON l.usuario_id = u.usuario_id
    JOIN roles r ON u.rol_id = r.rol_id
    WHERE l.email = $1
  `,
  createLogin: `
    INSERT INTO login (usuario_id, email, contrasena)
    VALUES ($1, $2, $3)
    RETURNING email
  `,
  restoreLogin: `
    UPDATE login
    SET contrasena = $1
    WHERE email = $2
    RETURNING email
  `,
  createlog: `
    INSERT INTO log (login_id, accion, fecha_hora, detalles)
    VALUES ($1, $2, CURRENT_TIMESTAMP, $3)
    RETURNING log_id
  `,
  deleteLogin: `
    UPDATE login
    SET estado = 'Inactivo'
    WHERE email = $1
    RETURNING email
  `
}

export const selectUser = {
  selectUser: `
    SELECT
      usuario_id
    FROM usuarios
    WHERE tipo_identificacion = $1
    AND numero_identificacion = $2
    AND estado = 'Activo'
  `
}