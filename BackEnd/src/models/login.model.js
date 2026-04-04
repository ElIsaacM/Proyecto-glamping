export const login = {
  login: `
    SELECT
      email,
      password      
    FROM login
    WHERE email = $1 AND password = $2
  `,
  restoreLogin: `
    UPDATE login
    SET password = $1
    WHERE email = $2
    RETURNING email
  `,
  createlog: `
    INSERT INTO log (loginid, accion, fechahora, detalles)
    VALUES ($1, $2, CURRENT_DATE, CURRENT_TIME, $3)
    RETURNING logid
  `,
  deleteLogin: `
    UPDATE login
    SET estado = 'Inactivo'
    WHERE email = $1
    RETURNING email
  `
}