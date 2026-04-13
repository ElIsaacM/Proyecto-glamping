export const login = {
  login: `
    SELECT
      login_id,
      email,
      contrasena      
    FROM login
    WHERE email = $1 AND contrasena = $2
  `,
  createLogin: `
    INSERT INTO login (usuario_id, email, contrasena)
    VALUES ($1, $2, $3)
    WHERE EXISTS (
      SELECT 1 FROM usuarios WHERE numero_identificacion = $1
    )
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