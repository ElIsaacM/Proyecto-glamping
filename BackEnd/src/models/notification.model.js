export const notification = {
  getNotifications: `
    SELECT
      * 
    FROM notificaciones 
  `,
  getLastNotifications: `
    SELECT
      * 
    FROM notificaciones 
    ORDER BY fecha DESC
    LIMIT 2
  `,
  createNotification: `
    INSERT INTO notificaciones 
    (creada_por, asunto, mensaje, fecha)
    VALUES ($1, $2, $3, CURRENT_TIMESTAMP)
    RETURNING creada_por, asunto
  `,
  deleteNotification: `
    DELETE FROM notificaciones 
    WHERE id = $1
  `,
  deleteAllNotifications: `
    DELETE FROM notificaciones
  `,
}