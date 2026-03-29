export const login = {
  login: `
    SELECT
      email,
      password      
    FROM login
    WHERE email = $1 AND password = $2
  `,
  createLogin: `
    WITH insert_user AS (
      INSERT INTO usuarios (rolid, identificacionid, nombre, contacto, sueldo, numeroidentificacion)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING usuarioid, nombre, rolid
    ),
    insert_login AS (
      INSERT INTO login (usuarioid, email, password)
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